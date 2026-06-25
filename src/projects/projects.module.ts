import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project, Tag } from 'db/entities';
import { ProjectsRepository, TagsRepository } from 'src/common/repositories';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { R2StorageService } from 'src/r2/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Tag])],
  controllers: [ProjectsController],
  providers: [
    ProjectsRepository,
    TagsRepository,
    ProjectsService,
    R2StorageService,
  ],
  exports: [ProjectsService],
})
export class ProjectsModule {}
