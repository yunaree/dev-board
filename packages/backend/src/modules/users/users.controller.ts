import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/shared/interfaces/request-with-user.type';
import { JwtAuthGuard } from 'src/shared/guards/auth/auth.guard';
import { PasswordDto } from 'src/shared/dtos/password.dto';
import { UsernameDto } from 'src/shared/dtos/username.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: 'Compare passwords' })
    @ApiResponse({ status: 200, description: 'Passwords mach', type: Boolean })
    @ApiBody({ type: PasswordDto })
    @HttpCode(HttpStatus.OK)
    @Post('compare/passwords')
    async comparePasswords(
        @Req() req: RequestWithUser,
        @Body() password: PasswordDto
    ): Promise<boolean> {
        const userId = req.user['sub'];
        return this.usersService.comparePasswords(userId, password.password);
    }

    @ApiOperation({ summary: 'Change username' })
    @ApiResponse({ status: 200, description: 'Username update successful'})
    @ApiBody({ type: UsernameDto })
    @HttpCode(HttpStatus.OK)
    @Patch('username')
    async updateUsername(
        @Req() req: RequestWithUser,
        @Body() username: UsernameDto
    ): Promise<void> {
        const userId = req.user['sub'];
        await this.usersService.updateUsername(userId, username.username);
    }


    @ApiOperation({ summary: 'Change password' })
    @ApiResponse({ status: 200, description: 'Password update successful' })
    @ApiBody({ type: PasswordDto })
    @HttpCode(HttpStatus.OK)
    @Post('change/password')
    async changePassword(
        @Req() req: RequestWithUser,
        @Body() password: PasswordDto
    ): Promise<void> {
        const userId = req.user['sub'];
        await this.usersService.updatePassword(userId, password.password);
    }

    @ApiOperation({ summary: 'Update user picture' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'User avatar',
        type: 'multipart/form-data',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
        required: true,
    })
    @HttpCode(HttpStatus.OK)
    @Patch('avatar')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/avatars/',
            filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + extname(file.originalname));
            },
        }),
    }))
    async updateAvatar(
        @Req() req: RequestWithUser,
        @UploadedFile() avatar: Express.Multer.File,
    ): Promise<void> {
        const userId = req.user['sub'];
        await this.usersService.updateAvatar(userId, avatar.filename);
    }
}
