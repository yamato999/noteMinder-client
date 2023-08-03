import React from 'react';
import Navbar from './Navbar'

function Header() {
  return (
      <div className='header'>
        <Navbar/>
        <div className='intro'>
            <h1><span>Create</span> and <br/><span>Talk</span> with notes</h1>
            <p className='details'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac lacus gravida, dapibus lacus ac, luctus libero.</p>
            <a href='#' className='header-btn'>Details</a>
        </div>
      </div>
  );
}

export default Header;