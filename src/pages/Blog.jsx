import { React, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import './Blog.scss';
import { BiHomeAlt, BiPlus, BiImage, BiTrash, BiEdit, BiCheck, BiX, BiCloudUpload, BiLock } from 'react-icons/bi';

// Supabase config from env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const AUTHORIZED_EMAILS = (import.meta.env.VITE_AUTHORIZED_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);

const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    images: [],
  });
  const [previewImages, setPreviewImages] = useState([]);

  // Check auth status
  const checkAuth = useCallback(async () => {
    if (!supabase) {
      // No Supabase configured - allow all access (dev mode)
      setIsAuthorized(true);
      setUser({ email: 'dev@local' });
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
      const email = session.user.email?.toLowerCase();
      const authorized = AUTHORIZED_EMAILS.length === 0 || AUTHORIZED_EMAILS.some(e => e.toLowerCase() === email);
      setIsAuthorized(authorized);
    } else {
      setUser(null);
      setIsAuthorized(false);
    }
  }, []);

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    setIsLoading(true);
    if (!supabase) {
      // Fallback to localStorage
      const saved = localStorage.getItem('zema_blog_posts');
      if (saved) setPosts(JSON.parse(saved));
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: false })
      .order('created_at', { ascending: false });

    if (!error && data) {
      const mapped = data.map(p => ({
        id: p.id,
        title: p.title,
        content: p.content,
        date: p.date,
        images: p.images || [],
        createdAt: p.created_at,
        updatedAt: p.updated_at,
      }));
      setPosts(mapped);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, [checkAuth]);

  // Listen for auth changes
  useEffect(() => {
    if (!supabase) return;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        const email = session.user.email?.toLowerCase();
        const authorized = AUTHORIZED_EMAILS.length === 0 || AUTHORIZED_EMAILS.some(e => e.toLowerCase() === email);
        setIsAuthorized(authorized);
      } else {
        setUser(null);
        setIsAuthorized(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // Save posts to localStorage as backup
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('zema_blog_posts', JSON.stringify(posts));
    }
  }, [posts]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    setLoginError('');
    setLoginLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (error) {
      setLoginError(error.message);
    } else {
      setShowLogin(false);
      setLoginEmail('');
      setLoginPassword('');
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    setIsAuthorized(false);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newPreviews = [];
    const newImages = [...formData.images];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        newImages.push(reader.result);
        if (newPreviews.length === files.length) {
          setPreviewImages([...previewImages, ...newPreviews]);
          setFormData({ ...formData, images: newImages });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
    setPreviewImages(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;
    if (!isAuthorized) return;

    if (!supabase) {
      // Local fallback
      if (editingId) {
        setPosts(posts.map(post =>
          post.id === editingId
            ? { ...post, ...formData, updatedAt: new Date().toISOString() }
            : post
        ));
      } else {
        const newPost = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setPosts([newPost, ...posts]);
      }
      resetForm();
      return;
    }

    const payload = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      date: formData.date,
      images: formData.images,
    };

    if (editingId) {
      const { data, error } = await supabase
        .from('posts')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', editingId)
        .select()
        .single();

      if (!error && data) {
        setPosts(posts.map(post => post.id === editingId ? {
          id: data.id, title: data.title, content: data.content,
          date: data.date, images: data.images || [],
          createdAt: data.created_at, updatedAt: data.updated_at,
        } : post));
      }
    } else {
      const { data, error } = await supabase
        .from('posts')
        .insert([{ ...payload, id: crypto.randomUUID() }])
        .select()
        .single();

      if (!error && data) {
        setPosts([{
          id: data.id, title: data.title, content: data.content,
          date: data.date, images: data.images || [],
          createdAt: data.created_at, updatedAt: data.updated_at,
        }, ...posts]);
      }
    }
    resetForm();
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      content: post.content,
      date: post.date,
      images: post.images || [],
    });
    setPreviewImages(post.images || []);
    setIsWriting(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus momen ini?')) return;

    if (!supabase) {
      setPosts(posts.filter(post => post.id !== id));
      return;
    }

    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (!error) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', date: new Date().toISOString().split('T')[0], images: [] });
    setPreviewImages([]);
    setIsWriting(false);
    setEditingId(null);
  };

  const cancelWrite = () => {
    resetForm();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  return (
    <section className="blog-page">
      <div className="blog-top-bar">
        <Link to="/" className="blog-home-btn">
          <BiHomeAlt />
          <span>Home</span>
        </Link>

        {!supabase ? (
          !isWriting && (
            <button className="blog-add-btn" onClick={() => setIsWriting(true)}>
              <BiPlus />
              <span>Tulis Momen</span>
            </button>
          )
        ) : user ? (
          isAuthorized ? (
            !isWriting && (
              <button className="blog-add-btn" onClick={() => setIsWriting(true)}>
                <BiPlus />
                <span>Tulis Momen</span>
              </button>
            )
          ) : (
            <span className="blog-auth-badge">
              <BiLock /> Viewer Mode
            </span>
          )
        ) : (
          <button className="blog-add-btn" onClick={() => setShowLogin(true)}>
            <BiLock />
            <span>Login</span>
          </button>
        )}
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="blog-modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="blog-modal" onClick={e => e.stopPropagation()}>
            <div className="blog-modal__header">
              <h2>Login</h2>
              <button onClick={() => setShowLogin(false)}><BiX /></button>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="email@kamu.com"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              {loginError && <p className="blog-login-error">{loginError}</p>}
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowLogin(false)}>Batal</button>
                <button type="submit" className="btn-submit" disabled={loginLoading}>
                  {loginLoading ? 'Logging in...' : 'Login'}
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
          {isAuthorized ? <span className="blog-auth-badge authorized">Authorized</span> : <span className="blog-auth-badge viewer">Viewer</span>}
          <button onClick={handleLogout} className="blog-logout-btn">Logout</button>
        </div>
      )}

      <div className="blog-header">
        <span className="blog-eyebrow">✦ Cerita Keluarga ✦</span>
        <h1 className="blog-title">Blog Keluarga</h1>
        <p className="blog-subtitle">Momen dan cerita bersama Zema</p>
      </div>

      {/* Write/Edit Form */}
      {isWriting && isAuthorized && (
        <div className="blog-write-form">
          <div className="blog-write-form__header">
            <h2>{editingId ? 'Edit Momen' : 'Tulis Momen Baru'}</h2>
            <button className="blog-close-btn" onClick={cancelWrite}><BiX /></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tanggal</label>
              <input type="date" value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Judul</label>
              <input type="text" placeholder="Judul momen..." value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Cerita</label>
              <textarea placeholder="Ceritakan momennya..." rows={6} value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Foto</label>
              <div className="image-upload-area">
                <label className="image-upload-btn">
                  <BiImage /><span>Tambah Foto</span>
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} hidden />
                </label>
                {previewImages.length > 0 && (
                  <div className="image-previews">
                    {previewImages.map((img, index) => (
                      <div key={index} className="image-preview-item">
                        <img src={img} alt={`Preview ${index + 1}`} />
                        <button type="button" className="image-remove-btn" onClick={() => removeImage(index)}>
                          <BiTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={cancelWrite}>Batal</button>
              <button type="submit" className="btn-submit">
                <BiCloudUpload />
                {editingId ? 'Simpan Perubahan' : 'Publikasikan'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts List */}
      <div className="blog-posts">
        {isLoading ? (
          <div className="blog-loading"><p>Memuat cerita...</p></div>
        ) : posts.length === 0 && !isWriting ? (
          <div className="blog-empty">
            <span className="blog-empty__emoji">📝</span>
            <p>Belum ada cerita.</p>
            <p>Klik "Tulis Momen" untuk menambahkan cerita pertama!</p>
          </div>
        ) : (
          posts.map((post) => (
            <article key={post.id} className="blog-post">
              <div className="blog-post__header">
                <span className="blog-post__date">{formatDate(post.date)}</span>
                {isAuthorized && (
                  <div className="blog-post__actions">
                    <button onClick={() => handleEdit(post)} title="Edit"><BiEdit /></button>
                    <button onClick={() => handleDelete(post.id)} title="Hapus"><BiTrash /></button>
                  </div>
                )}
              </div>
              <h2 className="blog-post__title">{post.title}</h2>
              {post.images && post.images.length > 0 && (
                <div className={`blog-post__images ${post.images.length === 1 ? 'single' : ''}`}>
                  {post.images.map((img, index) => (
                    <div key={index} className="blog-post__image-wrapper">
                      <img src={img} alt={`${post.title} - ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}
              <p className="blog-post__content">{post.content}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default Blog;
