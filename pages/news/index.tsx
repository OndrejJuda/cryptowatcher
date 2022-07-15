import React, { useState, useEffect, useContext, useCallback } from 'react';
import { NextPage } from 'next';
import { Article, Error } from '../../components';
import { IArticle } from '../../components/Article';
import { PropagateLoader } from 'react-spinners';
import useFetch from '../../hooks/useFetch';
import AppContext from '../../contexts/app-context';
import NewsContext from '../../contexts/news-context';
import { ITag } from '../../components/Tag';

let FIRSTRUN = true;

const News: NextPage = (props) => {
  const { darkMode } = useContext(AppContext);
  const { articles, setArticles, page, setPage } = useContext(NewsContext);


  const { error, isLoading, fetchData } = useFetch(setPage);

  useEffect(() => {
    if (FIRSTRUN) {
      fetchDataHandler();
      FIRSTRUN = false;
    }
  }, []);

  const fetchDataHandler = () => {
    if (isLoading) return;
    fetchData(
      `/api/news`,
      page,
      dataProcessor
    );
  };

  const dataProcessor = useCallback(
    (data: any) => {
      const mappedData = data.map((article: any): IArticle => (
        {
          description: article.metadata?.description ?? '',
          id: article.id,
          image: article.metadata?.image,
          published: new Date(article.published_at),
          source: {
            title: article.source.title,
            url: article.source.domain,
          },
          tags: article.currencies?.map((curr: any): ITag => (
            {
              code: curr.code,
              title: curr.title,
              slug: curr.slug,
              image: ''
            }
          )) ?? [],
          title: article.title,
          url: article.url
        }
      ));
      setArticles((prevValue) => [...prevValue, ...mappedData]);
      console.log(mappedData)
    },
    []
  );

  if (error) {
    return (
      <Error message={error} />
    );
  }

  if (isLoading && articles.length === 0) {
    return (
      <main className='flex justify-center items-center h-screen'>
        <PropagateLoader size={30} color={darkMode ? '#ffffff' : '#0f1624'} />
      </main>
    );
  }

  if (articles.length === 0) {
    return (
      <div className='flex justify-center items-center h-screen text-3xl'>No news founded</div>
    );
  }

  return (
    <>
      <main className='flex flex-col gap-8 p-10 items-center'>
        {
          articles.map((articleItem, i) => {
            return (
              <Article key={i} isLoading={isLoading} articleItem={articleItem} isLastInArray={articles.length === i + 1} fetchDataHandler={fetchDataHandler} />
            );
          })
        }
      </main>
      {
        isLoading && articles.length > 0 && (
          <div className='h-10 my-4 flex justify-center items'>
            <PropagateLoader size={30} color={darkMode ? '#ffffff' : '#0f1624'} />
          </div>
        )
      }
    </>
  );
};

export default News;