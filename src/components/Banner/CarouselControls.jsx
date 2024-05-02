import React from 'react';
//impor react icons
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';

const CarouselControls = ({ prev, next }) => {
  return (
    <div>
      <button className="carousel-control left" onClick={prev}>
        <BsChevronLeft size={28} />
      </button>
      <button className="carousel-control right" onClick={next}>
        <BsChevronRight size={28} />
      </button>
    </div>
  );
};

export default CarouselControls;
