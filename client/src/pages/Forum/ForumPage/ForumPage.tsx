import ModalForum from '@/features/modalWindowForum/ModalForum';
import React, { useState } from 'react';

function ForumPage(): React.JSX.Element {
  const [show, setShow] = useState(false);
  return (
    <div>
      <ModalForum show={show} setShow={setShow} />
    </div>
  );
}

export default ForumPage;
