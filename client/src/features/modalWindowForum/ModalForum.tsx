import type { ForumType } from '@/entities/forum/model/forum.type';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ModalForum.css'; // Создайте этот файл для стилей

type Props = {
  topic: ForumType;
  show: boolean;
  setShow: (value: boolean) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
  onSave?: () => void;
};

function ModalForum({
  setShow,
  topic,
  show,
  onEdit,
  onDelete,
  onShare,
  onSave,
}: Props): React.JSX.Element {
  const handleClose = () => setShow(false);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="modal-forum-custom"
      centered
      size="xl"
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
              <i className="bi bi-tag"></i> {topic.category || 'Общее'}
            </span>
            <span className="text-muted small">
              <i className="bi bi-calendar me-1"></i>
              {new Date(topic.createdAt || Date.now()).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="modal-forum-body">
        <div className="topic-content">
          <div className="topic-description">
            <h6 className="description-label">
              <i className="bi bi-card-text me-2"></i>Описание:
            </h6>
            <div className="description-text">{topic.description}</div>
          </div>

          {topic.content && (
            <div className="topic-full-content mt-4">
              <h6 className="content-label">
                <i className="bi bi-file-text me-2"></i>Полное содержание:
              </h6>
              <div className="content-text">{topic.content}</div>
            </div>
          )}

          <div className="topic-stats mt-4">
            <div className="row g-3">
              <div className="col-md-3 col-6">
                <div className="stat-card">
                  <i className="bi bi-eye"></i>
                  <span>{topic.views || 0} просмотров</span>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="stat-card">
                  <i className="bi bi-chat"></i>
                  <span>{topic.commentsCount || 0} комментариев</span>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="stat-card">
                  <i className="bi bi-hand-thumbs-up"></i>
                  <span>{topic.likes || 0} лайков</span>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="stat-card">
                  <i className="bi bi-person"></i>
                  <span>Автор: {topic.author || 'Неизвестно'}</span>
                </div>
              </div>
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
            {onShare && (
              <Button variant="outline-info" onClick={onShare} className="action-btn">
                <i className="bi bi-share me-2"></i>
                Поделиться
              </Button>
            )}

            {onSave && (
              <Button variant="outline-success" onClick={onSave} className="action-btn">
                <i className="bi bi-bookmark me-2"></i>
                Сохранить
              </Button>
            )}

            {onEdit && (
              <Button variant="outline-warning" onClick={onEdit} className="action-btn">
                <i className="bi bi-pencil me-2"></i>
                Редактировать
              </Button>
            )}

            {onDelete && (
              <Button variant="outline-danger" onClick={onDelete} className="action-btn">
                <i className="bi bi-trash me-2"></i>
                Удалить
              </Button>
            )}
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalForum;
