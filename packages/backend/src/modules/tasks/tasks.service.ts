import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Task } from 'src/shared/types/task.type';

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
}
