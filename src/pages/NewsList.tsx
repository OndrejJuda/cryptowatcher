import React, { useState, useEffect, useContext, FC, useCallback } from 'react';
import { News, Error } from '../components';
import { INews, ITag } from '../components/News';
import { PropagateLoader } from 'react-spinners';
import useFetch from '../hooks/useFetch';
import AppContext from '../context/app-context';

interface NewsListProps {

};

const URL = 'https://cryptopanic.com/';

const NewsList: FC<NewsListProps> = (props) => {
  const { darkMode } = useContext(AppContext);

  const [news, setNews] = useState<INews[]>([]);
  const [page, setPage] = useState<number>(0);

  const { error, isLoading, fetchData } = useFetch();

  useEffect(() => {
    setPage(1);
  }, []);

  const fetchDataHandler = useCallback(
    (data: any) => {
      const mappedData = data.results.map((news: any): INews => (
        {
          id: news.id,
          published: new Date(news.published_at),
          source: {
            title: news.source.title,
            url: news.source.domain,
          },
          tags: news.currencies?.map((curr: any): ITag => (
            {
              code: curr.code,
              title: curr.title,
              slug: curr.slug,
              image: ''
            }
          )) ?? [],
          title: news.title,
          url: news.url
        }
      ));
      setNews((prevValue) => [...prevValue, ...mappedData]);
    },
    []
  );

  useEffect(() => {
    if (page > 0) {
      fetchData(
        `${URL}api/v1/posts/?auth_token=${process.env.REACT_APP_CRYPTOPANIC_API_KEY}&public=true&page=${page}`,
        {},
        fetchDataHandler
      );
    }
  }, [fetchData, page, fetchDataHandler]);

  if (error) {
    return (
      <Error message={error} />
    );
  }

  if (isLoading && news.length === 0) {
    return (
      <main className='flex justify-center items-center h-screen'>
        <PropagateLoader size={30} color={darkMode ? '#ffffff' : '#0f1624'} />
      </main>
    );
  }

  if (news.length === 0) {
    return (
      <div className='flex justify-center items-center h-screen text-3xl'>No news founded</div>
    );
  }

  return (
    <>
      <main className='flex flex-col gap-4 p-10 items-center'>
        {
          news.map((newsItem, i) => {
            return (
              <News key={i} isLoading={isLoading} newsItem={newsItem} isLastInArray={news.length === i + 1} incrementPage={setPage.bind(null, (prevValue) => prevValue + 1)} />
            );
          })
        }
      </main>
      {
        isLoading && news.length > 0 && (
          <div className='h-10 my-4 flex justify-center items'>
            <PropagateLoader size={30} color={darkMode ? '#ffffff' : '#0f1624'} />
          </div>
        )
      }
    </>
  );
};

export default NewsList;