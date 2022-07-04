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