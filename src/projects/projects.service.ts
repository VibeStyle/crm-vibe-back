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
import { In, Not } from 'typeorm';
import { GetProjectsDto, GetProjectTagsDto } from './dto/getProjectsDto';
import { CreateProjectDto, UpdateProjectDto } from './dto/projectWriteDto';
import { CreateTagDto, UpdateTagDto } from './dto/tagWriteDto';

@Injectable()
export class ProjectsService {
  constructor(
    private projectsRepository: ProjectsRepository,
    private tagsRepository: TagsRepository,
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

  async createProject(body: CreateProjectDto) {
    const tags = await this.getTagsByIds(body.tagIds || []);
    const project = this.projectsRepository.create({
      name: body.name,
      description: body.description,
      previewUrl: body.previewUrl,
      isPublished: body.isPublished ?? true,
      tags,
    });

    return this.projectsRepository.save(project);
  }

  async updateProject(id: number, body: UpdateProjectDto) {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: { tags: true },
    });

    if (!project) {
      throw new NotFoundAppException(ErrorCodes.DataNotFound);
    }

    this.assignDefined(project, {
      name: body.name,
      description: body.description,
      previewUrl: body.previewUrl,
      isPublished: body.isPublished,
    });

    if (body.tagIds !== undefined) {
      project.tags = await this.getTagsByIds(body.tagIds);
    }

    return this.projectsRepository.save(project);
  }

  async deleteProject(id: number) {
    const project = await this.projectsRepository.findOneBy({ id });

    if (!project) {
      throw new NotFoundAppException(ErrorCodes.DataNotFound);
    }

    await this.projectsRepository.delete(id);
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
