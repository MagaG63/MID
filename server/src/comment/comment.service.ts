import { Injectable } from '@nestjs/common';
import { Comment } from './comment.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'db/models/user.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment)
    private readonly commentModel: typeof Comment,
  ) {}

  async getAll(): Promise<Comment[]> {
    const comments = await this.commentModel.findAll();
    return comments;
  }

  async getOne(id: number): Promise<Comment | null> {
    const comment = await this.commentModel.findByPk(id);
    return comment;
  }

  async getByForumId(forumId: number): Promise<Comment[]> {
    const comments = await this.commentModel.findAll({
      where: { forum_id: forumId },
      order: [['createdAt', 'ASC']],
    });
    return comments;
  }

  async create(createCommentDto: any): Promise<Comment> {
    const comment = await this.commentModel.create(createCommentDto);
    return comment;
  }

  async update(id: number, updateCommentDto: any): Promise<Comment | null> {
    const [affectedCount] = await this.commentModel.update(updateCommentDto, {
      where: { id },
    });

    if (affectedCount === 0) {
      return null;
    }

    return this.getOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await this.commentModel.destroy({
      where: { id },
    });
    return deletedCount > 0;
  }
}
