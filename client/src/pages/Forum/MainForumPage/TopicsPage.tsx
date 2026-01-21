import { fetchForums } from '@/entities/forum/model/forum.thunks';
import TopicCard from '@/features/TopicCard/TopicCard';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
// import { mockTopics } from '@/shared/mockData';
import React, { useEffect } from 'react';

function TopicPage(): React.JSX.Element {
  const forums = useAppSelector((store) => store.forums.forums);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    void dispatch(fetchForums());
  }, [dispatch]); // Добавляем зависимость dispatch
  
  return (
    <>
      <div>TopicPage</div>
      <div style={{ marginLeft: '10px', marginRight: '10px' }}>
        {forums.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </>
  );
}

export default TopicPage;
