import { Tag } from 'db/entities';
import { TagCategory } from 'db/entities/tag.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TagsRepository extends Repository<Tag> {
  constructor(private readonly ds: DataSource) {
    super(Tag, ds.createEntityManager());
  }

  getTags(category?: TagCategory) {
    const qb = this.createQueryBuilder('tag').orderBy('tag.name', 'ASC');

    if (category) {
      qb.where('tag.category = :category', { category });
    }

    return qb.getMany();
  }
}
