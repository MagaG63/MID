import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

interface SafeUserData {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(userData: CreateUserData): Promise<User> {
    try {
      // Хешируем пароль
      const hash = await bcrypt.hash(userData.password, 10);

      // Создаем объект для создания пользователя
      const userCreateData: any = {
        name: userData.name,
        email: userData.email,
        password: hash,
      };

      console.log('📦 Создание пользователя:', {
        ...userCreateData,
        password: '***HIDDEN***',
      });

      // Создаем пользователя
      const user = await this.userModel.create(userCreateData);

      console.log('✅ Пользователь создан:', user.id);
      return user;
    } catch (error) {
      console.error('❌ Ошибка создания пользователя:', error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    // Сравниваем пароль
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error('Неверный пароль');
    }

    return user;
  }

  // ✅ ДОБАВЛЯЕМ метод getAll
  async getAll(): Promise<SafeUserData[]> {
    const users = await this.userModel.findAll();

    // Удаляем пароли из всех записей
    return users.map((user) => {
      const data = user.toJSON();
      const { password, ...safeData } = data;
      return safeData as SafeUserData;
    });
  }

  async updateUser(
    id: number,
    updateData: Partial<CreateUserData>,
  ): Promise<SafeUserData> {
    const user = await this.findById(id);

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    // Если обновляется пароль - хешируем его
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    await user.update(updateData);

    // Возвращаем безопасные данные
    const data = user.toJSON();
    const { password, ...safeData } = data;
    return safeData as SafeUserData;
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.findById(id);

    if (user) {
      await user.destroy();
    }
  }
}
