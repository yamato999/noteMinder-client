import React from 'react';

const Howitwork = () => {
  return (
      <div className='how-it-works'>
        <div className='container'>
            <h2>How It Works</h2>
            <div className='flex'>
                <div>
                    <span className='fas fa-home'></span>
                    <h4>Find a Property</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div>
                    <span className='fas fa-dollar-sign'></span>
                    <h4>But a Property</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div>
                    <span className='fas fa-chart-line'></span>
                    <h4>Investing</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
        </div>
      </div>
  );
};

export default Howitwork;