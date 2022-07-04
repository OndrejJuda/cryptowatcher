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
  athChangePercentage: number,
}

const Coin: React.FC<CoinProps> = ({ coin: { id, symbol, name, image, currentPrice, marketCap, priceChangePercentage24, athChangePercentage } }) => {
  return (
    <article
      className='shadow-xl rounded-xl p-4 dark:text-white'
    >
      <h3
        className='flex items-center gap-2 text-lg font-bold'
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
    </article>
  );
};

export default Coin;