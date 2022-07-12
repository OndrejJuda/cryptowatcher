import React, { FC, PropsWithChildren, useCallback } from 'react';
import { createContext, useState } from 'react';
import { ICoin } from '../components/Coin';

interface ICoinContext {
  coins: ICoin[];
  page: number;
  setCoins: React.Dispatch<React.SetStateAction<ICoin[]>>;
  setPage: () => void;
}

const CoinContext = createContext<ICoinContext>({
  coins: [],
  page: 1,
  setCoins: () => { },
  setPage: () => { }
});

export const CoinContextProvider: FC<PropsWithChildren<ICoinContext>> = ({ children }) => {
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [page, setPage] = useState(1);

  const setNewPage = useCallback(setPage.bind(null, (prevValue: number) => prevValue + 1), []);

  return (
    <CoinContext.Provider
      value={{
        coins,
        page,
        setCoins,
        setPage: setNewPage
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};

export default CoinContext;