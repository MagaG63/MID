import type { ForumType } from '@/entities/forum/model/forum.type';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './ModalForum.css';

type Props = {
  topic: ForumType;
  show: boolean;
  setShow: (value: boolean) => void;
};

function ModalForum({ setShow, topic, show }: Props): React.JSX.Element {
  const [comment, setComment] = useState('');

  const handleClose = (): void => setShow(false);

  const handleCommentSubmit = (): void => {
    // Здесь будет логика отправки комментария
    console.log('Отправка комментария:', comment);
    setComment('');
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Поделитесь своим мнением..."
            />
            <Button
              className="comment-submit-btn"
              onClick={handleCommentSubmit}
              disabled={!comment.trim()}
            >
              <i className="bi bi-send me-2"></i>
              Отправить комментарий
            </Button>
          </div>

          {/* Список комментариев */}
          <div className="comments-list">
            <Form.Label>
              <i className="bi bi-chat-left-text"></i>
              Комментарии (3)
            </Form.Label>

            {/* Пример комментария */}
            <div className="comment-item">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <strong className="text-primary">Александр К.</strong>
                <small className="text-muted">2 часа назад</small>
              </div>
              <p className="mb-0">
                Отличная тема! Очень актуальная информация, спасибо за подробное описание.
              </p>
            </div>

            <div className="comment-item">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <strong className="text-primary">Мария С.</strong>
                <small className="text-muted">5 часов назад</small>
              </div>
              <p className="mb-0">
                Согласна с предыдущим комментарием. Добавлю от себя, что это действительно работает
                на практике.
              </p>
            </div>

            <div className="comment-item">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <strong className="text-primary">Дмитрий П.</strong>
                <small className="text-muted">1 день назад</small>
              </div>
              <p className="mb-0">
                Интересный подход! Буду пробовать применить в своих тренировках.
              </p>
            </div>
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
