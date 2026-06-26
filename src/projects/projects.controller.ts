import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards';
import { GetProjectsDto, GetProjectTagsDto } from './dto/getProjectsDto';
import { CreateProjectDto, UpdateProjectDto } from './dto/projectWriteDto';
import { CreateTagDto, UpdateTagDto } from './dto/tagWriteDto';
import { ProjectsService } from './projects.service';
import { FileUploadInterceptor } from 'src/common/interseptors/file-upload.interceptor';
import { MulterFile } from 'src/r2/storage.service';

const ProjectImageInterceptor = FileUploadInterceptor('files', {
  maxFiles: 1,
  maxFileSize: 20 * 1024 * 1024,
  allowedTypes: ['image/jpeg', 'image/png'],
  allowedExtensions: ['jpg', 'jpeg', 'png'],
  useMemoryStorage: true,
});

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
  @Roles('admin', 'manager', 'user')
  @Post()
  @UseInterceptors(ProjectImageInterceptor)
  createProject(
    @Body() body: CreateProjectDto,
    @UploadedFiles() files?: MulterFile[],
  ) {
    return this.projectsService.createProject(body, files?.[0]);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'user')
  @Patch('/:id')
  @UseInterceptors(ProjectImageInterceptor)
  updateProject(
    @Param('id') id: string,
    @Body() body: UpdateProjectDto,
    @UploadedFiles() files?: MulterFile[],
  ) {
    return this.projectsService.updateProject(+id, body, files?.[0]);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'user')
  @Delete('/:id')
  deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'user')
  @Post('/tags')
  createTag(@Body() body: CreateTagDto) {
    return this.projectsService.createTag(body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'user')
  @Patch('/tags/:id')
  updateTag(@Param('id') id: string, @Body() body: UpdateTagDto) {
    return this.projectsService.updateTag(+id, body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'user')
  @Delete('/tags/:id')
  deleteTag(@Param('id') id: string) {
    return this.projectsService.deleteTag(+id);
  }
}
