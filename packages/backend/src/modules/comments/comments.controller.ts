import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/shared/guards/auth/auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentDto } from 'src/shared/dtos/comment.dto';
import { Comment } from 'src/shared/types/comment.type';

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @ApiOperation({ summary: 'Create a comment' })
    @ApiBody({ type: CommentDto })
    @ApiResponse({ status: 200, description: 'Comemnt' })
    @Post(':taskId')
    async createComment(
        @Param('taskId') taskId: number,
        @Body('content') content: string,
          @Req() req): Promise<Comment> {
        const userId = req.user['sub'];
        return this.commentsService.create(taskId, userId, content);
    }

    @ApiOperation({ summary: 'Get comments by task ID' })
    @ApiResponse({ status: 200, description: 'List of comments', type: [CommentDto] })
    @Get(':taskId')
    async findByTask(@Param('taskId') taskId: number): Promise<Comment[]> {
        return this.commentsService.findByTask(taskId);
    }
}
