import React, { useState, useEffect, useContext, FC } from 'react';
import { Coin, Error } from '../components';
import { ICoin } from '../components/Coin';
import { PropagateLoader } from 'react-spinners';
import useFetch from '../hooks/useFetch';
import AppContext from '../context/app-context';

const CoinList: FC = () => {
  const { darkMode } = useContext(AppContext);

  const [coins, setCoins] = useState<ICoin[]>([]);
  const [page, setPage] = useState<number>(0);

  const { error, isLoading, fetchData } = useFetch();

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    if (page > 0) {
      fetchData(`coins/markets?vs_currency=usd&page=${page}&per_page=50&order=market_cap_desc`, fetchDataHandler);
    }
  }, [fetchData, page]);

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
    setCoins((prevValue) =>
      [...new Map([...prevValue, ...newCoins].map((item, key) => [item.id, item])).values()]
    );
  }

  if (error) {
    return (
      <Error message={error} />
    );
  }

  if (isLoading && coins.length === 0) {
    return (
      <main className='flex justify-center items-center h-screen'>
        <PropagateLoader size={30} color={darkMode ? '#ffffff' : '#0f1624'} />
      </main>
    );
  }

  if (coins.length === 0) {
    return (
      <div className='flex justify-center items-center h-screen text-3xl'>No coins founded</div>
    );
  }

  return (
    <>
      <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-10 gap-4 relative'>
        {
          coins.map((coin, i) => {
            return (
              <Coin key={coin.id} isLoading={isLoading} coin={coin} isLastInArray={coins.length === i + 1} incrementPage={setPage.bind(null, (prevValue) => prevValue + 1)} />
            );
          })
        }
      </main>
      {
        isLoading && coins.length > 0 && (
          <div className='h-10 my-4 flex justify-center items'>
            <PropagateLoader size={30} color={darkMode ? '#ffffff' : '#0f1624'} />
          </div>
        )
      }
    </>
  );
};

export default CoinList;