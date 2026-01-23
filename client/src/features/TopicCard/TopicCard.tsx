import React, { useState } from 'react';
import type { ForumType } from '@/entities/forum/model/forum.type';
import './TopicCard.css';
import ModalForum from '../modalWindowForum/ModalForum';
import { useAppSelector } from '@/shared/lib/hooks';

type TopicCardProps = {
  topic: ForumType;
};

function TopicCard({ topic }: TopicCardProps): React.JSX.Element {
  const trainers = useAppSelector((str) => str.trainer.trainers);
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="topic-card">
        <div className="topic-card-header">
          <h3 className="topic-title">{topic.title}</h3>
        </div>

        <p className="topic-description">{topic.description}</p>

        <div className="topic-card-footer">
          <span className="topic-author">Автор: {trainers[topic.author_id - 1].name}</span>
          <button
            className="topic-button"
            onClick={() => {
              setShow(true);
            }}
          >
            Читать далее
          </button>
        </div>
      </div>
      <ModalForum topic={topic} show={show} setShow={setShow} />
    </>
  );
}

export default TopicCard;
