import FitnessClubCard from '@/features/FitnessClubCard/FitnessClubCard';
import React from 'react';
import { Row } from 'react-bootstrap';
import type { FitnessType } from '@/entities/fitnessClubs/model/fitness.Type';
type Props = {
  fitness: FitnessType[];
};

function FitnessClubPage({ fitness }: Props): React.JSX.Element {
  return (
    <>
      <Row>
        {fitness.map((el) => (
          <FitnessClubCard key={el.id} fitness={el} />
        ))}
      </Row>
    </>
  );
}

export default FitnessClubPage;
