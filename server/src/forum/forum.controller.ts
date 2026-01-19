import { Controller, Get, Param } from '@nestjs/common';
import { ForumService } from './forum.service';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get('all')
  findAll() {
    return this.forumService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forumService.getOne(+id);
  }
}
