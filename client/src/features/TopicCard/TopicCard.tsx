import React, { useState } from 'react';
import type { ForumType } from '@/entities/forum/model/forum.type';
import './TopicCard.css';
import ModalForum from '../modalWindowForum/ModalForum';

type TopicCardProps = {
  topic: ForumType;
};

function TopicCard({ topic }: TopicCardProps): React.JSX.Element {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="topic-card">
        <div className="topic-card-header">
          <h3 className="topic-title">{topic.title}</h3>
        </div>

        <p className="topic-description">{topic.description}</p>

        <div className="topic-card-footer">
          <span className="topic-author">Автор: {topic.author_id}</span>
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
