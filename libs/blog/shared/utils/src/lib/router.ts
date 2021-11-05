import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useGetQuery = () => {
  const location = useLocation();
  const [query, setQuery] =
    useState<Record<string, string | undefined>>(undefined);

  useEffect(() => {
    const parseQuery = location.search.substring(1);
    const vars = parseQuery.split('&');

    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      query[pair[0]] = pair[1];
    }

    setQuery({ ...query });
  }, [location]);

  return query;
};
