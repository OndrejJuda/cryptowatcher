import React from 'react';
import { NavLink } from 'react-router-dom';

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header className=''>
      <nav className=''>
        <NavLink to='/coins'>Coins</NavLink>
        <NavLink to='/news'>News</NavLink>
      </nav>
    </header>
  );
};

export default Header;