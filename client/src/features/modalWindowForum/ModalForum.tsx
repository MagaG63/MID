import type { ForumType } from '@/entities/forum/model/forum.type';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './ModalForum.css';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { addComment, fetchComment } from '@/entities/comments/model/comment.thunks';
import { fetchUsers } from '@/entities/user/model/user.thunk';
import { fetchTrainersThunk } from '@/entities/trainer/model/trainer.thunk';
import { useNavigate } from 'react-router';

type Props = {
  topic: ForumType;
  show: boolean;
  setShow: (value: boolean) => void;
};

function ModalForum({ setShow, topic, show }: Props): React.JSX.Element {
  const [data, setData] = useState('');
  const dispatch = useAppDispatch();
  const comments = useAppSelector((store) => store.comments.comments);
  const user = useAppSelector((store) => store.user.currentUser);
  const trainer = useAppSelector((store) => store.trainer.authenticatedTrainer);
  const users = useAppSelector((store) => store.user.Users);
  const trainers = useAppSelector((store) => store.trainer.trainers);
  const navigate = useNavigate();

  console.log('Users:', users);
  console.log('Trainers:', trainers);

  useEffect(() => {
    void dispatch(fetchComment());
    void dispatch(fetchUsers());
    void dispatch(fetchTrainersThunk());
  }, [dispatch]);

  const handleClose = (): void => setShow(false);

  const handleCommentSubmit = async (): Promise<void> => {
    // Проверяем, авторизован ли пользователь или тренер
    const currentUser = user || trainer;

    if (currentUser && data.trim()) {
      // Определяем тип автора
      const authorType: 'user' | 'trainer' = user ? 'user' : 'trainer';

      const response = {
        forum_id: topic.id,
        author_id: currentUser.id,
        author_type: authorType,
        content: data.trim(),
        parent_id: undefined,
        likes_count: undefined,
        status: undefined,
      };

      try {
        await dispatch(addComment(response));
        setData(''); // Очищаем поле ввода после успешной отправки
        void dispatch(fetchComment()); // Обновляем список комментариев
      } catch (error) {
        console.error('Ошибка при добавлении комментария:', error);
      }
    } else {
      navigate('/login');
    }
  };

  // Функция для получения имени автора комментария
  const getAuthorName = (comment: any): string => {
    if (comment.author_type === 'trainer') {
      const trainer = trainers.find((t) => t.id === comment.author_id);
      return trainer?.name || 'Тренер';
    }
    const user = users.find((u) => u.id === comment.author_id);
    return user?.name || 'Пользователь';
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="modal-forum-custom"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton className="modal-forum-header">
        <div className="modal-title-wrapper">
          <Modal.Title className="modal-forum-title">
            <i className="bi bi-chat-dots me-2"></i>
            {topic.title}
          </Modal.Title>
          <div className="modal-topic-meta">
            <span className="badge bg-primary me-2">
              <i className="bi bi-tag"></i> Общее
            </span>
            <span className="text-muted small">
              <i className="bi bi-calendar me-1"></i>
              {new Date().toLocaleDateString('ru-RU')}
            </span>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="modal-forum-body">
        {/* Основной контент темы */}
        <div className="topic-content">
          <div className="topic-description">
            <h6 className="description-label">
              <i className="bi bi-card-text me-2"></i>Описание темы
            </h6>
            <div className="description-text">{topic.description}</div>
          </div>

          <div className="topic-stats">
            <div className="row g-3">
              <div className="col-lg-3 col-md-6 col-6">
                <div className="stat-card">
                  <i className="bi bi-eye"></i>
                  <span>127 просмотров</span>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-6">
                <div className="stat-card">
                  <i className="bi bi-chat"></i>
                  <span>3 ответа</span>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-6">
                <div className="stat-card">
                  <i className="bi bi-hand-thumbs-up"></i>
                  <span>15 лайков</span>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-6">
                <div className="stat-card">
                  <i className="bi bi-person"></i>
                  <span>{trainers.find((t) => t.id === topic.author_id)?.name || 'Неизвестно'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Секция комментариев */}
        <div className="comment-section">
          {/* Форма добавления комментария */}

          <div className="comment-form">
            <Form.Label>
              <i className="bi bi-pencil-square"></i>
              Оставить комментарий
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Поделитесь своим мнением..."
              value={data}
              onChange={(e) => {
                setData(e.target.value);
              }}
            />
            <Button className="comment-submit-btn" onClick={handleCommentSubmit}>
              <i className="bi bi-send me-2"></i>
              Отправить комментарий
            </Button>
          </div>
          {/* Список комментариев */}
          <div className="comments-list">
            <Form.Label>
              <i className="bi bi-chat-left-text"></i>
              Комментарии ({comments.filter((comment) => comment.forum_id === topic.id).length})
            </Form.Label>

            {comments.map(
              (comment) =>
                comment.forum_id === topic.id && (
                  <div key={comment.id} className="comment-item">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <strong className="text-primary">
                        {getAuthorName(comment)}
                        {comment.author_type === 'trainer' && (
                          <span className="badge bg-success ms-2">Тренер</span>
                        )}
                      </strong>
                      <small className="text-muted">{comment.createdAt?.slice(0, 10)}</small>
                    </div>
                    <p className="mb-0">{comment.content}</p>
                  </div>
                ),
            )}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="modal-forum-footer">
        <div className="footer-actions">
          <Button variant="outline-secondary" onClick={handleClose} className="action-btn">
            <i className="bi bi-x-circle me-2"></i>
            Закрыть
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalForum;
