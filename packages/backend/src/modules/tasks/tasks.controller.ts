import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from 'src/shared/types/task.type';
import { TaskDto } from 'src/shared/dtos/task.dto';
import { JwtAuthGuard  } from 'src/shared/guards/auth.guard';
import { RequestWithUser } from 'src/shared/interfaces/request-with-user.type';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ChangeTaskStatusDto } from 'src/shared/dtos/change-task-status.dto';

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
}
