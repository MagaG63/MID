import { fetchForums } from '@/entities/forum/model/forum.thunks';
import TopicCard from '@/features/TopicCard/TopicCard';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
// import { mockTopics } from '@/shared/mockData';
import React, { useEffect } from 'react';
import '../../Trainers/TrainersListPage.css';

function TopicPage(): React.JSX.Element {
  const forums = useAppSelector((store) => store.forums.forums);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    void dispatch(fetchForums());
  }, [dispatch]);
  
 if (forums.length === 0) {
    return (
      <div className="trainers-page">
        <div className="empty-state">
          <h2>Форумы не найдены</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ marginLeft: '10px', marginRight: '10px' }}>
        {forums.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </>
  );
}

export default TopicPage;
