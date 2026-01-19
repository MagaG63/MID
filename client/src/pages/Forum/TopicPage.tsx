import TopicCard from '@/features/TopicCard/TopicCard';
import { mockTopics } from '@/shared/mockData';
import React from 'react';

function TopicPage(): React.JSX.Element {
  return (
    <>
      <div>TopicPage</div>
      {mockTopics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </>
  );
}

export default TopicPage;
