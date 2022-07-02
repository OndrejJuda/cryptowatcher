import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CoinList, Footer, Header, NewsList } from './components';

const App = () => {
  return (
    <div className=''>
      <Header />
      <main className=''>
        <Routes>
          <Route path='/coins' element={<CoinList />} />
          <Route path='/news' element={<NewsList />} />
          <Route path='*' element={<Navigate to='/coins' replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
