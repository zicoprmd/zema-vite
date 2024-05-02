import React from 'react';
import './Article.scss';
//import img
import art_img2 from '../../assets/article/z4.JPG';

const Article2 = () => {
  return (
    <section id="zema2">
      <div className="article article-2">
        <div className="image-wrapper imgwrp-mobile">
          <img src={art_img2} className="image image-2" alt="article2"></img>
        </div>
        <div className="content-wrapper">
          <p className="text">
            <strong>Berat Badan dan Panjang Tubuh</strong> Ketika aku pertama
            kali lahir, timbangan menunjukkan angka 2810 gram. Itu adalah bukti
            betapa berharganya setiap grammu bagi orang-orang yang mencintaimu.
            Panjang tubuhmu 49 cm, dan di dalam ukuran itu terdapat dunia yang
            menunggu untuk dijelajahi.
            <br />
            <strong>Petualanganku Dimulai</strong> Dengan berat badan dan
            panjang tubuh yang pas, aku memulai perjalananmu. Setiap hari adalah
            babak baru, setiap langkah adalah petualangan. aku akan belajar,
            tumbuh, dan menemukan banyak hal. Dan di antara semua itu, ada satu
            hal yang pasti: dunia ini lebih indah karena kehadiranku. Teruslah
            menulis cerita dihidupku. Semua orang di sekitarku akan selalu
            berada di sampingku, mendukungku, dan mencintaiku, Virgo Boy! 🌟👶✨
          </p>
        </div>
        <div className="image-wrapper imgwrp-dom">
          <img src={art_img2} className="image image-2" alt="article2"></img>
        </div>
      </div>
    </section>
  );
};

export default Article2;
