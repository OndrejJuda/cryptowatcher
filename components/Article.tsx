import React, { useEffect, useRef } from 'react';
import parse from 'html-react-parser';

import placeHolderImg from '../public/placeholderimage.jpg'
import Tag, { ITag } from './Tag';

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
      <img src={image ?? placeHolderImg.src} alt={title} loading='lazy' className='flex-shrink-0 w-full h-full lg:w-[36rem] lg:max-h-96 object-cover rounded-t-xl lg:rounded-none lg:rounded-tl-xl lg:rounded-bl-xl' />
      <div className='p-4 flex flex-grow flex-col'>
        <h3 className='uppercase font-semibold mb-2'>{source.title}</h3>
        <h2 className='text-xl font-bold lg:text-3xl mb-4'>{title}</h2>
        <div className='flex flex-wrap gap-2 mb-2'>
          {
            tags.map(({ code, slug, title, image }) => (
              <Tag code={code} slug={slug} title={title} image={image} />
            ))
          }
        </div>
        <h3 className='mb-2 text-eerie-400 dark:text-eerie-100'><time>{published.toLocaleDateString()}</time></h3>
        {/* Two divs below make the long text wrap without specifying width. Usage of flex, width and break-words is important for it to work. */}
        <div className='flex'>
          <div className='flex-grow w-0 break-words'>
            <p className='text-eerie-900 dark:text-white'
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 8,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {parse(description.replace(/<\/?[^>]+(>|$)/g, ""))}
            </p>
          </div>
        </div>
        <a href={url} className='absolute w-full h-full top-0 left-0' target='_blank' rel='noreferrer' ></a>
      </div>
    </article>
  );
};

export default Article;