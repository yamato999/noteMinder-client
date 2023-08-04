import React from 'react';

function Navbar() {
  return (
      <nav>
        <a href="#" className='logo'>
            <h2>Logo</h2>
        </a>
        <input className='menu-btn' type='checkbox' id='menu-btn'/>
        <label className='menu-icon' for='menu-btn'>
            <span className='nav-icon'></span>
        </label>
        <a href='#' className='property'>Login</a>
      </nav>
  );
}

export default Navbar;