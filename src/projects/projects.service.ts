import { Injectable } from '@nestjs/common';
import { Project, Tag } from 'db/entities';
import { TagCategory } from 'db/entities/tag.entity';
import {
  BadRequestAppException,
  NotFoundAppException,
} from 'src/common/exceptions';
import {
  ProjectCategoryFilters,
  ProjectsRepository,
  TagsRepository,
} from 'src/common/repositories';
import { ErrorCodes } from 'src/common/statusCodes';
import {
  MulterFile,
  R2StorageService,
  R2UploadResult,
} from 'src/r2/storage.service';
import { In, Not } from 'typeorm';
import { GetProjectsDto, GetProjectTagsDto } from './dto/getProjectsDto';
import { CreateProjectDto, UpdateProjectDto } from './dto/projectWriteDto';
import { CreateTagDto, UpdateTagDto } from './dto/tagWriteDto';

@Injectable()
export class ProjectsService {
  constructor(
    private projectsRepository: ProjectsRepository,
    private tagsRepository: TagsRepository,
    private r2StorageService: R2StorageService,
  ) {}

  getProjects(query: GetProjectsDto) {
    const page = Math.max(Number(query.page) || 1, 1);
    const perPage = Math.min(Math.max(Number(query.perPage) || 20, 1), 100);
    const categoryFilters: ProjectCategoryFilters = {
      [TagCategory.Industry]: this.parseList(query.industry),
      [TagCategory.WorkType]: this.parseList(query.workType),
      [TagCategory.Stack]: this.parseList(query.stack),
      [TagCategory.Custom]: this.parseList(query.custom),
    };

    return this.projectsRepository.getProjects({
      page,
      perPage,
      search: query.search?.trim() || undefined,
      tags: this.parseList(query.tags),
      categoryFilters,
    });
  }

  async getTags(query: GetProjectTagsDto) {
    const tags = await this.tagsRepository.getTags(query.category);

    return tags.reduce(
      (result, tag) => {
        result[tag.category].push(tag);
        return result;
      },
      {
        [TagCategory.Industry]: [],
        [TagCategory.WorkType]: [],
        [TagCategory.Stack]: [],
        [TagCategory.Custom]: [],
      },
    );
  }

  async createProject(body: CreateProjectDto, imageFile?: MulterFile) {
    const projectBody = this.normalizeProjectBody(body);
    const tags = await this.getTagsByIds(projectBody.tagIds || []);
    const uploadedImage = await this.uploadProjectImage(imageFile);

    try {
      const project = this.projectsRepository.create({
        name: projectBody.name,
        description: projectBody.description,
        previewUrl: uploadedImage?.url || projectBody.previewUrl,
        previewKey: uploadedImage?.key || null,
        liveLink: projectBody.liveLink ?? '',
        figmaLink: projectBody.figmaLink ?? '',
        status: projectBody.status ?? '',
        nda: projectBody.nda ?? false,
        isPublished: projectBody.isPublished ?? true,
        tags,
      });

      return await this.projectsRepository.save(project);
    } catch (e) {
      await this.cleanupUploadedImage(uploadedImage);
      throw e;
    }
  }

  async updateProject(
    id: number,
    body: UpdateProjectDto,
    imageFile?: MulterFile,
  ) {
    const projectBody = this.normalizeProjectBody(body);
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: { tags: true },
    });

    if (!project) {
      throw new NotFoundAppException(ErrorCodes.DataNotFound);
    }

    const previousPreviewKey = project.previewKey;
    const previousPreviewUrl = project.previewUrl;
    const nextTags =
      projectBody.tagIds !== undefined
        ? await this.getTagsByIds(projectBody.tagIds)
        : undefined;
    const uploadedImage = await this.uploadProjectImage(imageFile);
    let savedProject: Project;

    try {
      this.assignDefined(project, {
        name: projectBody.name,
        description: projectBody.description,
        liveLink: projectBody.liveLink,
        figmaLink: projectBody.figmaLink,
        status: projectBody.status,
        nda: projectBody.nda,
        isPublished: projectBody.isPublished,
      });

      if (uploadedImage) {
        project.previewUrl = uploadedImage.url;
        project.previewKey = uploadedImage.key;
      } else if (projectBody.previewUrl !== undefined) {
        project.previewUrl = projectBody.previewUrl;
        project.previewKey = null;
      }

      if (nextTags !== undefined) {
        project.tags = nextTags;
      }

      savedProject = await this.projectsRepository.save(project);
    } catch (e) {
      await this.cleanupUploadedImage(uploadedImage);
      throw e;
    }

    if (uploadedImage && previousPreviewKey) {
      await this.r2StorageService.deleteOne(previousPreviewKey);
    } else if (
      projectBody.previewUrl !== undefined &&
      projectBody.previewUrl !== previousPreviewUrl &&
      previousPreviewKey
    ) {
      await this.r2StorageService.deleteOne(previousPreviewKey);
    }

    return savedProject;
  }

  async deleteProject(id: number) {
    const project = await this.projectsRepository.findOneBy({ id });

    if (!project) {
      throw new NotFoundAppException(ErrorCodes.DataNotFound);
    }

    const previewKey = project.previewKey;

    await this.projectsRepository.delete(id);
    await this.r2StorageService.deleteOne(previewKey);
    return {};
  }

  async createTag(body: CreateTagDto) {
    await this.checkTagUnique(body.slug, body.category);

    const tag = this.tagsRepository.create({
      name: body.name,
      slug: body.slug,
      category: body.category,
    });

    return this.tagsRepository.save(tag);
  }

  async updateTag(id: number, body: UpdateTagDto) {
    const tag = await this.tagsRepository.findOneBy({ id });

    if (!tag) {
      throw new NotFoundAppException(ErrorCodes.DataNotFound);
    }

    const nextSlug = body.slug ?? tag.slug;
    const nextCategory = body.category ?? tag.category;
    await this.checkTagUnique(nextSlug, nextCategory, id);

    this.assignDefined(tag, {
      name: body.name,
      slug: body.slug,
      category: body.category,
    });

    return this.tagsRepository.save(tag);
  }

  async deleteTag(id: number) {
    const tag = await this.tagsRepository.findOneBy({ id });

    if (!tag) {
      throw new NotFoundAppException(ErrorCodes.DataNotFound);
    }

    await this.tagsRepository.delete(id);
    return {};
  }

  private parseList(value?: string) {
    return (value || '')
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);
  }

  private async getTagsByIds(ids: number[]) {
    if (!ids.length) {
      return [];
    }

    const tags = await this.tagsRepository.findBy({ id: In(ids) });

    if (tags.length !== ids.length) {
      throw new BadRequestAppException(ErrorCodes.NotValidParameters);
    }

    return tags;
  }

  private uploadProjectImage(imageFile?: MulterFile) {
    if (!imageFile) {
      return null;
    }

    return this.r2StorageService.uploadOne(imageFile, {
      prefix: 'projects-image',
      makePublicUrl: true,
    });
  }

  private async cleanupUploadedImage(uploadedImage: R2UploadResult | null) {
    if (!uploadedImage?.key) {
      return;
    }

    try {
      await this.r2StorageService.deleteOne(uploadedImage.key);
    } catch {}
  }

  private normalizeProjectBody<T extends CreateProjectDto | UpdateProjectDto>(
    body: T,
  ): T {
    return {
      ...body,
      isPublished: this.normalizeBoolean(body.isPublished),
      nda: this.normalizeBoolean(body.nda),
      tagIds: this.normalizeTagIds(body.tagIds),
    };
  }

  private normalizeBoolean(value: unknown) {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    if (typeof value === 'boolean') {
      return value;
    }

    if (typeof value === 'string') {
      return value.trim().toLowerCase() === 'true';
    }

    return Boolean(value);
  }

  private normalizeTagIds(value: unknown) {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    if (Array.isArray(value)) {
      return Array.from(new Set(value.map(Number)));
    }

    if (typeof value === 'number') {
      return [value];
    }

    if (typeof value === 'string') {
      const trimmed = value.trim();

      if (!trimmed) {
        return undefined;
      }

      if (trimmed.startsWith('[')) {
        return Array.from(new Set(JSON.parse(trimmed).map(Number)));
      }

      return Array.from(
        new Set(trimmed.split(',').map(item => Number(item.trim()))),
      );
    }

    return undefined;
  }

  private async checkTagUnique(
    slug: string,
    category: TagCategory,
    excludeId?: number,
  ) {
    const tag = await this.tagsRepository.findOne({
      where: {
        slug,
        category,
        ...(excludeId ? { id: Not(excludeId) } : {}),
      },
    });

    if (tag) {
      throw new BadRequestAppException(ErrorCodes.IsAlreadyExist);
    }
  }

  private assignDefined<T extends Project | Tag>(target: T, data: Partial<T>) {
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        target[key] = value;
      }
    });
  }
}
