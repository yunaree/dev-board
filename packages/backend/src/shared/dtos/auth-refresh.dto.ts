import { ApiProperty } from '@nestjs/swagger';

export class AuthRefreshDto {
    @ApiProperty()
    refreshToken!: string;
} 