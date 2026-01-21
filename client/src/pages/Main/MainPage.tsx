import { fetchFitnessClubsThunk } from '@/entities/fitnessClubs/model/fitness.Thunks';
import FitnessClubPage from '@/pages/FitnessIfno/FitnessClubPage';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
// import { mockFitnessClubs } from '@/shared/mockData';
import { useEffect } from 'react';
function MainPage(): React.JSX.Element {
  const trainer = useAppSelector((str) => str.user.currentUser)
  const user = useAppSelector((str) => str.trainer.currentTrainer)

  if (user){
    console.log(user)
  }
  if (trainer){
    console.log(trainer)
  }
  const fitness = useAppSelector((store) => store.fitness.fitnessClubs);
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(fetchFitnessClubsThunk());
  }, []);
  return (
    <>
      <div>
        <h2>Главная стр</h2>
        <p>Добро пожаловать на главную страницу!</p>
      </div>
      <FitnessClubPage fitness={fitness} />
    </>
  );
}

export default MainPage;
