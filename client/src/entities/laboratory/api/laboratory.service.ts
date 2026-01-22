import axiosInstance from '@/shared/api/axiosInstance';
import type { LaboratoryType } from '../model/laboratory.type';
import { laboratorySchema } from '../model/laboratory.schema';

class LaboratoryService {
  static async getAll(): Promise<LaboratoryType[]> {
    try {
      const response = await axiosInstance.get('/api/laboratory');
      const laboratories = response.data.laboratories;
      return laboratorySchema.array().parse(laboratories);
    } catch (error: any) {
      console.error('Get all laboratories error:', error);
      throw error;
    }
  }

  static async getById(id: number): Promise<LaboratoryType> {
    try {
      const response = await axiosInstance.get(`/api/laboratory/${id}`);
      const laboratory = response.data.laboratory;
      return laboratorySchema.parse(laboratory);
    } catch (error: any) {
      console.error('Get laboratory by id error:', error);
      throw error;
    }
  }
}

export default LaboratoryService;
