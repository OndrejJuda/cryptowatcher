import React, { FC } from 'react';

export interface ITag {
  code: string;
  title: string;
  slug: string;
  image?: string;
};

const Tag: FC<ITag> = ({ code, title, slug, image }) => {
  return (
    <div
      className='flex bg-eerie-400 text-white dark:bg-white shadow-md rounded-md dark:text-eerie-500 px-1 py-0.5'
    >
      {title}
    </div>
  );
};

export default Tag;