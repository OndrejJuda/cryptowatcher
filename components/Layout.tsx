import React, { FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import AppContext from '../contexts/app-context';
import Header from './Header';

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { darkMode, setDarkMode } = useContext(AppContext);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  const scrollHandler = (event: any) => {
    const halfViewportHeight = window.innerHeight / 2;
    const scrollTop = event.target.scrollingElement.scrollTop;
    scrollTop > halfViewportHeight && setShowScrollTopButton(true);
    scrollTop < halfViewportHeight && setShowScrollTopButton(false);
  };

  const scrollTopHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>CryptoWatcher</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${darkMode ? 'dark' : ''}`}>
        <div className='bg-white dark:bg-eerie text-eerie dark:text-white relative'>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          {children}
          {/* <Footer /> */}
          {
            showScrollTopButton &&
            <button
              className='bg-eerie-400 dark:bg-eerie-200 transition hover:-translate-y-[4px] active:-translate-y-[2px] rounded-full w-12 h-12 shadow-lg fixed bottom-4 right-4 text-white'
              onClick={scrollTopHandler}
            >
              UP
            </button>
          }
        </div>
      </div>
    </>
  );
};

export default Layout;