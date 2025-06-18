import { Status } from '@prisma/client';
import { IsString, MinLength } from 'class-validator';

export class TaskDto{
    @IsString()
    title: string;

    @IsString()
    description: string | null;

    status: Status;
}