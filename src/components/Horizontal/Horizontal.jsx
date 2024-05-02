import { React, useState, useEffect } from 'react';
//import slide image
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
//scss
import './Horizontal.scss';
//imp horizontalitem
import HorizontalItem from './HorizontalItem';

const Horizontal = () => {
  //img array
  const images = [img9, img3, img2, img4, img8, img6, img7, img5, img1, img10];
  //current image
  const [currentImg, setcurrentImg] = useState(0);

  useEffect(() => {
    const imgInterval = setInterval(() => {
      setcurrentImg((currentImg) =>
        currentImg < images.length - 1 ? currentImg + 1 : 0
      );
    }, 1000);
    return () => {
      clearInterval(imgInterval);
    };
  }, []);
  return (
    <section>
      <div className="horizontal">
        {/**buat slide dari 1 sampai 9 */}
        {images.map((image, i) => (
          <HorizontalItem image={image} key={i} />
        ))}
      </div>
    </section>
  );
};

export default Horizontal;
