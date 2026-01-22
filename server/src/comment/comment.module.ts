import { Module } from '@nestjs/common';
import { Comment } from './comment.model';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
