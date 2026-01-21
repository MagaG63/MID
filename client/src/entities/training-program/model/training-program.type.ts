export interface TrainingProgramType {
  id: number;
  name: string;
  price: string;
  contact: string;
  trainerId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTrainingProgramData {
  name: string;
  price: string;
  contact: string;
  trainerId: number;
}
