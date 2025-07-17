import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comments.schema';
import { Comment as CommentType} from 'src/shared/types/comment.type';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<Comment>,
    ) {}

    async create(taskId: number, userId: number, content: string): Promise<CommentType> {
        const comment = await this.commentModel.create({ taskId, userId, content });
        return comment.toObject() as CommentType;
    }

    async findByTask(taskId: number): Promise<CommentType[]> {
        const comments = await this.commentModel.find({ taskId }).sort({ createdAt: -1 }).exec();
        return comments.map(comment => comment.toObject() as CommentType);
    }
}
