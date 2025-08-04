import { ApiProperty } from '@nestjs/swagger';

export class AddTaskToDashboardDto {
    @ApiProperty()
    taskId!: number;
} 