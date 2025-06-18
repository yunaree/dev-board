import { Injectable } from '@nestjs/common';
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
}
