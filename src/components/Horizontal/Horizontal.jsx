import { useEffect } from 'react';
import img1 from '../../assets/img/z1.JPG';
import img2 from '../../assets/img/z5.JPG';
import img3 from '../../assets/img/z6.JPG';
import img4 from '../../assets/img/z7.JPG';
import img5 from '../../assets/img/z8.JPG';
import img6 from '../../assets/img/z9.JPG';
import img7 from '../../assets/img/z10.JPG';
import img8 from '../../assets/img/z11.JPG';
import img9 from '../../assets/img/z12.JPG';
import img10 from '../../assets/img/z13.JPG';
import './Horizontal.scss';
import HorizontalItem from './HorizontalItem';

const images = [img9, img3, img2, img4, img8, img6, img7, img5, img1, img10];

const Horizontal = () => {
  useEffect(() => {
    const imgInterval = setInterval(() => {}, 1000);
    return () => {
      clearInterval(imgInterval);
    };
  }, []);

  return (
    <section id="zema10" className="gallery-section">
      <div className="gallery-header">
        <span className="gallery-eyebrow">✦ Moments ✦</span>
        <h2 className="gallery-title">A life full of smiles</h2>
      </div>
      <div className="horizontal">
        {images.map((image, i) => (
          <HorizontalItem image={image} key={i} />
        ))}
      </div>
    </section>
  );
};

export default Horizontal;
