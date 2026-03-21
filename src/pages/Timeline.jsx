import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Timeline.scss';
import { BiChevronLeft, BiChevronRight, BiHomeAlt, BiCloudUpload } from 'react-icons/bi';

// API URL - use VITE_API_URL env var or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Import images from src/assets/timeline (default/fallback)
import img6bulan from '../assets/timeline/6bulan.jpg';
import img1tahun from '../assets/timeline/1tahun.jpg';
import img1_5tahun from '../assets/timeline/1_5tahun.jpg';
import img2tahun from '../assets/timeline/2tahun.jpg';
import img2_5tahun from '../assets/timeline/2_5tahun.jpg';
import img3tahun from '../assets/timeline/3tahun.jpg';
import img3_5tahun from '../assets/timeline/3_5tahun.jpg';

// Default images from local files
const defaultImages = {
  '6bulan': img6bulan,
  '1tahun': img1tahun,
  '1_5tahun': img1_5tahun,
  '2tahun': img2tahun,
  '2_5tahun': img2_5tahun,
  '3tahun': img3tahun,
  '3_5tahun': img3_5tahun,
};

const milestones = [
  {
    id: 1,
    age: '6 Bulan',
    title: 'Enam Bulan',
    description: 'Momen indah di usia 6 bulan. Senyum pertamanya, suara tawanya, dan langkah awal dalam perjalanan hidup.',
    storageKey: '6bulan',
  },
  {
    id: 2,
    age: '1 Tahun',
    title: 'Satu Tahun',
    description: 'Hari istimewa! Satu tahun penuh cinta, tawa, dan keajaiban. Selamat datang di dunia, sayang!',
    storageKey: '1tahun',
  },
  {
    id: 3,
    age: '1.5 Tahun',
    title: 'Satu Setengah Tahun',
    description: 'Waktu berlalu begitu cepat. Setiap hari penuh dengan kejutan kecil yang membuat hati bahagia.',
    storageKey: '1_5tahun',
  },
  {
    id: 4,
    age: '2 Tahun',
    title: 'Dua Tahun',
    description: 'Dua tahun penuh petualangan. Dunia menjadi tempat yang ajaib dengan kehadiranmu.',
    storageKey: '2tahun',
  },
  {
    id: 5,
    age: '2.5 Tahun',
    title: 'Dua Setengah Tahun',
    description: 'Setiap langkahmu mengajarkan kami tentang cinta yang tidak bersyarat.',
    storageKey: '2_5tahun',
  },
  {
    id: 6,
    age: '3 Tahun',
    title: 'Tiga Tahun',
    description: 'Tiga tahun penuh keajaiban. Kamu adalah bintang di hari-hari kami.',
    storageKey: '3tahun',
  },
  {
    id: 7,
    age: '3.5 Tahun',
    title: 'Tiga Setengah Tahun',
    description: 'Waktu变得更加 sempurna. Setiap momen bersama kamu adalah hadiah.',
    storageKey: '3_5tahun',
  },
  {
    id: 8,
    age: '4 Tahun',
    title: 'Empat Tahun',
    description: 'Empat tahun kebahagiaan. Imajinasi kamu tidak ada habisnya.',
    storageKey: '4tahun',
  },
  {
    id: 9,
    age: '4.5 Tahun',
    title: 'Empat Setengah Tahun',
    description: 'Setiap hari kamu tumbuh menjadi pribadi yang lebih menakjubkan.',
    storageKey: '4_5tahun',
  },
  {
    id: 10,
    age: '5 Tahun',
    title: 'Lima Tahun',
    description: 'Lima tahun penuh cinta! Kamu adalah cerita terbaik yang pernah kami miliki.',
    storageKey: '5tahun',
  },
];

const Timeline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [serverImages, setServerImages] = useState({});
  const [uploadingFor, setUploadingFor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const totalSlides = milestones.length;

  // Fetch timeline images from API
  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const res = await fetch(`${API_URL}/timeline`);
        if (res.ok) {
          const data = await res.json();
          const images = {};
          data.forEach(entry => {
            if (entry.image) {
              images[entry.storageKey] = entry.image;
            }
          });
          setServerImages(images);
        }
      } catch (e) {
        console.warn('Failed to fetch timeline from API');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTimeline();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleFileChange = async (e, storageKey) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;

      try {
        const res = await fetch(`${API_URL}/timeline/${storageKey}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 }),
        });
        if (res.ok) {
          setServerImages(prev => ({ ...prev, [storageKey]: base64 }));
        }
      } catch (e) {
        console.error('Failed to upload to server');
      }

      setUploadingFor(null);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = (id) => {
    setUploadingFor(id);
  };

  const current = milestones[currentIndex];
  const displayImage = serverImages[current.storageKey] || defaultImages[current.storageKey] || null;

  return (
    <section className="timeline-page">
      <div className="timeline-top-bar">
        <Link to="/" className="timeline-home-btn">
          <BiHomeAlt />
          <span>Home</span>
        </Link>
      </div>

      <div className="timeline-header">
        <span className="timeline-eyebrow">✦ Perjalanan ✦</span>
        <h1 className="timeline-title">Timeline Pertumbuhan</h1>
        <p className="timeline-subtitle">
          Setiap 6 bulan adalah sebuah cerita dalam perjalanan hidupmu
        </p>
      </div>

      <div className="timeline-carousel">
        <button className="timeline-nav timeline-nav--prev" onClick={prevSlide}>
          <BiChevronLeft />
        </button>

        <div className="timeline-card">
          <div className="timeline-card__image">
            {displayImage ? (
              <>
                <img src={displayImage} alt={current.title} />
                <button
                  className="image-change-btn"
                  onClick={() => triggerFileInput(current.id)}
                >
                  <BiCloudUpload />
                  Ganti Foto
                </button>
              </>
            ) : (
              <div
                className="timeline-card__placeholder"
                onClick={() => triggerFileInput(current.id)}
              >
                <span className="placeholder-emoji">📷</span>
                <span className="placeholder-text">Foto {current.age}</span>
                <span className="placeholder-hint">Klik untuk upload</span>
              </div>
            )}
            {uploadingFor === current.id && (
              <input
                type="file"
                accept="image/*"
                className="file-input"
                onChange={(e) => handleFileChange(e, current.storageKey)}
                autoFocus
              />
            )}
          </div>

          <div className="timeline-card__content">
            <span className="timeline-card__age">{current.age}</span>
            <h2 className="timeline-card__title">{current.title}</h2>
            <p className="timeline-card__description">{current.description}</p>
          </div>

          <div className="timeline-card__progress">
            <span className="progress-label">
              {currentIndex + 1} / {totalSlides}
            </span>
            <div className="progress-bar">
              <div
                className="progress-bar__fill"
                style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <button className="timeline-nav timeline-nav--next" onClick={nextSlide}>
          <BiChevronRight />
        </button>
      </div>

      <div className="timeline-dots">
        {milestones.map((_, index) => (
          <button
            key={index}
            className={`timeline-dot ${index === currentIndex ? 'timeline-dot--active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <div className="timeline-nav-arrows">
        <button className="timeline-arrow timeline-arrow--left" onClick={prevSlide}>
          ← Sebelumnya
        </button>
        <button className="timeline-arrow timeline-arrow--right" onClick={nextSlide}>
          Selanjutnya →
        </button>
      </div>
    </section>
  );
};

export default Timeline;
