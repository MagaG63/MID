import type { ForumType } from '@/entities/forum/model/forum.type';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, useAccordionButton } from 'react-bootstrap';
import './ModalForum.css';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { addComment, fetchComment } from '@/entities/comments/model/comment.thunks';

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
  useEffect(() => {
    void dispatch(fetchComment());
  }, []);

  const handleClose = (): void => setShow(false);

  const handleCommentSubmit = (): void => {
    if (user) {
      const response = {
        forum_id: topic.id,
        author_id: user.id,
        content: data,
        parent_id: undefined,
        likes_count: undefined,
        status: undefined,
      };
      void dispatch(addComment(response));
    }
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
                  <span>Автор темы</span>
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
              Комментарии ({comments.filter((comment) => comment.id === topic.id).length})
            </Form.Label>

            {comments.map(
              (comment) =>
                comment.id === topic.id && (
                  <>
                    <div className="comment-item">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <strong className="text-primary">{comment.author_id}.</strong>
                        <small className="text-muted">{comment.createdAt}</small>
                      </div>
                      <p className="mb-0">{comment.content}</p>
                    </div>
                  </>
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

          <div className="action-buttons-group">
            <Button variant="outline-success" className="action-btn">
              <i className="bi bi-bookmark me-2"></i>
              Сохранить
            </Button>

            <Button variant="outline-primary" className="action-btn">
              <i className="bi bi-share me-2"></i>
              Поделиться
            </Button>

            <Button variant="outline-warning" className="action-btn">
              <i className="bi bi-pencil me-2"></i>
              Редактировать
            </Button>

            <Button variant="outline-danger" className="action-btn">
              <i className="bi bi-flag me-2"></i>
              Пожаловаться
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalForum;
