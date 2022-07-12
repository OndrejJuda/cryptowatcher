import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const { replace } = useRouter()

  useEffect(() => {
    replace('/coins');
  }, []);

  return (
    <p className=''>Redirecting...</p>
  );
};

export default Home;
