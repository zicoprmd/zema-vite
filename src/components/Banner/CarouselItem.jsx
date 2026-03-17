import PropTypes from 'prop-types';

const CarouselItem = ({ slide, stopSlide, startSLide }) => {
  return (
    <div
      id="banner"
      className="carousel-item"
      onMouseEnter={stopSlide}
      onMouseOut={startSLide}>
      <img src={slide} alt="Zema Arrazka Permadi" className="image-banner" />
    </div>
  );
};

CarouselItem.propTypes = {
  slide: PropTypes.string.isRequired,
  stopSlide: PropTypes.func.isRequired,
  startSLide: PropTypes.func.isRequired,
};

export default CarouselItem;
