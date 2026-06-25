import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards';
import { GetProjectsDto, GetProjectTagsDto } from './dto/getProjectsDto';
import { CreateProjectDto, UpdateProjectDto } from './dto/projectWriteDto';
import { CreateTagDto, UpdateTagDto } from './dto/tagWriteDto';
import { ProjectsService } from './projects.service';

@Controller('/projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  getProjects(@Query() query: GetProjectsDto) {
    return this.projectsService.getProjects(query);
  }

  @Get('/tags')
  getTags(@Query() query: GetProjectTagsDto) {
    return this.projectsService.getTags(query);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post()
  createProject(@Body() body: CreateProjectDto) {
    return this.projectsService.createProject(body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Patch('/:id')
  updateProject(@Param('id') id: string, @Body() body: UpdateProjectDto) {
    return this.projectsService.updateProject(+id, body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete('/:id')
  deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post('/tags')
  createTag(@Body() body: CreateTagDto) {
    return this.projectsService.createTag(body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Patch('/tags/:id')
  updateTag(@Param('id') id: string, @Body() body: UpdateTagDto) {
    return this.projectsService.updateTag(+id, body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete('/tags/:id')
  deleteTag(@Param('id') id: string) {
    return this.projectsService.deleteTag(+id);
  }
}
