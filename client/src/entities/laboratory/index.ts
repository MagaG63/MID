export { default as laboratoryReducer } from './model/laboratory.slice';
export { fetchLaboratories, fetchLaboratoryById } from './model/laboratory.thunks';
export type { LaboratoryType, LaboratoryState } from './model/laboratory.type';
export { default as LaboratoryService } from './api/laboratory.service';
