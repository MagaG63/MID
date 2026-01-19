import { Injectable } from '@nestjs/common';
import { Forum } from './forum.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ForumService {
  constructor(
    @InjectModel(Forum)
    private readonly forumModel: typeof Forum,
  ) {}

  async getAll(): Promise<Forum[]> {
    const forum = await this.forumModel.findAll();
    return forum;
  }

  async getOne(id: number): Promise<Forum | null> {
    const forum = await this.forumModel.findByPk(id);
    return forum;
  }
}
