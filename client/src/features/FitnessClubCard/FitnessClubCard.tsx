import React from 'react';
import { Button, Card, Col, ListGroup } from 'react-bootstrap';
import type { FitnessType } from '@/entities/fitnessClubs/model/fitness.Type';
type FitnessCardProps = {
  fitness: FitnessType;
};
function FitnessClubCard({ fitness }: FitnessCardProps): React.JSX.Element {
  return (
    <Col md={3}>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={fitness.image} />
        <Card.Body>
          <Card.Title>{fitness.name}</Card.Title>
          <Card.Text>{fitness.description}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
          <ListGroup.Item>{fitness.phone}</ListGroup.Item>
          <ListGroup.Item>{fitness.email}</ListGroup.Item>
          <ListGroup.Item>{fitness.address}</ListGroup.Item>
          <h6>Цена-{fitness.priceRange}</h6>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default FitnessClubCard;
