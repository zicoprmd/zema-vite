import React, { useState } from 'react';
//scss
import './paralax.scss';

const Paralax = () => {
  const [gray, setGray] = useState(false);

  function setGrayed() {
    if (window.scrollY >= 1250) {
      setGray(true);
    } else {
      setGray(false);
    }
  }

  window.addEventListener('scroll', setGrayed);

  return (
    <section className="paralax">
      <div className={gray ? 'paralax-img' : 'paralax-img gray'}></div>
      <div className="paralax-text">
        <span className="border">ZEMA ARRAZKA PERMADI</span>
      </div>
    </section>
  );
};

export default Paralax;
