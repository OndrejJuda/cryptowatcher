import React, { FC, PropsWithChildren, useCallback } from 'react';
import { createContext, useState } from 'react';
import { IArticle } from '../components/Article';

interface INewsContext {
  articles: IArticle[];
  page: number;
  setArticles: React.Dispatch<React.SetStateAction<IArticle[]>>;
  setPage: () => void;
}

const NewsContext = createContext<INewsContext>({
  articles: [],
  page: 1,
  setArticles: () => { },
  setPage: () => { }
});

export const NewsContextProvider: FC<PropsWithChildren<INewsContext>> = ({ children }) => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [page, setPage] = useState(1);

  const setNewPage = useCallback(setPage.bind(null, (prevValue: number) => prevValue + 1), []);

  return (
    <NewsContext.Provider
      value={{
        articles,
        page,
        setArticles,
        setPage: setNewPage
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default NewsContext;