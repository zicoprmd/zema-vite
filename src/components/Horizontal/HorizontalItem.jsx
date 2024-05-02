const HorizontalItem = ({ image, i }) => {
  return (
    <div key={i} className="image-wrapper">
      <img src={image} alt="img-zema-scroll" className="image image-1"></img>
    </div>
  );
};

export default HorizontalItem;
