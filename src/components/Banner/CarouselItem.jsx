import React from 'react';

const CarouselItem = ({ slide, i, stopSlide, startSLide }) => {
  return (
    <div
      id="banner"
      key={i}
      className="carousel-item"
      onMouseEnter={stopSlide}
      onMouseOut={startSLide}>
      <img src={slide} alt="banner" className="image-banner" />
    </div>
  );
};

export default CarouselItem;
