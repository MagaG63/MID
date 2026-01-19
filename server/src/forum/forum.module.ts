import { Module } from '@nestjs/common';
import { Forum } from './forum.model';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Forum])],
  controllers: [ForumController],
  providers: [ForumService],
})
export class ForumModule {}
