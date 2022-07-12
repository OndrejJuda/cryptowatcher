import React, { useState, useEffect, useContext, useCallback } from 'react';
import { NextPage } from 'next';
import { Coin, Error } from '../../components';
import { ICoin } from '../../components/Coin';
import { PropagateLoader } from 'react-spinners';
import useFetch from '../../hooks/useFetch';
import AppContext from '../../contexts/app-context';
import CoinContext from '../../contexts/coin-context';

let FIRSTRUN = true;

const Coins: NextPage = () => {
  const { darkMode } = useContext(AppContext);
  const { coins, setCoins, page, setPage } = useContext(CoinContext);
  const { error, isLoading, fetchData } = useFetch(setPage);

  useEffect(() => {
    if (FIRSTRUN) {
      fetchDataHandler();
      FIRSTRUN = false;
    }
    return () => { FIRSTRUN = true };
  }, []);

  const fetchDataHandler = () => {
    if (isLoading) return;
    fetchData(
      `/api/coins`,
      page,
      dataProcessor
    );
  };

  const dataProcessor = useCallback(
    (data: any) => {
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
    },
    []
  );

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
              <Coin key={coin.id} isLoading={isLoading} coin={coin} isLastInArray={coins.length === i + 1} fetchDataHandler={fetchDataHandler} />
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

export default Coins;