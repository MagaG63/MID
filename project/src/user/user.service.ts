import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

 async  getAll(): Promise<User[]>{
 const user = await this.userModel.findAll();
  return user;
  }

  //   async create(dto: CreateUserDto): Promise<User> {
  //     const hash = await bcrypt.hash(dto.password, 10);

  //     const [user, created] = await this.userModel.findOrCreate({
  //       where: { email: dto.email },
  //       defaults: { name: dto.name, hashpass: hash, },
  //     });

  //     return user
  //   }
}
