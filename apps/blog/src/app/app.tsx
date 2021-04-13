import React, { useEffect, useState } from 'react';

export const App = () => {
  const [m, setMessage] = useState<string>('');

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to blog!</h1>
        <img
          width="450"
          src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
          alt=""
        />
      </div>
      <div>{m}</div>
    </>
  );
};

export default App;
