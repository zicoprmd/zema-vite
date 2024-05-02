const CarouselIndicators = ({ banners, currentSlide, switchSlide }) => {
  return (
    <div className="carousel-indicators">
      {banners.map((_, i) => (
        <button
          className={`carousel-indicator-item${
            currentSlide == i ? ' active' : ''
          }`}
          onClick={() => switchSlide(i)}></button>
      ))}
    </div>
  );
};

export default CarouselIndicators;
