export { default as trainingProgramReducer } from './model/training-program.slice';
export { clearError, clearPrograms } from './model/training-program.slice';
export {
  fetchTrainerProgramsThunk,
  createProgramThunk,
  updateProgramThunk,
  deleteProgramThunk,
} from './model/training-program.thunks';
export type { TrainingProgramType, CreateTrainingProgramData } from './model/training-program.type';
