import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://localhost:27017/dev-board'),
  ],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
