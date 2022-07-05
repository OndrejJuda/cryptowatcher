import React from 'react';

interface CoinProps {
  coin: ICoin;
}

export interface ICoin {
  id: string,
  symbol: string,
  name: string,
  image: string,
  currentPrice: number,
  marketCap: number,
  priceChangePercentage24: number,
  downFromATH: number,
  upToATH: number,
}

const Coin: React.FC<CoinProps> = ({ coin: { symbol, name, image, currentPrice, marketCap, priceChangePercentage24, downFromATH, upToATH } }) => {
  return (
    <article
      className='shadow-xl rounded-xl p-4 dark:text-white dark:bg-eerie-400 bg-eerie-50'
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
        {symbol.toUpperCase()}
      </h3>
      <p className='flex justify-between items-center flex-wrap text-lg mb-3'>
        <span className='text-3xl'>
          ${currentPrice}
        </span>
        <span className={`${priceChangePercentage24 > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {priceChangePercentage24.toFixed(2)}%
        </span>
      </p>
      <p className='mb-2'>
        <b>Market cap</b>: ${marketCap}
      </p>
      <p className='mb-2'>
        <b>Down from ATH</b>: <span className='text-red-600'>{downFromATH.toFixed(2)}%</span>
      </p>
      <p className=''>
        <b>Up to ATH</b>: <span className='text-green-600'>{upToATH.toFixed(2)}%</span>
      </p>
    </article>
  );
};

export default Coin;