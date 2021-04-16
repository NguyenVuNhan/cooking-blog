import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { history } from '@cookingblog/blog/utils';

export const useQuery = (): URLSearchParams => {
  const location = useLocation();
  const param = useRef(new URLSearchParams());

  useEffect(() => {
    console.log(history.location.search);
    param.current = new URLSearchParams(history.location.search);
  }, [location, param]);

  return param.current;
};
