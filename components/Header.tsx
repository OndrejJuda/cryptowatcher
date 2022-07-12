import React from 'react';
import Link from 'next/link';
import NavLink from './NavLink';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: () => void;
}

/*
  TODO: search with autocomplete
  btc = document.getElementById('btc');
  btc.scrollIntoView({behavior: 'smooth'});
*/

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  return (
    <header className='px-10 py-4 flex flex-wrap items-center text-eerie dark:text-white bg-white dark:bg-eerie'>
      <h1 className='transition text-3xl font-semibold mr-8'>
        CryptoWatcher
      </h1>
      <nav className='text-2xl flex gap-4'>
        <NavLink
          href='/coins'
          title='Coins'

        />
        <NavLink
          href='/news'
          title='News'
        />
      </nav>
      <button
        className='text-2xl ml-auto py-4 px-5 shadow-lg rounded-full relative w-16 h-10 dark:bg-white'
        type='button'
        onClick={setDarkMode}
      >
        <div className={`absolute top-0.5 ${darkMode ? 'opacity-0 right-0' : 'opacity-1 left-0'}`}>
          ☀
        </div>
        <div className={`absolute top-0.5 ${darkMode ? 'opacity-1 right-0' : 'opacity-0 left-0'}`}>
          🌑
        </div>
      </button>
    </header>
  );
};

export default Header;