import axios from 'axios';
import { fitnessSchema } from '../model/fitness.Schema';
import type { FitnessType } from '../model/fitness.Type';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class FitnessService {
  static async getFitnessClubs(): Promise<FitnessType[]> {
    try {
      const response = await axios.get('/api/fitness/all');

      return fitnessSchema.array().parse(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default FitnessService;
