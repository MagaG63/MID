import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service'; // ✅ ЛОКАЛЬНЫЙ ИМПОРТ
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {} // ✅ Теперь работает

  @Get('all')
  findAll() {
    return this.userService.getAll();
  }

  @Post('registration')
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
