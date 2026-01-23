// src/pages/Profile/ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { logout as logoutUser } from '@/entities/user/model/user.slice';
import { logout as logoutTrainer } from '@/entities/trainer/model/trainer.slice';
import { getImageUrl, handleImageError } from '@/shared/lib/imageUtils';
import axiosInstance, { setAccessToken } from '@/shared/api/axiosInstance';
import { useAuth } from '@/shared/lib/useAuth';
import EditProfileModal from '@/features/EditProfileModal/EditProfileModal';
import type { TrainingProgramFormData } from '@/features/TrainingProgramModal/TrainingProgramModal';
import TrainingProgramModal from '@/features/TrainingProgramModal/TrainingProgramModal';
import CreateForumModal from '@/features/CreateForumModal/CreateForumModal';
import {
  fetchTrainerProgramsThunk,
  createProgramThunk,
  updateProgramThunk,
  deleteProgramThunk,
} from '@/entities/training-program';
import { createForumThunk } from '@/entities/forum/model/forum.thunks';
import './MyPage.css';

type ProfileType = 'user' | 'trainer' | null;

function ProfilePage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { isLoggedIn, role } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [isForumModalOpen, setIsForumModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<TrainingProgramFormData | null>(null);

  // ✅ ИСПРАВЛЕНО: правильные пути к данным
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const currentTrainer = useAppSelector((state) => state.trainer.authenticatedTrainer);
  const trainingPrograms = useAppSelector((state) => state.trainingProgram.programs);
  const programsLoading = useAppSelector((state) => state.trainingProgram.loading);


  const handleForumThema = () => {
    console.log('🔵 Открываем модалку форума');
    setIsForumModalOpen(true);
  };

  const handleForumSubmit = async (data: {
    title: string;
    description: string;
    category_id: number;
  }) => {
    try {
      await dispatch(createForumThunk(data)).unwrap();
      // Форум автоматически добавится в Redux через slice
    } catch (error: any) {
      throw new Error(error || 'Ошибка создания темы форума');
    }
  };

  const handleLogout = async () => {
    try {
      // Отправляем запрос на сервер для удаления refresh token
      await axiosInstance.delete('/api/auth/logout');

      // Очищаем access token на клиенте
      setAccessToken('');

      // Очищаем состояние в Redux
      if (role === 'user') {
        dispatch(logoutUser());
      } else if (role === 'trainer') {
        dispatch(logoutTrainer());
      }

      // Перенаправляем на главную страницу
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Даже если запрос не удался, очищаем локальное состояние
      setAccessToken('');
      if (role === 'user') {
        dispatch(logoutUser());
      } else if (role === 'trainer') {
        dispatch(logoutTrainer());
      }
      window.location.href = '/';
    }
  };

  // Определяем тип профиля
  const profileType: ProfileType = currentTrainer ? 'trainer' : currentUser ? 'user' : null;
  const profileData = currentTrainer || currentUser; // ✅ Берем из правильного store

  console.log('📊 Profile debug:', {
    currentUser,
    currentTrainer,
    profileType,
    profileData,
    profileImage: (currentTrainer as any)?.profileImage,
    qualificationImages: (currentTrainer as any)?.qualificationImages,
  });

  useEffect(() => {
    // Если нет авторизации, перенаправляем на логин
    if (!currentUser && !currentTrainer) {
      navigate('/login');
    }
  }, [currentUser, currentTrainer, navigate]);

  // Загружаем программы тренера
  useEffect(() => {
    if (currentTrainer?.id) {
      dispatch(fetchTrainerProgramsThunk(currentTrainer.id)).catch((error) => {
        console.error('Ошибка загрузки программ:', error);
      });
    }
  }, [currentTrainer?.id, dispatch]);

  const handleCreateProgram = () => {
    setEditingProgram(null);
    setIsProgramModalOpen(true);
  };

  const handleEditProgram = (program: any) => {
    setEditingProgram({
      id: program.id,
      name: program.name,
      price: program.price,
      contact: program.contact,
    });
    setIsProgramModalOpen(true);
  };

  const handleDeleteProgram = async (programId: number) => {
    if (!currentTrainer?.id) return;

    if (window.confirm('Вы уверены, что хотите удалить эту программу?')) {
      try {
        await dispatch(
          deleteProgramThunk({ id: programId, trainerId: currentTrainer.id }),
        ).unwrap();
      } catch (error: any) {
        alert(error || 'Ошибка удаления программы');
      }
    }
  };

  const handleProgramSubmit = async (data: TrainingProgramFormData) => {
    if (!currentTrainer?.id) {
      throw new Error('Не авторизован как тренер');
    }

    if (editingProgram?.id) {
      // Обновление
      await dispatch(
        updateProgramThunk({
          id: editingProgram.id,
          trainerId: currentTrainer.id,
          data: {
            name: data.name,
            price: data.price,
            contact: data.contact,
            trainerId: currentTrainer.id,
          },
        }),
      ).unwrap();
    } else {
      // Создание
      await dispatch(
        createProgramThunk({
          name: data.name,
          price: data.price,
          contact: data.contact,
          trainerId: currentTrainer.id,
        }),
      ).unwrap();
    }
  };
  //   }
  // };

  if (!profileData) {
    return (
      <div className="profile-container">
        <div className="loading">Загрузка профиля...</div>
      </div>
    );
  }

  // Для тренера берем дополнительные поля
  const isTrainer = profileType === 'trainer';
  const trainerData = isTrainer ? (profileData as any) : null;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1 className="profile-title">Профиль {isTrainer ? 'тренера' : 'пользователя'}</h1>
          <div className={`profile-badge ${profileType}`}>
            {isTrainer ? `🏋️${profileData.name} ` : `👤 ${profileData.name}`}
          </div>
        </div>

        <div className="profile-section">
          <h2 className="section-title">Основная информация</h2>
          <div className="info-grid">
            {/* <div className="info-item">
              <span className="info-label">ID:</span>
              <span className="info-value">{profileData.id}</span>
            </div> */}
            <div className="info-item">
              <span className="info-label">Имя:</span>
              <span className="info-value">{profileData.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{profileData.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Роль:</span>
              <span className="info-value">{isTrainer ? 'Тренер' : 'Пользователь'}</span>
            </div>
          </div>
        </div>

        {/* Фото профиля (только для тренера) */}
        {isTrainer && trainerData?.profileImage && (
          <div className="profile-section">
            <h2 className="section-title">Фото профиля</h2>
            <div className="profile-image-container">
              <img
                src={getImageUrl(trainerData.profileImage)}
                alt="Фото профиля"
                className="profile-image"
                onError={(e) => handleImageError(e)}
              />
            </div>
          </div>
        )}

        {/* Описание (только для тренера) */}
        {isTrainer && trainerData?.description && (
          <div className="profile-section">
            <h2 className="section-title">Обо мне</h2>
            <div className="description-box">
              <p>{trainerData.description}</p>
            </div>
          </div>
        )}

        {/* Сертификаты (только для тренера) */}
        {isTrainer &&
          trainerData?.qualificationImages &&
          trainerData.qualificationImages.length > 0 && (
            <div className="profile-section">
              <h2 className="section-title">
                Сертификаты ({trainerData.qualificationImages.length})
              </h2>
              <div className="qualifications-grid">
                {trainerData.qualificationImages.map((cert: any, index: number) => {
                  // Обрабатываем разные форматы данных
                  const certUrl = typeof cert === 'string' ? cert : cert.url || cert;
                  const certName =
                    typeof cert === 'object' && cert.name ? cert.name : `Сертификат ${index + 1}`;

                  console.log(`📸 Certificate ${index}:`, certUrl);

                  return (
                    <div key={index} className="certificate-item">
                      <img
                        src={getImageUrl(certUrl)}
                        alt={certName}
                        className="certificate-image"
                        onError={(e) =>
                          handleImageError(e, 'https://via.placeholder.com/200x150?text=Сертификат')
                        }
                      />
                      <p className="certificate-name">{certName}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        {/* Программы тренировок (только для тренера) */}
        {isTrainer && (
          <div className="profile-section">
            <div className="section-header">
              <h2 className="section-title">Программы тренировок</h2>
              <button className="btn btn-primary btn-sm" onClick={handleCreateProgram}>
                + Добавить программу
              </button>
            </div>

            {programsLoading ? (
              <div className="loading">Загрузка программ...</div>
            ) : trainingPrograms.length === 0 ? (
              <div className="empty-state">
                <p>У вас пока нет программ тренировок</p>
                <button className="btn btn-primary" onClick={handleCreateProgram}>
                  Создать первую программу
                </button>
              </div>
            ) : (
              <div className="programs-list">
                {trainingPrograms.map((program) => (
                  <div key={program.id} className="program-card">
                    <div className="program-info">
                      <h3 className="program-name">{program.name}</h3>
                      <p className="program-price">{program.price}</p>
                      <p className="program-contact">
                        <span>Контакт:</span> {program.contact}
                      </p>
                    </div>
                    <div className="program-actions">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleEditProgram(program)}
                      >
                        Редактировать
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteProgram(program.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
     

     {isTrainer && (
          <div className="profile-section">
            <div className="section-header">
              <button className="btn btn-primary btn-sm" onClick={handleForumThema}>
                + Добавить тему форума
              </button>
            </div>
          </div>
        )}
        {/* Действия */}
        <div className="profile-actions">
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            Редактировать профиль
          </button>
          <button className="btn btn-logout" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </div>

      {/* Модальное окно редактирования профиля */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profileType={profileType!}
        currentData={profileData}
      />

      {/* Модальное окно программы тренировок */}
      <TrainingProgramModal
        isOpen={isProgramModalOpen}
        onClose={() => {
          setIsProgramModalOpen(false);
          setEditingProgram(null);
        }}
        onSubmit={handleProgramSubmit}
        initialData={editingProgram}
        mode={editingProgram ? 'edit' : 'create'}
      />

      {/* Модальное окно создания темы форума */}
      <CreateForumModal
        isOpen={isForumModalOpen}
        onClose={() => setIsForumModalOpen(false)}
        onSubmit={handleForumSubmit}
      />
    </div>
  );
}

export default ProfilePage;
