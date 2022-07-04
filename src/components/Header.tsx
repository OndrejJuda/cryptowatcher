import React from 'react';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  return (
    <header className='px-10 py-4 flex flex-wrap items-center text-eerie dark:text-white bg-white dark:bg-eerie'>
      <h1 className='transition text-3xl font-semibold mr-8'>
        CryptoWatcher
      </h1>
      <nav className='text-2xl flex gap-4'>
        <NavLink
          to='/coins'
          className={({ isActive }) =>
            `${isActive ? 'border-b-4' : ''} border-eerie dark:border-white hover:border-b-4 transition`
          }
        >
          <h2>Coins</h2>
        </NavLink>
        <NavLink
          to='/news'
          className={({ isActive }) =>
            `${isActive ? 'border-b-4' : ''} border-eerie dark:border-white hover:border-b-4 transition`
          }
        >
          <h2>News</h2>
        </NavLink>
      </nav>
      <button
        className='text-2xl ml-auto py-4 px-5 shadow-lg rounded-full relative w-16 h-10 dark:bg-white'
        type='button'
        onClick={() => setDarkMode(!darkMode)}
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