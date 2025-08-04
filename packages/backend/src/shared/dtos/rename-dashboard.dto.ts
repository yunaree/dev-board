import { ApiProperty } from '@nestjs/swagger';

export class RenameDashboardDto {
    @ApiProperty()
    newTitle!: string;
} 