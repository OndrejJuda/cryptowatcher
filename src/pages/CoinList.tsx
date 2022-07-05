import React, { useState, useEffect } from 'react';
import { fetchCoins } from '../api';
import { Coin } from '../components';
import { ICoin } from '../components/Coin';

interface CoinListProps {

}

const CoinList: React.FC<CoinListProps> = (props) => {
  const [coins, setCoins] = useState<ICoin[]>([]);

  useEffect(() => {
    fetchCoins()
      .then((result) => setCoins(result));
  }, []);

  if (coins.length === 0) {
    // place for loading
    return (
      <div className='h-screen col-span-4 text-3xl'>Loading...</div>
    );
  }

  return (
    <>
      {
        coins.map((coin) => (
          <Coin key={coin.id} coin={coin} />
        ))
      }
    </>
  );
};

export default CoinList;