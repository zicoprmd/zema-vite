import './Article.scss';
import art_img2 from '../../assets/article/z4.JPG';

const Article2 = () => {
  return (
    <section id="zema2" className="article-section alt-bg">
      <div className="article-inner reverse">
        <div className="article-image-wrap">
          <img src={art_img2} className="article-img" alt="Zema growing" />
        </div>
        <div className="article-content">
          <span className="article-tag">✦ The Beginning</span>
          <h2 className="article-heading">
            Small in size, infinite in wonder
          </h2>
          <div className="article-divider" />
          <div className="article-stats">
            <div className="stat">
              <span className="stat-value">2810</span>
              <span className="stat-label">grams</span>
            </div>
            <div className="stat">
              <span className="stat-value">49</span>
              <span className="stat-label">centimeters</span>
            </div>
            <div className="stat">
              <span className="stat-value">♍</span>
              <span className="stat-label">Virgo Boy</span>
            </div>
          </div>
          <p className="article-body">
            Di dalam setiap grammu terdapat dunia yang menunggu untuk dijelajahi.
            Dengan berat dan panjang yang pas, petualanganmu dimulai — setiap
            hari babak baru, setiap langkah sebuah petualangan.
            <br />
            <br />
            Semua orang di sekitarmu akan selalu berada di sampingmu,
            mendukungmu, dan mencintaimu. Dunia ini lebih indah karena
            kehadiranmu. 🌟✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default Article2;
