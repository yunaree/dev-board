import { ApiProperty } from '@nestjs/swagger';

export class ChangeTaskStatusDto {
    @ApiProperty()
    status: string;
} 