import './Banner.scss';
import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import ban1 from '../../assets/banner/zem1.JPG';
import ban2 from '../../assets/banner/zem6.JPG';
import ban3 from '../../assets/banner/zem7.JPG';
import ban4 from '../../assets/banner/zem8.JPG';
import CarouselItem from './CarouselItem';
import CarouselControls from './CarouselControls';
import CarouselIndicators from './CarouselIndicators';

const banners = [ban1, ban2, ban3, ban4];

const Banner = ({ interval = 4000 }) => {
  const [currentSlide, setcurrentSlide] = useState(0);
  const slideInterval = useRef();

  const stopSlideTimer = useCallback(() => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  }, []);

  const startSlideTimer = useCallback(() => {
    stopSlideTimer();
    slideInterval.current = setInterval(() => {
      setcurrentSlide((curr) =>
        curr < banners.length - 1 ? curr + 1 : 0
      );
    }, interval);
  }, [interval, stopSlideTimer]);

  const prev = () => {
    startSlideTimer();
    setcurrentSlide((curr) => (curr > 0 ? curr - 1 : banners.length - 1));
  };

  const next = () => {
    startSlideTimer();
    setcurrentSlide((curr) => (curr < banners.length - 1 ? curr + 1 : 0));
  };

  const switchSlide = (index) => {
    startSlideTimer();
    setcurrentSlide(index);
  };

  useEffect(() => {
    startSlideTimer();
    return () => {
      stopSlideTimer();
    };
  }, [startSlideTimer, stopSlideTimer]);

  return (
    <section id="banner" className="hero-section">
      <div className="carousel">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(${-currentSlide * 100}%)` }}>
          {banners.map((banner, i) => (
            <CarouselItem
              slide={banner}
              key={i}
              stopSlide={stopSlideTimer}
              startSLide={startSlideTimer}
            />
          ))}
        </div>
        <CarouselControls prev={prev} next={next} />
        <CarouselIndicators
          banners={banners}
          currentSlide={currentSlide}
          switchSlide={switchSlide}
        />
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="hero-eyebrow">✦ With all my heart ✦</span>
        <h1 className="hero-title">
          Welcome to the world,
          <span className="hero-title-italic">Zema Arrazka Permadi</span>
        </h1>
        <p className="hero-subtitle">
          Born on a blessed Thursday, 25 August 2022 — our little Virgo, our
          greatest gift, our forever joy.
        </p>
      </div>
    </section>
  );
};

Banner.propTypes = {
  interval: PropTypes.number,
};

export default Banner;
