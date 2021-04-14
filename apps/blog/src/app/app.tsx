import { authActions } from '@cookingblog/blog/data-access';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      authActions.login({
        email: 'qwe@gmail.com',
        password: 'qweasdzxc',
      })
    );
  }, [dispatch]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to blog!</h1>
      <img
        width="450"
        src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
        alt=""
      />
    </div>
  );
};

export default App;
