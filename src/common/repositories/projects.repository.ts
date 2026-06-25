import { Project } from 'db/entities';
import { TagCategory } from 'db/entities/tag.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

export type ProjectCategoryFilters = Partial<Record<TagCategory, string[]>>;

export interface FindProjectsParams {
  page: number;
  perPage: number;
  search?: string;
  tags: string[];
  categoryFilters: ProjectCategoryFilters;
}

@Injectable()
export class ProjectsRepository extends Repository<Project> {
  constructor(private readonly ds: DataSource) {
    super(Project, ds.createEntityManager());
  }

  async getProjects(params: FindProjectsParams) {
    const qb = this.createQueryBuilder('project')
      .leftJoinAndSelect('project.tags', 'tags')
      .orderBy('project.name', 'ASC')
      .skip((params.page - 1) * params.perPage)
      .take(params.perPage);

    if (params.search) {
      qb.andWhere('project.name ILIKE :search', {
        search: `%${params.search}%`,
      });
    }

    Object.entries(params.categoryFilters).forEach(
      ([category, slugs], index) => {
        if (!slugs.length) {
          return;
        }

        qb.andWhere(
          `EXISTS (
            SELECT 1
            FROM project_tags pt
            INNER JOIN tags tag_filter ON tag_filter.id = pt."tagId"
            WHERE pt."projectId" = project.id
              AND tag_filter.category = :category${index}
              AND tag_filter.slug IN (:...categorySlugs${index})
          )`,
          {
            [`category${index}`]: category,
            [`categorySlugs${index}`]: slugs,
          },
        );
      },
    );

    params.tags.forEach((slug, index) => {
      qb.andWhere(
        `EXISTS (
          SELECT 1
          FROM project_tags pt
          INNER JOIN tags tag_filter ON tag_filter.id = pt."tagId"
          WHERE pt."projectId" = project.id
            AND tag_filter.slug = :tagSlug${index}
        )`,
        { [`tagSlug${index}`]: slug },
      );
    });

    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      total,
      page: params.page,
      perPage: params.perPage,
    };
  }
}
