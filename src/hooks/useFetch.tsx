import { useState, useCallback } from 'react';

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url: string, options: any, dataHandler: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        url,
        options
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
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    fetchData
  }
};

export default useFetch