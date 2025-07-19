import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from 'src/shared/types/task.type';
import { TaskDto } from 'src/shared/dtos/task.dto';
import { JwtAuthGuard  } from 'src/shared/guards/auth/auth.guard';
import { RequestWithUser } from 'src/shared/interfaces/request-with-user.type';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { ChangeTaskStatusDto } from 'src/shared/dtos/change-task-status.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @ApiOperation({ summary: 'Create new task' })
    @ApiBody({ type: TaskDto })
    @ApiResponse({ status: 201, description: 'Task created', type: TaskDto })
    @UseGuards(JwtAuthGuard )
    @Post()
    async createTask(
        @Body() taskDto: TaskDto,
        @Req() req: RequestWithUser,
    ): Promise<Task | null> {
        const userId = req.user['sub'];
        return this.tasksService.createTask(taskDto.title, taskDto.description, taskDto.status, userId);
    }

    @ApiOperation({ summary: 'Delete task by id' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Task deleted', schema: { example: { success: true } } })
    @UseGuards(JwtAuthGuard )
    @Delete(':id')
    async removeTask(
        @Param('id') id: number,
        @Req() req: RequestWithUser,
    ): Promise<{ success: boolean }> {
        const userId = req.user['sub'];
        return this.tasksService.removeTask(id, userId);
    }

    @ApiOperation({ summary: 'Get tasks for current user and dashboard' })
    @ApiQuery({ name: 'dashboardId', type: Number })
    @ApiResponse({ status: 200, description: 'Tasks grouped by status', schema: { example: { active: [], in_progress: [], inactive: [] } } })
    @UseGuards(JwtAuthGuard )
    @Get()
    async getMyTasks(
        @Query('dashboardId') dashboardId: number,
        @Req() req: RequestWithUser
    ): Promise<{ active: Task[], in_progress: Task[], inactive: Task[] }> {
        const userId = req.user['sub'];
        return this.tasksService.getMyTasks(userId, Number(dashboardId));
    }

    @ApiOperation({ summary: 'Change task status' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: ChangeTaskStatusDto })
    @ApiResponse({ status: 200, description: 'Task status changed', type: TaskDto })
    @UseGuards(JwtAuthGuard )
    @Patch(':id/status')
    async changeStatus(@Param('id') id: number, @Body() body: ChangeTaskStatusDto, @Req() req: RequestWithUser): Promise<Task> {
        const userId = req.user['sub'];
        const status = body.status;
        return this.tasksService.changeStatus(userId, id, status);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a task with a file' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
    description: 'Task data and file',
    type: 'multipart/form-data',
    schema: {
        type: 'object',
        properties: {
        title: { type: 'string', example: 'Моя таска' },
        description: { type: 'string', example: 'Опис таски', nullable: true },
        status: { type: 'string', example: 'active' },
        file: {
            type: 'string',
            format: 'binary',
            description: 'File or photo to attach',
        },
        },
        required: ['title', 'status'],
    },
    })

    @ApiResponse({ status: 201, description: 'Task created' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 400, description: 'Incorrect data' })
    @Post('create-with-file')
    @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
        destination: './uploads/tasks/',
        filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
        },
    }),
    }))
    async createWithFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() taskDto: TaskDto,
    @Req() req: RequestWithUser, 
    ) {
    const userId = req.user['sub'];
    return this.tasksService.createTask(
        taskDto.title, taskDto.description, taskDto.status, userId, file?.filename,
    );
    }
}
