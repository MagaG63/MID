import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('all')
  findAll() {
    return this.commentService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.getOne(+id);
  }

  @Get('forum/:forumId')
  findByForumId(@Param('forumId') forumId: string) {
    return this.commentService.getByForumId(+forumId);
  }

  @Post('add')
  create(@Body() createCommentDto: any) {
    return this.commentService.create(createCommentDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: any) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.commentService.delete(+id);
  }
}
