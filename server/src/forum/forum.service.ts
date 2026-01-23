import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Forum } from './forum.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateForumDto } from './dto/forum.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ForumService {
  constructor(
    @InjectModel(Forum)
    private readonly forumModel: typeof Forum,
    private sequelize: Sequelize,
  ) {}

  // Получить все форумы
  async getAll(): Promise<any[]> {
    try {
      const forums = await this.sequelize.query(
        `
        SELECT 
          f.*,
          t.id as author_id,
          t.name as author_name,
          t.email as author_email,
          t.profileImage as author_profileImage,
          fc.id as category_id,
          fc.name as category_name,
          fc.slug as category_slug,
          fc.icon as category_icon,
          fc.color as category_color,
          (SELECT COUNT(*) FROM forum_comments WHERE forum_id = f.id AND status = 'active') as commentsCount,
          (SELECT COUNT(*) FROM forum_likes WHERE forum_id = f.id AND type = 'like') as likesCount,
          (SELECT COUNT(*) FROM forum_views WHERE forum_id = f.id) as viewsCount
        FROM Forums f
        LEFT JOIN Trainers t ON f.author_id = t.id
        LEFT JOIN forum_categories fc ON f.category_id = fc.id
        ORDER BY f.is_pinned DESC, f.createdAt DESC
        `,
        { type: 'SELECT' }
      );

      return forums;
    } catch (error) {
      console.error('❌ Ошибка получения форумов:', error);
      throw error;
    }
  }

  // Получить один форум по ID
  async getOne(id: number): Promise<any> {
    try {
      const [forum] = await this.sequelize.query(
        `
        SELECT 
          f.*,
          t.id as author_id,
          t.name as author_name,
          t.email as author_email,
          t.profileImage as author_profileImage,
          fc.id as category_id,
          fc.name as category_name,
          fc.slug as category_slug,
          fc.icon as category_icon,
          fc.color as category_color,
          (SELECT COUNT(*) FROM forum_likes WHERE forum_id = f.id AND type = 'like') as likesCount,
          (SELECT COUNT(*) FROM forum_views WHERE forum_id = f.id) as viewsCount
        FROM Forums f
        LEFT JOIN Trainers t ON f.author_id = t.id
        LEFT JOIN forum_categories fc ON f.category_id = fc.id
        WHERE f.id = :id
        `,
        { 
          replacements: { id },
          type: 'SELECT' 
        }
      );

      if (!forum) {
        throw new NotFoundException(`Форум с ID ${id} не найден`);
      }

      // Получаем комментарии
      const comments = await this.sequelize.query(
        `
        SELECT 
          c.*,
          u.id as author_id,
          u.name as author_name,
          u.email as author_email
        FROM forum_comments c
        LEFT JOIN Users u ON c.author_id = u.id
        WHERE c.forum_id = :id AND c.status = 'active'
        ORDER BY c.createdAt ASC
        `,
        { 
          replacements: { id },
          type: 'SELECT' 
        }
      );

      return {
        ...forum,
        comments,
        commentsCount: comments.length,
      };
    } catch (error) {
      console.error('❌ Ошибка получения форума:', error);
      throw error;
    }
  }

  // Создать новый форум
  async create(createForumDto: CreateForumDto): Promise<Forum> {
    try {
      console.log('🔄 Создание форума:', createForumDto);

      const forum = await this.forumModel.create({
        title: createForumDto.title,
        description: createForumDto.description,
        author_id: createForumDto.author_id,
        category_id: createForumDto.category_id,
        status: createForumDto.status || 'active',
        is_pinned: createForumDto.is_pinned || false,
      } as any);

      console.log('✅ Форум создан:', forum.id);
      return forum;
    } catch (error) {
      console.error('❌ Ошибка создания форума:', error);
      throw error;
    }
  }

  // Удалить форум (каскадное удаление всех связанных данных)
  async delete(id: number, userId: number): Promise<{ message: string }> {
    try {
      console.log('🔄 Удаление форума:', { forumId: id, userId });

      const forum = await this.forumModel.findByPk(id);

      if (!forum) {
        throw new NotFoundException(`Форум с ID ${id} не найден`);
      }

      console.log('📋 Данные форума:', {
        forumId: forum.id,
        forumAuthorId: forum.author_id,
        userId,
        match: forum.author_id === userId,
      });

      // Проверяем, что пользователь является автором
      if (forum.author_id !== userId) {
        throw new ForbiddenException('Вы не можете удалить чужой форум');
      }

      // Удаляем все связанные комментарии
      const [deletedComments] = await this.sequelize.query(
        'DELETE FROM forum_comments WHERE forum_id = :id',
        { replacements: { id } }
      );
      console.log(`✅ Удалено комментариев: ${deletedComments}`);

      // Удаляем все лайки
      const [deletedLikes] = await this.sequelize.query(
        'DELETE FROM forum_likes WHERE forum_id = :id',
        { replacements: { id } }
      );
      console.log(`✅ Удалено лайков: ${deletedLikes}`);

      // Удаляем все просмотры
      const [deletedViews] = await this.sequelize.query(
        'DELETE FROM forum_views WHERE forum_id = :id',
        { replacements: { id } }
      );
      console.log(`✅ Удалено просмотров: ${deletedViews}`);

      // Удаляем сам форум
      await forum.destroy();
      console.log('✅ Форум удален:', id);

      return {
        message: `Форум успешно удален вместе с комментариями, лайками и просмотрами`,
      };
    } catch (error) {
      console.error('❌ Ошибка удаления форума:', error);
      throw error;
    }
  }
}
