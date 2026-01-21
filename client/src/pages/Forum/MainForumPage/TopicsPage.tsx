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
  },[] );
  return (
    <>
      <div>TopicPage</div>
      {forums.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </>
  );
}

export default TopicPage;
