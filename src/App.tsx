import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Footer, Header } from './components';
import AppContext from './context/app-context';
import { CoinList, NewsList } from './pages';

const App = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className='bg-white dark:bg-eerie text-eerie dark:text-white'>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path='/coins' element={<CoinList darkMode={darkMode} />} />
          <Route path='/news' element={<NewsList />} />
          <Route path='*' element={<Navigate to='/coins' replace />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;
