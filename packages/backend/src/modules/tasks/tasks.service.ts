import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Task } from 'src/shared/types/task.type';
import { isValidStatus } from 'src/shared/utils/status.util';

@Injectable()
export class TasksService {
    constructor(private prismaService: PrismaService){}

    async createTask(title: string, description: string | null, status: Status, createdBy: number):Promise<Task | null>{
        return this.prismaService.task.create({
            data: {
                title: title,
                description: description,
                status: status,
                createdBy: createdBy
            }
        })
    }

    async removeTask(taskId: number, userId: number):Promise<{ success: boolean }>{
        const task = await this.prismaService.task.findUnique({
            where: {
                id: taskId,
            }
        })

        if(!task){
            throw new NotFoundException('Таски не знайдено')
        }

        if(userId!==task.createdBy){
            throw new ForbiddenException('Видаляти завдання можуть тільки ті, хто їх створив')
        }

        await this.prismaService.task.delete({
            where: { id: taskId }
        });

        return { success: true };
    }

    async getMyTasks(userId: number):Promise<{active: Task[], in_progress: Task[], inactive: Task[]}>{
        const tasks = await this.prismaService.task.findMany({
            where: {
            createdBy: userId,
            },
            orderBy: {
            createdAt: 'asc',
            },
        });

        return {
            active: tasks.filter(task => task.status === Status.active),
            in_progress: tasks.filter(task => task.status === Status.in_progress),
            inactive: tasks.filter(task => task.status === Status.inactive),
        };
    }

    async changeStatus(userId: number, taskId: number, status: string){
        if(!isValidStatus(status)){
            throw new ForbiddenException('Такого статусу не існує')
        }

        return this.prismaService.task.update({
            where: {
                id: taskId,
                createdBy: userId
            },
            data: {
                status: status
            }
        })
    }
}
