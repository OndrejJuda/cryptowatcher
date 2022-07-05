import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Footer, Header } from './components';
import { CoinList, NewsList } from './pages';

const App = () => {
  const [darkMode, setDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    const localStorageIsDarkMode = window.localStorage.getItem('isDarkMode');
    if (localStorageIsDarkMode !== undefined) {
      setDarkMode(localStorageIsDarkMode === 'true')
    }
  }, []);

  const toggleDarkMode = () => {
    window.localStorage.setItem('isDarkMode', `${!darkMode}`);
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className='bg-white dark:bg-eerie text-eerie dark:text-white'>
        <Header darkMode={darkMode} setDarkMode={toggleDarkMode} />
        <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-10 gap-4 relative'>
          <Routes>
            <Route path='/coins' element={<CoinList />} />
            <Route path='/news' element={<NewsList />} />
            <Route path='*' element={<Navigate to='/coins' replace />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;
