import axios from 'axios';
import { axiosFetcher } from 'config/axiosFetcher';
import { useEffect } from 'react';
import useSWR from 'swr';
import { IEvent } from 'types';
import { useApp } from './AppContext';

const useEvents = (term: string) => {
  const { setErrorMessage, setLoading } = useApp();
  const { data, error, isValidating, mutate } = useSWR<IEvent[]>(
    `/events?term=${term}`,
    axiosFetcher
  );

  useEffect(() => {
    if (error && axios.isAxiosError(error) && error.response) {
      setErrorMessage(error.response.data.message);
    }
  }, [error, setErrorMessage]);

  useEffect(() => {
    setLoading(isValidating);
  }, [isValidating, setLoading]);

  return { data, error, isValidating, mutate };
};

export default useEvents;
