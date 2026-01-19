import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GymReviews } from './gyms-reviews.model';
import { GymReviewsCreationAttributes } from './gyms-reviews.model';

@Injectable()
export class GymsReviewsService {
  constructor(
    @InjectModel(GymReviews) private gymsReviewsModel: typeof GymReviews,
  ) {}

  async findByGymId(gymId: number): Promise<GymReviews[]> {
    return this.gymsReviewsModel.findAll({
      where: { gymId },
      include: [
        { association: 'gym' },
        { association: 'user' },
        { association: 'trainer' },
      ],
    });
  }

  async create(
    createReviewDto: GymReviewsCreationAttributes,
  ): Promise<GymReviews> {
    return this.gymsReviewsModel.create(createReviewDto);
  }

  async remove(id: number): Promise<void> {
    const review = await this.gymsReviewsModel.findByPk(id);
    if (review) {
      await review.destroy();
    }
  }
}
