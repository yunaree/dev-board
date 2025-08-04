import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ required: true })
  taskId!: number; 

  @Prop({ required: true })
  userId!: number;

  @Prop({ required: true })
  content!: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
