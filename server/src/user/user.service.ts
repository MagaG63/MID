import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async getAll(): Promise<User[]> {
    return this.userModel.findAll({ attributes: ['id', 'name', 'email'] });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(dto.password, 10);
    const [user, created] = await this.userModel.findOrCreate({
      where: { email: dto.email },
      defaults: { name: dto.name, email: dto.email, hashpass: hash },
    });
    if (!created) throw new ConflictException('Email already exists');
    const plainUser = { ...user.get() };
    delete (plainUser as any).hashpass;
    return plainUser as User;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.hashpass))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const plainUser = { ...user.get() };
    delete (plainUser as any).hashpass;
    return plainUser as User;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }

  async getProfile(id: number) {
    const user = await this.userModel.findByPk(id, {
      attributes: ['id', 'name', 'email', 'createdAt'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
