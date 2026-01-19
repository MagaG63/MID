export class CreateFitnessDto {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  rating?: number;
  priceRange: string;
  workingHours: string;
  image?: string;
}
