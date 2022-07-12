import { useState, useCallback, useEffect } from 'react';

const useFetch = (setPage: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url: string, page: number, dataHandler: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        url,
        {
          method: 'POST',
          body: JSON.stringify({ page }),
        }
      );

      if (!response.ok) {
        const { error } = await response.json();
        throw Error(`${response.status}: ${error}`);
      }

      const data = await response.json();

      dataHandler(data);
    } catch (error: any) {
      setError(error.message)
    }

    setPage();
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    fetchData
  }
};

export default useFetch