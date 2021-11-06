import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useGetQuery = () => {
  const location = useLocation();
  return useMemo(() => {
    const query: Record<string, string | undefined> = {};
    const parseQuery = location.search.substring(1);
    const vars = parseQuery.split('&');

    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      query[pair[0]] = pair[1];
    }

    return query;
  }, [location]);
};
