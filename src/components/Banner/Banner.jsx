//scss
import './Banner.scss';
//state
import { React, useState, useEffect, useRef } from 'react';
// Import image
import ban1 from '../../assets/banner/zem1.JPG';
import ban2 from '../../assets/banner/zem6.JPG';
import ban3 from '../../assets/banner/zem7.JPG';
import ban4 from '../../assets/banner/zem8.JPG';
//components
import CarouselItem from './CarouselItem';
import CarouselControls from './CarouselControls';
import CarouselIndicators from './CarouselIndicators';
import TitleBanner from './TitleBanner';

const Banner = ({ interval = 3000, title = true }) => {
  //bikin array banner
  const banners = [ban1, ban2, ban3, ban4];
  //current slide state
  const [currentSlide, setcurrentSlide] = useState(0);
  const slideInterval = useRef();

  //tombol previous/mundur
  const prev = () => {
    startSlideTimer();
    const index = currentSlide > 0 ? currentSlide - 1 : banners.length - 1;
    setcurrentSlide(index);
  };
  //tombol next/maju
  const next = () => {
    startSlideTimer();
    const index = currentSlide < banners.length + 1 ? currentSlide + 1 : 0;
    setcurrentSlide(index);
  };
  //ganti index
  const switchSlide = (index) => {
    startSlideTimer();
    setcurrentSlide(index);
  };
  //start slide timer
  const startSlideTimer = () => {
    stopSlideTimer();
    slideInterval.current = setInterval(() => {
      setcurrentSlide((currentSlide) =>
        currentSlide < banners.length - 1 ? currentSlide + 1 : 0
      );
    }, interval);
  };
  //stop slide timer
  const stopSlideTimer = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  useEffect(() => {
    startSlideTimer();
    return () => {
      stopSlideTimer();
    };
  }, []);

  return (
    <section className="container">
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
      {title && <TitleBanner />}
    </section>
  );
};

export default Banner;
