import axios from 'axios';
import { axiosFetcher } from 'config/axiosFetcher';
import { useEffect } from 'react';
import useSWR from 'swr';
import { IProfessional } from 'types';
import { useApp } from './AppContext';

const useNotAcceptedProfessionals = () => {
  const { setErrorMessage, setLoading } = useApp();
  const { data, error, isValidating, mutate } = useSWR<IProfessional[]>(
    '/professionals/not-accepted',
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

export default useNotAcceptedProfessionals;
