import { React, useState, useEffect } from 'react';
import './Article.scss';
//import img
import art_img1 from '../../assets/article/z2.JPG';

const Article1 = () => {
  /* const [style, setStyle] = useState({ filter: 'grayscale(100%)' });

  const changeBorder = () => {
    setStyle({ filter: 'grayscale(0%)' });
  };

  const resetStyle = () => {
    setStyle({ filter: 'grayscale(100%)' });
  }; */

  return (
    <section id="zema1">
      <div className="article article-1">
        <div className="image-wrapper">
          <img
            /* style={style}
            onMouseEnter={changeBorder}
            onMouseLeave={resetStyle} */
            src={art_img1}
            className="image image-1"
            alt="image_article1"></img>
        </div>
        <div className="content-wrapper">
          <p className="text text-1">
            Halo, saya Zema Arrazka Permadi! Senang bertemu denganmu. 😊, hari
            yang indah dan penuh makna. Mari kita lanjutkan ceritaku!
            <br />
            <br />
            <strong>Pagi yang Cerah di Tanggal 25 Agustus 2022</strong> Langit
            biru terbentang luas di atas rumah sakit tempat ibuku melahirkanku.
            Suara azan subuh menggema, dan di saat itulah aku memutuskan untuk
            memulai petualanganmu di dunia ini. Hari Kamis yang penuh berkah,
            dan aku, sang Virgo Boy, siap untuk menghadapi segala hal yang akan
            datang.
            <br />
            <br />
            <strong>Ibu Bidan Wulan, Perawat Junita, dan Dokter Desi</strong>
            Mereka adalah pahlawan di balik momen kelahiranku. Ibu Bidan Wulan
            dengan tangan terampilnya, Kak Junita yang memberikan semangat, dan
            Dokter Desi yang memastikan semuanya berjalan lancar. Mereka adalah
            tim yang bekerja bersama untuk membantu ibuku, dan aku, menjadi
            bagian dari keluarga besar mereka.
            <br />
          </p>
        </div>
      </div>
    </section>
  );
};

export default Article1;
