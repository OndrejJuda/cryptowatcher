import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Footer, Header } from './components';
import { CoinList, NewsList } from './pages';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className='bg-white dark:bg-eerie text-eerie dark:text-white'>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className='grid grid-cols-1 md:grid-cols-6 p-10 gap-4'>
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
