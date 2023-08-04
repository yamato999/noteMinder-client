import React from 'react';
import Navbar from './Navbar'

function Header() {
  return (
      <div className='header'>
        <Navbar/>
        <div className='intro'>
            <h1><span>Create</span> and <br/><span>Talk</span> with notes</h1>
            <p className='details'>AI Notes - Your personal assistant for note-taking. Jot down ideas and tasks, then receive intelligent advice from AI to become more organized and productive.</p>

        </div>
      </div>
  );
}

export default Header;