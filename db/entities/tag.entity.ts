import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';

export enum TagCategory {
  Industry = 'industry',
  WorkType = 'work_type',
  Stack = 'stack',
  QualityLevel = 'quality_level',
}

@Index(['slug', 'category'], { unique: true })
@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  slug: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: TagCategory.QualityLevel,
  })
  category: TagCategory;

  @ManyToMany(() => Project, project => project.tags)
  projects: Project[];

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
