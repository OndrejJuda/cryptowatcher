import React, { useState, useEffect } from 'react';
import { Coin, Error } from '../components';
import { ICoin } from '../components/Coin';
import useFetch from '../hooks/useFetch';

interface CoinListProps {

}

const CoinList: React.FC<CoinListProps> = (props) => {
  const [coins, setCoins] = useState<ICoin[]>([]);
  const { error, isLoading, fetchData } = useFetch();

  const fetchDataHandler = (data: any) => {
    const newCoins = data.map((coin: any) => {
      return {
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        image: coin.image,
        currentPrice: coin.current_price,
        marketCap: coin.market_cap,
        priceChangePercentage24: coin.price_change_percentage_24h,
        downFromATH: coin.ath_change_percentage,
        upToATH: (coin.ath - coin.current_price) / coin.current_price * 100,
      }
    });
    setCoins(newCoins);
  }

  useEffect(() => {
    fetchData('coins/markets?vs_currency=usd&page=1&per_page=50&order=market_cap_desc', fetchDataHandler);
  }, [fetchData]);

  if (error) {
    return (
      <Error message={error} />
    );
  }

  if (isLoading) {
    return (
      <div className='h-screen col-span-4 text-3xl'>Loading...</div>
    );
  }

  if (coins.length === 0) {
    return (
      <div className='h-screen col-span-4 text-3xl'>No coins founded</div>
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