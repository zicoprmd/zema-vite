import './Article.scss';
import art_img1 from '../../assets/article/z2.JPG';

const Article1 = () => {
  return (
    <section id="zema1" className="article-section">
      <div className="article-inner">
        <div className="article-image-wrap">
          <img src={art_img1} className="article-img" alt="Zema newborn" />
        </div>
        <div className="article-content">
          <span className="article-tag">✦ Our Story</span>
          <h2 className="article-heading">
            A Thursday morning that changed everything
          </h2>
          <div className="article-divider" />
          <p className="article-body">
            Halo, saya <strong>Zema Arrazka Permadi!</strong> Senang bertemu
            denganmu — hari yang indah dan penuh makna.
            <br />
            <br />
            <strong>Pagi yang Cerah, 25 Agustus 2022.</strong> Langit biru
            terbentang luas di atas rumah sakit tempat ibuku melahirkanku. Suara
            azan subuh menggema, dan di saat itulah aku memutuskan untuk memulai
            petualanganku di dunia ini. Hari Kamis yang penuh berkah, dan aku,
            sang Virgo Boy, siap untuk menghadapi segala hal yang akan datang.
          </p>
          <blockquote className="article-quote">
            &ldquo;They were the heroes behind my first breath &mdash; Bidan
            Wulan, Kak Junita, and Dokter Desi.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Article1;
