import React, { useRef, useEffect, FC } from 'react';

interface ICoinProps {
  coin: ICoin;
  isLastInArray: boolean;
  incrementPage: () => void;
  isLoading: boolean; // TODO: MOVE TO CONTEXT
}

export interface ICoin {
  currentPrice?: number;
  downFromATH?: number;
  id: string;
  image?: string;
  marketCap?: number;
  name: string;
  priceChangePercentage24?: number;
  rank: number;
  symbol: string;
  upToATH?: number;
}

const formatCurrency = (num: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 8 }).format(num);

const Coin: FC<ICoinProps> = ({
  coin: { symbol, name, image, currentPrice, marketCap, priceChangePercentage24, downFromATH, upToATH, rank },
  isLastInArray,
  incrementPage,
  isLoading,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const coinRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isLoading && isLastInArray && coinRef.current && !observer.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) incrementPage();
        }
      );
      observer.current.observe(coinRef.current)
    } else if (!isLastInArray && observer.current) {
      observer.current.disconnect();
      observer.current = null;
    }
  }, [observer, coinRef, isLastInArray, incrementPage, isLoading]);

  return (
    <article
      className='shadow-xl rounded-xl p-4 dark:text-white dark:bg-eerie-400 bg-eerie-50'
      id={symbol}
      ref={coinRef}
    >
      <h3
        className='flex items-center gap-2 text-lg font-bold mb-3'
        title={name}
      >
        <img
          src={image}
          alt={name}
          width='32px'
          height='32px'
          className=''
        />
        {rank}. {symbol.toUpperCase()}
      </h3>
      <p className='flex justify-between items-center flex-wrap text-lg mb-3'>
        <span className='text-3xl'>
          {currentPrice ? formatCurrency(currentPrice) : 'N/A'}
        </span>
        <span className={`${priceChangePercentage24 && (priceChangePercentage24 > 0 ? 'text-green-600' : 'text-red-600')}`}>
          {priceChangePercentage24 ? `${priceChangePercentage24.toFixed(2)}%` : 'N/A'}
        </span>
      </p>
      <p className='mb-2'>
        <b>Market cap</b>: {marketCap ? formatCurrency(marketCap) : 'N/A'}
      </p>
      <p className='mb-2'>
        <b>Down from ATH</b>: <span className='text-red-600'>{downFromATH ? `${downFromATH.toFixed(2)}%` : 'N/A'}</span>
      </p>
      <p className=''>
        <b>Up to ATH</b>: <span className='text-green-600'>{upToATH ? `${upToATH.toFixed(2)}%` : 'N/A'}</span>
      </p>
    </article>
  );
}

export default Coin;