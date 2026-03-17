import PropTypes from 'prop-types';

const HorizontalItem = ({ image }) => {
  return (
    <div className="image-wrapper">
      <img src={image} alt="Zema gallery" className="image" />
    </div>
  );
};

HorizontalItem.propTypes = {
  image: PropTypes.string.isRequired,
};

export default HorizontalItem;
