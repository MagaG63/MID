import FitnessClubCard from '@/features/FitnessClubCard/FitnessClubCard';
import React from 'react';
import type { FitnessType } from '@/entities/fitnessClubs/model/fitness.Type';
import './FitnessClubPage.css';

type Props = {
  fitness: FitnessType[];
};

function FitnessClubPage({ fitness }: Props): React.JSX.Element {
  return (
    <div className="fitness-clubs-row">
      {fitness.map((el) => (
        <FitnessClubCard key={el.id} fitness={el} />
      ))}
    </div>
  );
}

export default FitnessClubPage;
