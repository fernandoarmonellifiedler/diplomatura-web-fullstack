import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul className='navbar-ul'>
        <li>
          <a href="/" className='nav-botones'>Home</a>
        </li>
        <li>
          <a href="/about" className='nav-botones'>About</a>
        </li>
        <li>
          <a href="/people" className='nav-botones'>People</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
