import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

interface UserResponse {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  // ✅ Исправляем метод getAll
  @Get('all')
  async getAll(): Promise<{ users: UserResponse[] }> {
    const users = await this.userService.getAll();
    return { users };
  }

  @Post('registration')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ user: UserResponse }> {
    const user = await this.userService.create(createUserDto);

    // Удаляем пароль из ответа
    const userData = user.toJSON();
    const { password, ...userResponse } = userData;

    return { user: userResponse as UserResponse };
  }

  // Дополнительные методы если нужны
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ user: UserResponse }> {
    const userId = parseInt(id, 10);
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const userData = user.toJSON();
    const { password, ...userResponse } = userData;

    return { user: userResponse as UserResponse };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<CreateUserDto>,
  ): Promise<{ user: UserResponse }> {
    const userId = parseInt(id, 10);
    const user = await this.userService.updateUser(userId, updateUserDto);
    return { user };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const userId = parseInt(id, 10);
    await this.userService.deleteUser(userId);
    return { message: 'User deleted successfully' };
  }

  // Обновление профиля текущего пользователя
  @Put('profile')
  async updateProfile(
    @Body() updateData: { name: string; email: string },
  ): Promise<{ user: UserResponse }> {
    // TODO: Получить ID из JWT токена
    // Пока используем email для поиска
    const user = await this.userService.findByEmail(updateData.email);

    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await this.userService.updateUser(user.id, updateData);
    return { user: updatedUser };
  }
}
