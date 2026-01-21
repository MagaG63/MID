import { fetchFitnessClubsThunk } from '@/entities/fitnessClubs/model/fitness.Thunks';
import FitnessClubPage from '@/pages/FitnessIfno/FitnessClubPage';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { useEffect } from 'react';
import './MainPage.css';

function MainPage(): React.JSX.Element {
  const fitness = useAppSelector((store) => store.fitness.fitnessClubs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchFitnessClubsThunk());
  }, [dispatch]);

  return (
    <div className="main-page">
      <div>
        <h2>Фитнес клубы</h2>
        <p>Найдите идеальный фитнес клуб для ваших тренировок</p>
      </div>
      <div className="fitness-clubs-container">
        <FitnessClubPage fitness={fitness} />
      </div>
    </div>
  );
}

export default MainPage;
