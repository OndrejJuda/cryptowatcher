import React, { useContext, useEffect, useRef } from 'react';
import parse from 'html-react-parser';

import placeHolderImg from '../public/placeholderimage.jpg'
import Tag, { ITag } from './Tag';
import AppContext from '../contexts/app-context';

import cryptoPanicDarkIcon from '../public/cryptopaniclogodark.svg'
import cryptoPanicWhiteIcon from '../public/cryptopaniclogowhite.svg'

interface IArticleProps {
  isLoading: boolean;
  isLastInArray: boolean;
  fetchDataHandler: () => void;
  articleItem: IArticle;
}

export interface IArticle {
  description: string;
  id: number;
  image: string;
  published: Date;
  source: {
    title: string;
    url: string;
  };
  title: string;
  tags: ITag[];
  url: string;
}

const Article: React.FC<IArticleProps> = ({
  articleItem: { id, published, source, title, tags, url, description, image },
  isLastInArray, isLoading, fetchDataHandler
}) => {
  const { darkMode } = useContext(AppContext);

  // used for infinit loading
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
      className='shadow-lg rounded-xl w-full dark:text-white dark:bg-eerie-400 bg-eerie-50 relative flex flex-col gap-4 lg:flex-row'
      id=''
      ref={newsRef}
    >
      <a
        href={url}
        target='_blank'
        rel='noreferrer'
        className='flex-shrink-0'
      >
        <img src={image ?? placeHolderImg.src} alt={title} loading='lazy' className='w-full h-full lg:w-[36rem] lg:max-h-96 object-cover rounded-t-xl lg:rounded-none lg:rounded-tl-xl lg:rounded-bl-xl' />
      </a>
      <div className='p-4 flex flex-grow flex-col'>
        <h3 className='uppercase font-semibold mb-2'>
          <a
            className='hover:border-b border-b-eerie'
            href={source.url.includes('www.') ? source.url : `https://www.${source.url}`}
            target='_blank'
            rel='noreferrer'
          >
            {source.title}
          </a>
        </h3>
        <h2 className='text-xl font-bold lg:text-3xl mb-4'>
          <a
            href={url}
            className='hover:border-b border-b-eerie'
            target='_blank'
            rel='noreferrer'
          >
            {title}
          </a>
        </h2>
        <div className='flex flex-wrap gap-2 mb-2'>
          {
            tags.map(({ code, slug, title, image }) => (
              <Tag code={code} slug={slug} title={title} image={image} />
            ))
          }
        </div>
        <h3 className='mb-2 text-eerie-400 dark:text-eerie-100'><time>{published.toLocaleDateString()}</time></h3>
        {/* Two divs below make the long text wrap without specifying width. Usage of flex, width and break-words is important for it to work. */}
        <div className='flex mb-4'>
          <div className='flex-grow w-0 break-words'>
            <p className='text-eerie-900 dark:text-white'
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 8,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {description && parse(description.replace(/<\/?[^>]+(>|$)/g, ""))}
            </p>
          </div>
        </div>
        <a
          href={url}
          className='self-end mt-auto bg-eerie-400 text-white dark:bg-white shadow-md rounded-md dark:text-eerie-500 px-2 py-1 transition hover:-translate-y-[2px] active:-translate-y-[1]'
          target='_blank'
          rel='noreferrer'
        >
          Discuss on <img src={darkMode ? '/cryptopaniclogoonwhite.svg' : '/cryptopaniclogoondark.svg'} alt='CryptoPanic Logo' className='max-h-8 inline-block' />
        </a>
        {/* <a href={url} className='absolute w-full h-full top-0 left-0' target='_blank' rel='noreferrer' ></a> */}
      </div>
    </article>
  );
};

export default Article;