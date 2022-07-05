import { useState, useCallback } from 'react';

const URL = 'https://coingecko.p.rapidapi.com/'

const OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY!,
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
    'Content-Type': 'application/json'
  }
}

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url: string, dataHandler: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${URL}${url}`,
        OPTIONS
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