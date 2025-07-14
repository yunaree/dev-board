import { ApiProperty } from '@nestjs/swagger';

export class AddUserToDashboardDto {
    @ApiProperty()
    username: string;
} 