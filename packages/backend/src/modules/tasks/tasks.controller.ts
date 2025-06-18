import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from 'src/shared/types/task.type';
import { TaskDto } from 'src/shared/dtos/task.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { RequestWithUser } from 'src/shared/interfaces/request-with-user.type';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @UseGuards(AuthGuard)
    @Post('create-task')
    async createTask(
        @Body() taskDto: TaskDto,
        @Req() req: RequestWithUser,
    ): Promise<Task|null>{
        const userId = req.user['sub'];
        return this.tasksService.createTask(taskDto.title, taskDto.description, taskDto.status, userId);
    }

    @UseGuards(AuthGuard)
    @Delete('remove-task')
    async removeTask(
        @Body() body: { taskId: number },
        @Req() req: RequestWithUser,
    ):Promise<{ success: boolean }>{
        const userId = req.user['sub'];
        const taskId = body.taskId;
        return this.tasksService.removeTask(taskId, userId);
    }
}
