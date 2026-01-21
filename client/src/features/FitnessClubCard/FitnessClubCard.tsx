import React from 'react';
import type { FitnessType } from '@/entities/fitnessClubs/model/fitness.Type';
import { Link } from 'react-router';
import './FitnessClubCard.css';
import { Col } from 'react-bootstrap';

type FitnessCardProps = {
  fitness: FitnessType;
};

function FitnessClubCard({ fitness }: FitnessCardProps): React.JSX.Element {
  return (
    <Col style={{ margin: '50px' }} md={3}>
      <div className="fitness-card">
        <div className="card-image-container">
          <img
            src={fitness.image || '/images/default-gym.jpg'}
            alt={fitness.name}
            className="card-image"
          />
          <div className="card-rating-badge">★ {fitness.rating || 4.5}</div>
        </div>

        <div className="card-info">
          <div className="card-header">
            <h3 className="card-name">{fitness.name}</h3>
            <span className="card-price">{fitness.priceRange}</span>
          </div>

          <p className="card-address">📍 {fitness.address}</p>
          <p className="card-description">{fitness.description}</p>

          <div className="card-contact-info">
            <span className="card-contact-item">📞 {fitness.phone}</span>
            <span className="card-contact-item">✉️ {fitness.email}</span>
          </div>

          <div className="card-footer">
            <span className="card-hours">Пн-Вс: 06:00-24:00</span>
            <Link to={`/fitness/${fitness.id.toString()}`}>
              <button className="card-button">Подробнее</button>
            </Link>
          </div>
        </div>
      </div>
    </Col>
  );
}

export default FitnessClubCard;
