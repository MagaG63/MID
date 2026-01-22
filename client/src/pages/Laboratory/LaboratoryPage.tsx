import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { fetchLaboratories } from '@/entities/laboratory';
import type { LaboratoryType } from '@/entities/laboratory';
import LaboratoryService from '@/entities/laboratory/api/laboratory.service';
import './LaboratoryPage.css';

export default function LaboratoryPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { laboratories, loading, error } = useAppSelector((state) => state.laboratory);
  
  const [selectedLab, setSelectedLab] = useState<LaboratoryType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    dispatch(fetchLaboratories());
  }, [dispatch]);

  const handleOpenModal = async (id: number) => {
    try {
      setLoadingDetails(true);
      setIsModalOpen(true);
      const laboratory = await LaboratoryService.getById(id);
      setSelectedLab(laboratory);
    } catch (error) {
      console.error('Error loading laboratory details:', error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLab(null);
  };

  if (loading) {
    return (
      <div className="laboratory-page">
        <div className="loading">Загрузка лабораторий...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="laboratory-page">
        <div className="error-message">
          <p>Ошибка: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="laboratory-page">
      <div className="page-header">
        <h1>Лаборатории</h1>
        <p className="subtitle">Список медицинских лабораторий</p>
      </div>

      <div className="laboratories-grid">
        {laboratories.map((lab) => (
          <div key={lab.id} className="laboratory-card">
            <div className="card-header">
              <h3 className="lab-name">{lab.name}</h3>
            </div>
            
            <div className="card-body">
              <div className="info-row">
                <span className="label">Заявлено:</span>
                <span className="value">{lab.stated}</span>
              </div>
              <div className="info-row">
                <span className="label">Выявлено:</span>
                <span className={`value status-${lab.status.toLowerCase()}`}>{lab.status}</span>
              </div>
            </div>

            <button 
              className="btn-details" 
              onClick={() => handleOpenModal(lab.id)}
            >
              Подробнее
            </button>
          </div>
        ))}
      </div>

      {laboratories.length === 0 && (
        <div className="empty-state">
          <p>Лаборатории не найдены</p>
        </div>
      )}

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>
              ×
            </button>

            {loadingDetails ? (
              <div className="modal-loading">Загрузка...</div>
            ) : selectedLab ? (
              <>
                <div className="modal-header">
                  <h2>{selectedLab.name}</h2>
                  <span className={`status-badge ${selectedLab.status.toLowerCase()}`}>
                    {selectedLab.status}
                  </span>
                </div>

                <div className="modal-body">
                  <div className="detail-row">
                    <span className="detail-label">Название:</span>
                    <span className="detail-value">{selectedLab.name}</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Заявлено:</span>
                    <span className="detail-value">{selectedLab.stated}</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Выявлено:</span>
                    <span className="detail-value">{selectedLab.status}</span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Пост:</span>
                    <span className="detail-value">{selectedLab.post}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="modal-error">Данные не загружены</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
