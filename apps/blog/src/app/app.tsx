import React, { useEffect, useState } from 'react';
import { Message } from '@cookingblog/api-interfaces';
import { EditButton } from '@blog/components';

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to blog!</h1>
        <EditButton />
        <img
          width="450"
          src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
          alt=""
        />
      </div>
      <div>{m.message}</div>
    </>
  );
};

export default App;
