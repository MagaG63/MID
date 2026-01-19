import React from 'react';
import type { ForumType } from '@/entities/';
import './TopicCard.css';

type TopicCardProps = {
  topic: ForumType;
};

function TopicCard({ topic }: TopicCardProps): React.JSX.Element {
  return (
    <>
      <div className="topic-card">
        <div className="topic-card-header">
          <h3 className="topic-title">{topic.title}</h3>
          <span className="topic-date">{topic.createdAt}</span>
        </div>

        <p className="topic-description">{topic.description}</p>

        <div className="topic-card-footer">
          <span className="topic-author">Автор: {topic.author}</span>
          <button className="topic-button">Читать далее</button>
        </div>
      </div>
    </>
  );
}

export default TopicCard;
