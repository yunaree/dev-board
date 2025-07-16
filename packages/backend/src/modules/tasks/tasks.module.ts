import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ConfigModule } from '@nestjs/config';

// console.log('TasksController:', TasksController);
@Module({
    imports: [
        ConfigModule.forRoot()
      ],
  providers: [TasksService],
  exports: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
