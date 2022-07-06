import React, { useState, useEffect } from 'react';
import { Coin, Error } from '../components';
import { ICoin } from '../components/Coin';
import { PropagateLoader } from 'react-spinners';
import useFetch from '../hooks/useFetch';

interface CoinListProps {
  // TODO: MAKE THIS AS CONTEXT
  darkMode: boolean;
}

const CoinList: React.FC<CoinListProps> = ({ darkMode }) => {
  const [coins, setCoins] = useState<ICoin[]>([]);
  const { error, isLoading, fetchData } = useFetch();

  const fetchDataHandler = (data: any) => {
    const newCoins = data.map((coin: any) => {
      return {
        currentPrice: coin.current_price,
        downFromATH: coin.ath_change_percentage,
        id: coin.id,
        image: coin.image,
        name: coin.name,
        marketCap: coin.market_cap,
        priceChangePercentage24: coin.price_change_percentage_24h,
        rank: coin.market_cap_rank,
        symbol: coin.symbol,
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
      <main className='flex justify-center items-center h-screen'>
        <PropagateLoader size={30} color={darkMode ? '#ffffff' : '#0f1624'} />
      </main>
    );
  }

  if (coins.length === 0) {
    return (
      <div className='h-screen col-span-4 text-3xl'>No coins founded</div>
    );
  }

  return (
    <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-10 gap-4 relative'>
      {
        coins.map((coin) => (
          <Coin key={coin.id} coin={coin} />
        ))
      }
    </main>
  );
};

export default CoinList;