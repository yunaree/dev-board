import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './comments.schema';

@Module({
  imports:[
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://localhost:27017/dev-board'),
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }])
  ],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
