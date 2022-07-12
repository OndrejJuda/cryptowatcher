import React, { useEffect, useRef } from 'react';

interface IArticleProps {
  isLoading: boolean;
  isLastInArray: boolean;
  fetchDataHandler: () => void;
  articleItem: IArticle;
}

export interface IArticle {
  id: number;
  published: Date;
  source: {
    title: string;
    url: string;
  };
  title: string;
  tags: ITag[];
  url: string;
}

export interface ITag {
  code: string;
  title: string;
  slug: string;
  image?: string;
}

const Article: React.FC<IArticleProps> = ({
  articleItem: { id, published, source, title, tags, url },
  isLastInArray, isLoading, fetchDataHandler
}) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const newsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isLoading && isLastInArray && newsRef.current && !observer.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) fetchDataHandler();
        }
      );
      observer.current.observe(newsRef.current)
    } else if (!isLastInArray && observer.current) {
      observer.current.disconnect();
      observer.current = null;
    }
  }, [observer, newsRef, isLastInArray, fetchDataHandler, isLoading]);
  return (
    <article
      className='shadow-lg rounded-xl p-4 w-full dark:text-white dark:bg-eerie-400 bg-eerie-50'
      id=''
      ref={newsRef}
    >
      <h3 className='text-center uppercase font-bold'>{source.title}</h3>
      <h2 className='text-center'>
        <a href={url} className='' target='_blank' rel='noreferrer' >{title}</a>
      </h2>
    </article>
  );
};

export default Article;