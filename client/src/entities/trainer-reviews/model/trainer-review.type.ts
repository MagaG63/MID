export interface TrainerReviewType {
  id: number;
  userId: number;
  trainerId: number;
  rate: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: number;
    name: string;
  };
}

export interface CreateTrainerReviewData {
  trainerId: number;
  rate: number;
  text?: string;
}

export interface TrainerRatingData {
  averageRating: number;
  totalReviews: number;
}
