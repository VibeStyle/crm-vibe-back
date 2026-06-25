import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project, Tag } from 'db/entities';
import { ProjectsRepository, TagsRepository } from 'src/common/repositories';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Tag])],
  controllers: [ProjectsController],
  providers: [ProjectsRepository, TagsRepository, ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
