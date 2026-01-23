import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/forum.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  // Получить все форумы (публичный доступ)
  @Get('all')
  async findAll() {
    const forums = await this.forumService.getAll();
    return { forums };
  }

  // Получить один форум по ID (публичный доступ)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const forum = await this.forumService.getOne(id);
    return { forum };
  }

  // Создать новый форум (требуется авторизация)
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createForumDto: CreateForumDto, @Req() req: any) {
    console.log('🔵 [CONTROLLER] Получен запрос на создание форума');
    
    // Используем ID из токена как author_id
    const userId = req.user?.sub || req.user?.id;
    
    const forumData = {
      ...createForumDto,
      author_id: userId,
    };

    console.log('🔵 [CONTROLLER] Данные для создания:', forumData);
    const forum = await this.forumService.create(forumData);
    console.log('🔵 [CONTROLLER] Форум создан, возвращаем ответ');
    
    return { forum, message: 'Форум успешно создан' };
  }

  // Удалить форум (требуется авторизация, только автор)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const userId = req.user?.sub || req.user?.id;
    const result = await this.forumService.delete(id, userId);
    return result;
  }
}
