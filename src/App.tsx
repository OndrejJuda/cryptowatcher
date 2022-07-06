import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Footer, Header } from './components';
import AppContext from './context/app-context';
import { CoinList, NewsList } from './pages';

const App = () => {
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
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className='bg-white dark:bg-eerie text-eerie dark:text-white relative'>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path='/coins' element={<CoinList />} />
          <Route path='/news' element={<NewsList />} />
          <Route path='*' element={<Navigate to='/coins' replace />} />
        </Routes>
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
  );
}

export default App;
