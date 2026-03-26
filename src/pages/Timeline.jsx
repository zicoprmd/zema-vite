import { React, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import './Timeline.scss';
import {
  BiChevronLeft,
  BiChevronRight,
  BiHomeAlt,
  BiCloudUpload,
  BiLineChart,
  BiTrophy,
  BiPlus,
  BiCheck,
  BiX,
  BiEdit,
  BiTrash,
  BiLock,
} from 'react-icons/bi';

// Supabase
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const AUTHORIZED_EMAILS = (import.meta.env.VITE_AUTHORIZED_EMAILS || '')
  .split(',')
  .map((e) => e.trim())
  .filter(Boolean);

const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

// Constants
const ZEMA_BIRTHDAY = '2022-08-25';

const getAgeInMonths = (date) => {
  const birth = new Date(ZEMA_BIRTHDAY);
  const target = new Date(date);
  let months = (target.getFullYear() - birth.getFullYear()) * 12;
  months += target.getMonth() - birth.getMonth();
  if (target.getDate() < birth.getDate()) months--;
  return Math.max(0, months);
};

const formatAge = (months) => {
  if (months < 12) return `${months} bln`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m > 0 ? `${y} thn ${m} bln` : `${y} tahun`;
};

const getNextBirthday = () => {
  const today = new Date();
  const birthday = new Date(`${ZEMA_BIRTHDAY}T00:00:00`);
  birthday.setFullYear(today.getFullYear());
  if (birthday < today) birthday.setFullYear(today.getFullYear() + 1);
  return birthday;
};

const getAgeYears = () => {
  const today = new Date();
  const birthday = new Date(`${ZEMA_BIRTHDAY}T00:00:00`);
  let years = today.getFullYear() - birthday.getFullYear();
  const monthDiff = today.getMonth() - birthday.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthday.getDate())
  )
    years--;
  return years;
};

const getCountdown = () => {
  const today = new Date();
  const nextBirthday = getNextBirthday();
  const diff = nextBirthday - today;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { days, hours, minutes, nextBirthday };
};

// Denver II milestone reference (simplified)
const DENVER_MILESTONES = [
  // Personal-Social
  {
    id: 'd2s1',
    category: 'Personal-Social',
    ageMonth: 1,
    name: 'Senyum sosial',
    ageLabel: '1 bln',
  },
  {
    id: 'd2s2',
    category: 'Personal-Social',
    ageMonth: 2,
    name: 'Tertawa keras',
    ageLabel: '2 bln',
  },
  {
    id: 'd2s3',
    category: 'Personal-Social',
    ageMonth: 6,
    name: 'Mengenal orang asing',
    ageLabel: '6 bln',
  },
  {
    id: 'd2s4',
    category: 'Personal-Social',
    ageMonth: 9,
    name: 'Say goodbye/cipika',
    ageLabel: '9 bln',
  },
  {
    id: 'd2s5',
    category: 'Personal-Social',
    ageMonth: 12,
    name: 'Bermain cilukba',
    ageLabel: '12 bln',
  },
  {
    id: 'd2s6',
    category: 'Personal-Social',
    ageMonth: 15,
    name: 'Minum sendiri',
    ageLabel: '15 bln',
  },
  {
    id: 'd2s7',
    category: 'Personal-Social',
    ageMonth: 18,
    name: 'Makan sendiri',
    ageLabel: '18 bln',
  },
  {
    id: 'd2s8',
    category: 'Personal-Social',
    ageMonth: 24,
    name: 'Bermain bersama',
    ageLabel: '24 bln',
  },
  // Fine Motor
  {
    id: 'd2f1',
    category: 'Fine Motor',
    ageMonth: 1,
    name: 'Melihat wajah',
    ageLabel: '1 bln',
  },
  {
    id: 'd2f2',
    category: 'Fine Motor',
    ageMonth: 4,
    name: 'Menggenggam mainan',
    ageLabel: '4 bln',
  },
  {
    id: 'd2f3',
    category: 'Fine Motor',
    ageMonth: 6,
    name: 'Ambil benda kecil',
    ageLabel: '6 bln',
  },
  {
    id: 'd2f4',
    category: 'Fine Motor',
    ageMonth: 9,
    name: 'Jentik/jentik benda',
    ageLabel: '9 bln',
  },
  {
    id: 'd2f5',
    category: 'Fine Motor',
    ageMonth: 12,
    name: 'Rangkai 2 kubus',
    ageLabel: '12 bln',
  },
  {
    id: 'd2f6',
    category: 'Fine Motor',
    ageMonth: 15,
    name: 'Lukis garukan',
    ageLabel: '15 bln',
  },
  {
    id: 'd2f7',
    category: 'Fine Motor',
    ageMonth: 18,
    name: 'Minum gelas',
    ageLabel: '18 bln',
  },
  {
    id: 'd2f8',
    category: 'Fine Motor',
    ageMonth: 24,
    name: 'Lukis lingkaran',
    ageLabel: '24 bln',
  },
  // Gross Motor
  {
    id: 'd2g1',
    category: 'Gross Motor',
    ageMonth: 1,
    name: 'Angkat kepala (tengkurap)',
    ageLabel: '1 bln',
  },
  {
    id: 'd2g2',
    category: 'Gross Motor',
    ageMonth: 2,
    name: 'Angkat kepala+dad (kuduk)',
    ageLabel: '2 bln',
  },
  {
    id: 'd2g3',
    category: 'Gross Motor',
    ageMonth: 4,
    name: 'Berbalik arah',
    ageLabel: '4 bln',
  },
  {
    id: 'd2g4',
    category: 'Gross Motor',
    ageMonth: 6,
    name: 'Duduk sendiri',
    ageLabel: '6 bln',
  },
  {
    id: 'd2g5',
    category: 'Gross Motor',
    ageMonth: 9,
    name: 'Merangkak',
    ageLabel: '9 bln',
  },
  {
    id: 'd2g6',
    category: 'Gross Motor',
    ageMonth: 12,
    name: 'Berdiri sendiri',
    ageLabel: '12 bln',
  },
  {
    id: 'd2g7',
    category: 'Gross Motor',
    ageMonth: 15,
    name: 'Jalan sendiri',
    ageLabel: '15 bln',
  },
  {
    id: 'd2g8',
    category: 'Gross Motor',
    ageMonth: 24,
    name: 'Jalan naik tangga',
    ageLabel: '24 bln',
  },
  // Language
  {
    id: 'd2l1',
    category: 'Language',
    ageMonth: 1,
    name: 'Suara-suara',
    ageLabel: '1 bln',
  },
  {
    id: 'd2l2',
    category: 'Language',
    ageMonth: 4,
    name: 'Tertawa',
    ageLabel: '4 bln',
  },
  {
    id: 'd2l3',
    category: 'Language',
    ageMonth: 6,
    name: 'Basa-basi',
    ageLabel: '6 bln',
  },
  {
    id: 'd2l4',
    category: 'Language',
    ageMonth: 9,
    name: '"Mama/papa"',
    ageLabel: '9 bln',
  },
  {
    id: 'd2l5',
    category: 'Language',
    ageMonth: 12,
    name: '3 kata bermakna',
    ageLabel: '12 bln',
  },
  {
    id: 'd2l6',
    category: 'Language',
    ageMonth: 18,
    name: '10 kata',
    ageLabel: '18 bln',
  },
  {
    id: 'd2l7',
    category: 'Language',
    ageMonth: 24,
    name: 'Kalimat 2 kata',
    ageLabel: '24 bln',
  },
];

// KMS WHO reference percentiles (simplified, in cm and kg)
const WHO_REFERENCE = {
  height: {
    boys: [
      { month: 0, p50: 50 },
      { month: 1, p50: 55 },
      { month: 2, p50: 58 },
      { month: 3, p50: 61 },
      { month: 4, p50: 63 },
      { month: 5, p50: 65 },
      { month: 6, p50: 67 },
      { month: 7, p50: 69 },
      { month: 8, p50: 71 },
      { month: 9, p50: 72 },
      { month: 10, p50: 74 },
      { month: 11, p50: 75 },
      { month: 12, p50: 76 },
      { month: 15, p50: 79 },
      { month: 18, p50: 82 },
      { month: 21, p50: 85 },
      { month: 24, p50: 87 },
      { month: 30, p50: 91 },
      { month: 36, p50: 95 },
      { month: 42, p50: 98 },
      { month: 48, p50: 102 },
    ],
  },
  weight: {
    boys: [
      { month: 0, p50: 3.3 },
      { month: 1, p50: 4.5 },
      { month: 2, p50: 5.6 },
      { month: 3, p50: 6.4 },
      { month: 4, p50: 7.0 },
      { month: 5, p50: 7.5 },
      { month: 6, p50: 7.9 },
      { month: 7, p50: 8.3 },
      { month: 8, p50: 8.6 },
      { month: 9, p50: 8.9 },
      { month: 10, p50: 9.2 },
      { month: 11, p50: 9.4 },
      { month: 12, p50: 9.6 },
      { month: 15, p50: 10.3 },
      { month: 18, p50: 10.8 },
      { month: 21, p50: 11.5 },
      { month: 24, p50: 12.2 },
      { month: 30, p50: 13.3 },
      { month: 36, p50: 14.2 },
      { month: 42, p50: 15.4 },
      { month: 48, p50: 16.3 },
    ],
  },
};

// Timeline images (unchanged)
import img6bulan from '../assets/timeline/6bulan.jpg';
import img1tahun from '../assets/timeline/1tahun.jpg';
import img1_5tahun from '../assets/timeline/1_5tahun.jpg';
import img2tahun from '../assets/timeline/2tahun.jpg';
import img2_5tahun from '../assets/timeline/2_5tahun.jpg';
import img3tahun from '../assets/timeline/3tahun.jpg';
import img3_5tahun from '../assets/timeline/3_5tahun.jpg';

const defaultImages = {
  '6bulan': img6bulan,
  '1tahun': img1tahun,
  '1_5tahun': img1_5tahun,
  '2tahun': img2tahun,
  '2_5tahun': img2_5tahun,
  '3tahun': img3tahun,
  '3_5tahun': img3_5tahun,
};

const timelineMilestones = [
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
    description: 'Hari istimewa! Satu tahun penuh cinta, tawa, dan keajaiban. selamat datang di dunia!',
    storageKey: '1tahun',
  },
  {
    id: 3,
    age: '1.5 Tahun',
    title: 'Satu Setengah Tahun',
    description: 'Waktu berlalu begitu cepat. Setiap hari penuh dengan kajutan kecil yang membuat hati bahagia.',
    storageKey: '1_5tahun',
  },
  {
    id: 4,
    age: '2 Tahun',
    title: 'Dua Tahun',
    description: 'Dua tahun penuh petualangan. Dunia menjadi tempat yang ajaib atas kehadiranmu',
    storageKey: '2tahun',
  },
  {
    id: 5,
    age: '2.5 Tahun',
    title: 'Dua Setengah Tahun',
    description: 'Setiap langkahmu mengajarkan kami tentang cinta yang tidak bersyarat',
    storageKey: '2_5tahun',
  },
  {
    id: 6,
    age: '3 Tahun',
    title: 'Tiga Tahun',
    description: 'Tiga tahun penuh keajaiban. Kamu adalah bulan di hari-hari kami',
    storageKey: '3tahun',
  },
  {
    id: 7,
    age: '3.5 Tahun',
    title: 'Tiga Setengah Tahun',
    description: 'Waktu yang sempurna. Setiap momen bersama kamu adalah hadiah',
    storageKey: '3_5tahun',
  },
  {
    id: 8,
    age: '4 Tahun',
    title: 'Empat Tahun',
    description: 'Empat tahun kebahagiaan. Imajinasi kamu tidak akan ada habisnya.',
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
    description: 'Lima tahun penuh cinta! Kamu adalah cerita terbaik yang pernah kami miliki',
    storageKey: '5tahun',
  },
];

// Supabase growth data helpers
const fetchGrowthData = async () => {
  if (!supabase) {
    const saved = localStorage.getItem('zema_growth_data');
    return saved ? JSON.parse(saved) : [];
  }
  const { data, error } = await supabase
    .from('growth_data')
    .select('*')
    .order('date', { ascending: true });
  if (error) {
    console.error('[Growth] Fetch error:', error);
    return [];
  }
  return (data || []).map((r) => ({
    id: r.id,
    date: r.date,
    height: r.height,
    weight: r.weight,
    headCirc: r.head_circ,
    note: r.note,
    ageMonth: r.age_month,
    createdAt: r.created_at,
  }));
};

const saveGrowthRecord = async (record) => {
  // Map camelCase to snake_case for Supabase
  const dbRecord = {
    date: record.date,
    height: record.height,
    weight: record.weight,
    head_circ: record.headCirc,
    note: record.note,
    age_month: record.ageMonth,
  };

  if (!supabase) {
    const existing = JSON.parse(
      localStorage.getItem('zema_growth_data') || '[]',
    );
    const idx = existing.findIndex((r) => r.id === record.id);
    const toSave = { ...record, id: record.id || crypto.randomUUID() };
    if (idx >= 0) existing[idx] = toSave;
    else existing.push(toSave);
    localStorage.setItem('zema_growth_data', JSON.stringify(existing));
    return toSave;
  }
  if (record.id) {
    const { data, error } = await supabase
      .from('growth_data')
      .update({ ...dbRecord, id: record.id })
      .eq('id', record.id)
      .select()
      .single();
    if (error) {
      console.error('Update error:', error);
      return null;
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from('growth_data')
      .insert([{ ...dbRecord, id: crypto.randomUUID() }])
      .select()
      .single();
    if (error) {
      console.error('Insert error:', error);
      return null;
    }
    return data;
  }
};

const deleteGrowthRecord = async (id) => {
  if (!supabase) {
    const existing = JSON.parse(
      localStorage.getItem('zema_growth_data') || '[]',
    );
    localStorage.setItem(
      'zema_growth_data',
      JSON.stringify(existing.filter((r) => r.id !== id)),
    );
    return;
  }
  await supabase.from('growth_data').delete().eq('id', id);
};

// Milestone helpers
const fetchMilestones = async () => {
  if (!supabase) {
    const saved = localStorage.getItem('zema_milestones');
    return saved ? JSON.parse(saved) : {};
  }
  const { data, error } = await supabase
    .from('milestones')
    .select('*')
    .maybeSingle();
  if (error) {
    console.error('Fetch milestones error:', error);
    return {};
  }
  return data?.achieved || {};
};

const saveMilestones = async (achieved) => {
  if (!supabase) {
    localStorage.setItem('zema_milestones', JSON.stringify(achieved));
    return;
  }
  const { error } = await supabase
    .from('milestones')
    .upsert(
      { id: 1, achieved, updated_at: new Date().toISOString() },
      { onConflict: 'id' },
    );
  if (error) {
    console.error('Save milestones error:', error);
  }
};

// Supabase auth
const fetchTimeline = async () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  const res = await fetch(`${API_URL}/timeline`);
  if (!res.ok) return {};
  const data = await res.json();
  const images = {};
  data.forEach((entry) => {
    if (entry.image) images[entry.storageKey] = entry.image;
  });
  return images;
};

const Timeline = () => {
  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [serverImages, setServerImages] = useState({});
  const [uploadingFor, setUploadingFor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(getCountdown());
  const [activeTab, setActiveTab] = useState('timeline'); // timeline | growth

  // Growth data
  const [growthRecords, setGrowthRecords] = useState([]);
  const [showGrowthForm, setShowGrowthForm] = useState(false);
  const [editingGrowth, setEditingGrowth] = useState(null);
  const [growthForm, setGrowthForm] = useState({
    date: '',
    height: '',
    weight: '',
    headCirc: '',
    note: '',
  });

  // Milestones
  const [achieved, setAchieved] = useState({});

  // Auth
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const totalSlides = timelineMilestones.length;

  // Auth check
  const checkAuth = useCallback(async () => {
    if (!supabase) {
      setIsAuthorized(true);
      setUser({ email: 'dev@local' });
      return;
    }
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
      const email = session.user.email?.toLowerCase();
      setIsAuthorized(
        AUTHORIZED_EMAILS.length === 0 ||
          AUTHORIZED_EMAILS.some((e) => e.toLowerCase() === email),
      );
    }
  }, []);

  // Load data
  const loadData = useCallback(async () => {
    setIsLoading(true);
    const [images, growth, milestonesData] = await Promise.all([
      fetchTimeline().catch((e) => {
        console.warn('[Timeline] fetch failed:', e.message);
        return {};
      }),
      fetchGrowthData().catch((e) => {
        console.error('[Growth] fetch failed:', e.message);
        return [];
      }),
      fetchMilestones().catch((e) => {
        console.warn('[Milestones] fetch failed:', e.message);
        return {};
      }),
    ]);
    setServerImages(images);
    setGrowthRecords(growth);
    setAchieved(milestonesData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
    loadData();
  }, [checkAuth, loadData]);

  // Auth listener
  useEffect(() => {
    if (!supabase) return;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        const email = session.user.email?.toLowerCase();
        setIsAuthorized(
          AUTHORIZED_EMAILS.some((e) => e.toLowerCase() === email),
        );
      } else {
        setUser(null);
        setIsAuthorized(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // Countdown
  useEffect(() => {
    const i = setInterval(() => setCountdown(getCountdown()), 60000);
    return () => clearInterval(i);
  }, []);

  // Handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    setLoginError('');
    setLoginLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (error) setLoginError(error.message);
    else {
      setShowLogin(false);
      setLoginEmail('');
      setLoginPassword('');
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
  };

  const handleGrowthSubmit = async (e) => {
    e.preventDefault();
    if (!growthForm.date || !growthForm.height || !growthForm.weight) return;
    const record = {
      id: editingGrowth?.id,
      date: growthForm.date,
      height: parseFloat(growthForm.height),
      weight: parseFloat(growthForm.weight),
      headCirc: growthForm.headCirc ? parseFloat(growthForm.headCirc) : null,
      note: growthForm.note || '',
      ageMonth: getAgeInMonths(growthForm.date),
    };
    const saved = await saveGrowthRecord(record);
    if (!saved) {
      alert('Gagal menyimpan data');
      return;
    }
    // Normalize response to camelCase
    const normalized = {
      id: saved.id || record.id,
      date: saved.date || record.date,
      height: saved.height || record.height,
      weight: saved.weight || record.weight,
      headCirc: saved.headCirc ?? record.headCirc,
      note: saved.note || record.note,
      ageMonth: saved.ageMonth ?? record.ageMonth,
      createdAt: saved.created_at || saved.createdAt,
    };
    if (editingGrowth?.id) {
      setGrowthRecords((records) =>
        records.map((r) => (r.id === normalized.id ? normalized : r)),
      );
    } else {
      setGrowthRecords((records) =>
        [...records, normalized].sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        ),
      );
    }
    setShowGrowthForm(false);
    setEditingGrowth(null);
    setGrowthForm({ date: '', height: '', weight: '', headCirc: '', note: '' });
  };

  const handleDeleteGrowth = async (id) => {
    if (!confirm('Hapus data ini?')) return;
    await deleteGrowthRecord(id);
    setGrowthRecords((records) => records.filter((r) => r.id !== id));
  };

  const handleToggleMilestone = async (milestoneId) => {
    const updated = { ...achieved, [milestoneId]: !achieved[milestoneId] };
    setAchieved(updated);
    await saveMilestones(updated);
  };

  // Timeline carousel handlers
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  const handleFileChange = async (e, storageKey) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      const API_URL =
        import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      try {
        const res = await fetch(`${API_URL}/timeline/${storageKey}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 }),
        });
        if (res.ok)
          setServerImages((prev) => ({ ...prev, [storageKey]: base64 }));
      } catch (err) {
        console.error('Upload failed', err);
      }
      setUploadingFor(null);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = (id) => setUploadingFor(id);
  const current = timelineMilestones[currentIndex];
  const displayImage =
    serverImages[current.storageKey] ||
    defaultImages[current.storageKey] ||
    null;

  // Chart data
  const chartData = growthRecords
    .map((r) => ({
      age: formatAge(r.ageMonth),
      ageMonth: r.ageMonth,
      tinggi: r.height,
      berat: r.weight,
      lingkar: r.headCirc,
      date: r.date,
    }))
    .sort((a, b) => a.ageMonth - b.ageMonth);

  const currentAgeMonths = getAgeInMonths(
    new Date().toISOString().split('T')[0],
  );

  return (
    <section className="timeline-page">
      {/* Top Bar */}
      <div className="timeline-top-bar">
        <Link to="/" className="timeline-home-btn">
          <BiHomeAlt />
          <span>Home</span>
        </Link>

        <div className="top-bar-right">
          {!supabase ? null : !user ? (
            <button
              className="tab-btn login-btn"
              onClick={() => setShowLogin(true)}>
              <BiLock /> Login
            </button>
          ) : (
            <>
              <button
                className="tab-btn"
                onClick={() =>
                  setActiveTab(activeTab === 'timeline' ? 'growth' : 'timeline')
                }>
                {activeTab === 'timeline' ? <BiLineChart /> : <BiChevronLeft />}{' '}
                {activeTab === 'timeline' ? 'Growth' : 'Timeline'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="blog-modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
            <div className="blog-modal__header">
              <h2>Login</h2>
              <button onClick={() => setShowLogin(false)}>
                <BiX />
              </button>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              {loginError && <p className="blog-login-error">{loginError}</p>}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowLogin(false)}>
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={loginLoading}>
                  {loginLoading ? '...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User bar when logged in */}
      {supabase && user && (
        <div className="blog-user-bar">
          <span>{user.email}</span>
          {isAuthorized ? (
            <span className="blog-auth-badge authorized">Authorized</span>
          ) : (
            <span className="blog-auth-badge viewer">Viewer</span>
          )}
          <button onClick={handleLogout} className="blog-logout-btn">
            Logout
          </button>
        </div>
      )}

      {/* Header */}
      <div className="timeline-header">
        <span className="timeline-eyebrow">✦ Perjalanan ✦</span>
        <h1 className="timeline-title">Timeline Pertumbuhan</h1>
        <p className="timeline-subtitle">
          Setiap 6 bulan adalah sebuah cerita dalam perjalanan hidupmu
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="tab-switcher">
        <button
          className={`tab-switcher__btn ${
            activeTab === 'timeline' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('timeline')}>
          📸 Foto
        </button>
        <button
          className={`tab-switcher__btn ${
            activeTab === 'growth' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('growth')}>
          📊 Growth Dashboard
        </button>
      </div>

      {/* === TIMELINE TAB === */}
      {activeTab === 'timeline' && (
        <>
          <div className="timeline-carousel">
            <button className="timeline-nav" onClick={prevSlide}>
              <BiChevronLeft />
            </button>
            <div className="timeline-card">
              <div className="timeline-card__image">
                {displayImage ? (
                  <>
                    <img src={displayImage} alt={current.title} />
                    {isAuthorized && (
                      <button
                        className="image-change-btn"
                        onClick={() => triggerFileInput(current.id)}>
                        <BiCloudUpload /> Ganti Foto
                      </button>
                    )}
                  </>
                ) : (
                  <div
                    className="timeline-card__placeholder"
                    onClick={() => triggerFileInput(current.id)}>
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
                <p className="timeline-card__description">
                  {current.description}
                </p>
              </div>
              <div className="timeline-card__progress">
                <span className="progress-label">
                  {currentIndex + 1} / {totalSlides}
                </span>
                <div className="progress-bar">
                  <div
                    className="progress-bar__fill"
                    style={{
                      width: `${((currentIndex + 1) / totalSlides) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
            <button className="timeline-nav" onClick={nextSlide}>
              <BiChevronRight />
            </button>
          </div>

          <div className="timeline-dots">
            {timelineMilestones.map((_, i) => (
              <button
                key={i}
                className={`timeline-dot ${
                  i === currentIndex ? 'timeline-dot--active' : ''
                }`}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>

          <div className="timeline-nav-arrows">
            <button
              className="timeline-arrow timeline-arrow--left"
              onClick={prevSlide}>
              ← Sebelumnya
            </button>
            <button
              className="timeline-arrow timeline-arrow--right"
              onClick={nextSlide}>
              Selanjutnya →
            </button>
          </div>

          <div className="birthday-countdown">
            <div className="birthday-countdown__cake">🎂</div>
            <div className="birthday-countdown__title">
              Ulang Tahun Zema ke-{getAgeYears() + 1}
            </div>
            <div className="birthday-countdown__subtitle">
              {countdown.nextBirthday.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
            <div className="birthday-countdown__timer">
              <div className="birthday-countdown__unit">
                <span className="countdown-number">{countdown.days}</span>
                <span className="countdown-label">Hari</span>
              </div>
              <span className="countdown-sep">:</span>
              <div className="birthday-countdown__unit">
                <span className="countdown-number">
                  {String(countdown.hours).padStart(2, '0')}
                </span>
                <span className="countdown-label">Jam</span>
              </div>
              <span className="countdown-sep">:</span>
              <div className="birthday-countdown__unit">
                <span className="countdown-number">
                  {String(countdown.minutes).padStart(2, '0')}
                </span>
                <span className="countdown-label">Menit</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* === GROWTH DASHBOARD TAB === */}
      {activeTab === 'growth' && (
        <div className="growth-dashboard">
          {/* Summary Cards */}
          <div className="growth-summary">
            <div className="growth-summary__card">
              <span className="growth-summary__label">Usia</span>
              <span className="growth-summary__value">
                {formatAge(currentAgeMonths)}
              </span>
              <span className="growth-summary__sub">Lahir: 25 Agu 2022</span>
            </div>
            <div className="growth-summary__card">
              <span className="growth-summary__label">Tertinggi</span>
              <span className="growth-summary__value">
                {growthRecords.length > 0
                  ? `${Math.max(...growthRecords.map((r) => r.height))} cm`
                  : '-'}
              </span>
              <span className="growth-summary__sub">
                {growthRecords.length > 0
                  ? `(@ ${formatAge(
                      growthRecords.find(
                        (r) =>
                          r.height ===
                          Math.max(...growthRecords.map((r) => r.height)),
                      )?.ageMonth,
                    )})`
                  : ''}
              </span>
            </div>
            <div className="growth-summary__card">
              <span className="growth-summary__label">Terberat</span>
              <span className="growth-summary__value">
                {growthRecords.length > 0
                  ? `${Math.max(...growthRecords.map((r) => r.weight))} kg`
                  : '-'}
              </span>
              <span className="growth-summary__sub">
                {growthRecords.length > 0
                  ? `(@ ${formatAge(
                      growthRecords.find(
                        (r) =>
                          r.weight ===
                          Math.max(...growthRecords.map((r) => r.weight)),
                      )?.ageMonth,
                    )})`
                  : ''}
              </span>
            </div>
            <div className="growth-summary__card">
              <span className="growth-summary__label">Data Points</span>
              <span className="growth-summary__value">
                {growthRecords.length}
              </span>
              <span className="growth-summary__sub">Total record</span>
            </div>
          </div>

          {/* Growth Charts */}
          {chartData.length > 0 && (
            <div className="growth-charts">
              <div className="growth-chart-card">
                <h3 className="growth-chart-card__title">
                  📏 Tinggi Badan (cm)
                </h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0e0c8" />
                    <XAxis
                      dataKey="age"
                      tick={{ fontSize: 11, fill: '#8a8a8a' }}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#8a8a8a' }}
                      domain={['dataMin-5', 'dataMax+10']}
                    />
                    <Tooltip
                      contentStyle={{
                        background: '#fffcf8',
                        border: '1px solid #c9a84c',
                        borderRadius: '12px',
                        fontSize: 12,
                      }}
                      formatter={(v, n) => [
                        n === 'Tinggi' ? `${v} cm` : `${v} kg`,
                        n,
                      ]}
                    />
                    <ReferenceLine
                      x={formatAge(currentAgeMonths)}
                      stroke="#c9a84c"
                      strokeDasharray="5 3"
                      label={{
                        value: 'Sekarang',
                        fill: '#c9a84c',
                        fontSize: 10,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="tinggi"
                      stroke="#7a9e7e"
                      strokeWidth={2.5}
                      dot={{ fill: '#7a9e7e', r: 4 }}
                      name="Tinggi"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="growth-chart-card">
                <h3 className="growth-chart-card__title">
                  ⚖️ Berat Badan (kg)
                </h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0e0c8" />
                    <XAxis
                      dataKey="age"
                      tick={{ fontSize: 11, fill: '#8a8a8a' }}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#8a8a8a' }}
                      domain={['dataMin-2', 'dataMax+3']}
                      // Format angka di sumbu Y
                      tickFormatter={(value) => value.toFixed(1)}
                    />
                    <Tooltip
                      contentStyle={{
                        background: '#fffcf8',
                        border: '1px solid #c9a84c',
                        borderRadius: '12px',
                        fontSize: 12,
                      }}
                      // Format angka di dalam Tooltip
                      formatter={(value) => [value.toFixed(1), "Berat"]}
                    />
                    <ReferenceLine
                      x={formatAge(currentAgeMonths)}
                      stroke="#c9a84c"
                      strokeDasharray="5 3"
                    />
                    <Line
                      type="monotone"
                      dataKey="berat"
                      stroke="#c97b5c"
                      strokeWidth={2.5}
                      dot={{ fill: '#c97b5c', r: 4 }}
                      name="Berat"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {chartData.some((d) => d.lingkar) && (
                <div className="growth-chart-card">
                  <h3 className="growth-chart-card__title">
                    🧠 Lingkar Kepala (cm)
                  </h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart
                      data={chartData.filter((d) => d.lingkar)}
                      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0e0c8" />
                      <XAxis
                        dataKey="age"
                        tick={{ fontSize: 11, fill: '#8a8a8a' }}
                      />
                      <YAxis tick={{ fontSize: 11, fill: '#8a8a8a' }} />
                      <Tooltip
                        contentStyle={{
                          background: '#fffcf8',
                          border: '1px solid #c9a84c',
                          borderRadius: '12px',
                          fontSize: 12,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="lingkar"
                        stroke="#9b7fbf"
                        strokeWidth={2.5}
                        dot={{ fill: '#9b7fbf', r: 4 }}
                        name="Lingkar"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          )}

          {/* Growth Records Table */}
          <div className="growth-records">
            <div className="growth-records__header">
              <h3>📋 Data Pertumbuhan</h3>
              {isAuthorized && (
                <button
                  className="growth-add-btn"
                  onClick={() => {
                    setEditingGrowth(null);
                    setGrowthForm({
                      date: '',
                      height: '',
                      weight: '',
                      headCirc: '',
                      note: '',
                    });
                    setShowGrowthForm(true);
                  }}>
                  <BiPlus /> Tambah Data
                </button>
              )}
            </div>

            {showGrowthForm && (
              <div className="growth-form">
                <div className="growth-form__header">
                  <h4>{editingGrowth ? 'Edit Data' : 'Tambah Data Baru'}</h4>
                  <button
                    onClick={() => {
                      setShowGrowthForm(false);
                      setEditingGrowth(null);
                    }}>
                    <BiX />
                  </button>
                </div>
                <form onSubmit={handleGrowthSubmit}>
                  <div className="growth-form__row">
                    <div className="form-group">
                      <label>Tanggal Pengukuran</label>
                      <input
                        type="date"
                        value={growthForm.date}
                        onChange={(e) =>
                          setGrowthForm({ ...growthForm, date: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Tinggi (cm)</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="cth: 85.5"
                        value={growthForm.height}
                        onChange={(e) =>
                          setGrowthForm({
                            ...growthForm,
                            height: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Berat (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="cth: 12.3"
                        value={growthForm.weight}
                        onChange={(e) =>
                          setGrowthForm({
                            ...growthForm,
                            weight: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Lingkar Kepala (cm)</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Opsional"
                        value={growthForm.headCirc}
                        onChange={(e) =>
                          setGrowthForm({
                            ...growthForm,
                            headCirc: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Catatan</label>
                    <input
                      type="text"
                      placeholder="cth: Setelah imunisasi"
                      value={growthForm.note}
                      onChange={(e) =>
                        setGrowthForm({ ...growthForm, note: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => {
                        setShowGrowthForm(false);
                        setEditingGrowth(null);
                      }}>
                      Batal
                    </button>
                    <button type="submit" className="btn-submit">
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            )}

            {growthRecords.length === 0 ? (
              <div className="growth-empty">
                <p>
                  Belum ada data.{' '}
                  {isAuthorized
                    ? 'Klik "Tambah Data" untuk memulai.'
                    : 'Login untuk menambah data.'}
                </p>
              </div>
            ) : (
              <div className="growth-table">
                <div className="growth-table__header">
                  <span>Tanggal</span>
                  <span>Usia</span>
                  <span>Tinggi</span>
                  <span>Berat</span>
                  <span>Lingkar</span>
                  <span>Catatan</span>
                  {isAuthorized && <span></span>}
                </div>
                {[...growthRecords].reverse().map((rec) => (
                  <div key={rec.id} className="growth-table__row">
                    <span>
                      {new Date(rec.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span>{formatAge(rec.ageMonth)}</span>
                    <span>{rec.height} cm</span>
                    <span>{rec.weight} kg</span>
                    <span>{rec.headCirc ? `${rec.headCirc} cm` : '-'}</span>
                    <span className="note-cell">{rec.note || '-'}</span>
                    {isAuthorized && (
                      <span className="actions-cell">
                        <button
                          onClick={() => {
                            setEditingGrowth(rec);
                            setGrowthForm({
                              date: rec.date,
                              height: rec.height,
                              weight: rec.weight,
                              headCirc: rec.headCirc || '',
                              note: rec.note || '',
                            });
                            setShowGrowthForm(true);
                          }}>
                          <BiEdit />
                        </button>
                        <button onClick={() => handleDeleteGrowth(rec.id)}>
                          <BiTrash />
                        </button>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Milestone Tracker */}
          <div className="milestone-tracker">
            <div className="milestone-tracker__header">
              <h3>
                <BiTrophy /> Milestone Tracker (Denver II)
              </h3>
              <span className="milestone-progress-badge">
                {Object.values(achieved).filter(Boolean).length} /{' '}
                {DENVER_MILESTONES.length} tercapai
              </span>
            </div>

            {['Personal-Social', 'Fine Motor', 'Gross Motor', 'Language'].map(
              (cat) => {
                const catMilestones = DENVER_MILESTONES.filter(
                  (m) => m.category === cat,
                );
                const achievedInCat = catMilestones.filter(
                  (m) => achieved[m.id],
                ).length;
                return (
                  <div key={cat} className="milestone-category">
                    <div className="milestone-category__header">
                      <h4>{cat}</h4>
                      <span>
                        {achievedInCat} / {catMilestones.length}
                      </span>
                    </div>
                    <div className="milestone-list">
                      {catMilestones.map((m) => (
                        <div
                          key={m.id}
                          className={`milestone-item ${
                            achieved[m.id] ? 'achieved' : ''
                          }`}>
                          <button
                            className="milestone-checkbox"
                            onClick={() =>
                              isAuthorized && handleToggleMilestone(m.id)
                            }
                            disabled={!isAuthorized}
                            title={
                              isAuthorized
                                ? achieved[m.id]
                                  ? 'Batal tandai'
                                  : 'Tandai tercapai'
                                : 'Login untuk edit'
                            }>
                            {achieved[m.id] ? (
                              <BiCheck />
                            ) : (
                              <span className="milestone-empty-check" />
                            )}
                          </button>
                          <div className="milestone-info">
                            <span className="milestone-name">{m.name}</span>
                            <span className="milestone-age">{m.ageLabel}</span>
                          </div>
                          {achieved[m.id] && (
                            <span className="milestone-achieved-badge">✓</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Timeline;
