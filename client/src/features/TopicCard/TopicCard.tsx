import React, { useState } from 'react';
import type { ForumType } from '@/entities/forum/model/forum.type';
import './TopicCard.css';
import ModalForum from '../modalWindowForum/ModalForum';
import { useAppSelector, useAppDispatch } from '@/shared/lib/hooks';
import { deleteForumThunk } from '@/entities/forum/model/forum.thunks';

type TopicCardProps = {
  topic: ForumType;
};

function TopicCard({ topic }: TopicCardProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const trainers = useAppSelector((str) => str.trainer.trainers);
  const currentTrainer = useAppSelector((state) => state.trainer.authenticatedTrainer);
  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Проверяем, является ли текущий тренер автором темы
  const isAuthor = currentTrainer && currentTrainer.id === topic.author_id;

  const handleDelete = async () => {
    if (!window.confirm('Вы уверены, что хотите удалить эту тему?')) {
      return;
    }

    console.log('🗑️ [DELETE] Попытка удаления форума:', {
      forumId: topic.id,
      forumAuthorId: topic.author_id,
      currentTrainerId: currentTrainer?.id,
      isAuthor,
    });

    try {
      setDeleting(true);
      await dispatch(deleteForumThunk(topic.id)).unwrap();
      console.log('✅ [DELETE] Форум успешно удален');
    } catch (error: any) {
      console.error('❌ [DELETE] Ошибка удаления:', error);
      alert(error || 'Ошибка удаления темы');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="topic-card">
        <div className="topic-card-header">
          <h3 className="topic-title">{topic.title}</h3>
          {isAuthor && (
            <button
              className="topic-delete-btn"
              onClick={handleDelete}
              disabled={deleting}
              title="Удалить тему"
            >
              {deleting ? '...' : '🗑️'}
            </button>
          )}
        </div>

        <p className="topic-description">{topic.description}</p>

        <div className="topic-card-footer">
          <span className="topic-author">
            Автор: {trainers.find((t) => t.id === topic.author_id)?.name || 'Неизвестно'}
          </span>
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
