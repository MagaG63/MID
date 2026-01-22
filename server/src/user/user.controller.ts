import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface UserResponse {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

@Controller('user')
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

  // Обновление профиля текущего пользователя (ДОЛЖНО БЫТЬ ПЕРЕД :id роутами!)
  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(
    @Req() req: any,
    @Body() updateData: { name: string; email: string },
  ): Promise<{ user: UserResponse }> {
    try {
      console.log('🔄 UPDATE PROFILE REQUEST:', {
        headers: req.headers.authorization ? 'Token present' : 'No token',
        user: req.user,
        body: updateData,
      });

      // Получаем ID пользователя из JWT токена (используется 'sub' в payload)
      const userId = req.user?.sub || req.user?.id;
      
      if (!userId) {
        console.error('❌ No userId found in request');
        throw new Error('User not authenticated');
      }

      console.log('🔄 Updating user profile:', { userId, updateData });

      const updatedUser = await this.userService.updateUser(userId, updateData);
      
      console.log('✅ User profile updated:', updatedUser);
      
      return { user: updatedUser };
    } catch (error) {
      console.error('❌ UPDATE PROFILE ERROR:', error);
      throw error;
    }
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
}
