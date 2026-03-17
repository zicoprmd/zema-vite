import { useState } from 'react';
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
      <div className={gray ? 'paralax-img gray' : 'paralax-img'} />
      <div className="paralax-overlay" />
      <div className="paralax-content">
        <span className="paralax-label">✦ Named with love ✦</span>
        <div className="paralax-ornament" />
        <h2 className="paralax-name">ZEMA ARRAZKA PERMADI</h2>
        <div className="paralax-ornament" />
        <p className="paralax-tagline">25 · 08 · 2022 &nbsp;·&nbsp; Virgo &nbsp;·&nbsp; 2810g &nbsp;·&nbsp; 49cm</p>
      </div>
    </section>
  );
};

export default Paralax;
