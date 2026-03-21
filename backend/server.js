import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:3000',
  'http://localhost:5173',
];

// Data directory
const dataDir = join(__dirname, 'data');
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const DATA_FILE = join(dataDir, 'posts.json');
const TIMELINE_FILE = join(dataDir, 'timeline.json');

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '50mb' }));

// Helper to read posts
const readPosts = () => {
  if (!existsSync(DATA_FILE)) {
    return [];
  }
  try {
    const data = readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading posts:', e);
    return [];
  }
};

// Helper to write posts
const writePosts = (posts) => {
  try {
    writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
    return true;
  } catch (e) {
    console.error('Error writing posts:', e);
    return false;
  }
};

// ============ BLOG POSTS API ============

// GET all posts
app.get('/api/posts', (req, res) => {
  try {
    const posts = readPosts();
    // Sort by date descending, then by createdAt descending
    posts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateB - dateA !== 0) return dateB - dateA;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    res.json(posts);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET single post
app.get('/api/posts/:id', (req, res) => {
  try {
    const posts = readPosts();
    const post = posts.find(p => p.id === req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// POST create new post
app.post('/api/posts', (req, res) => {
  try {
    const { title, content, date, images } = req.body;

    if (!title || !content || !date) {
      return res.status(400).json({ error: 'Title, content, and date are required' });
    }

    const newPost = {
      id: uuidv4(),
      title: title.trim(),
      content: content.trim(),
      date,
      images: images || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const posts = readPosts();
    posts.unshift(newPost);
    writePosts(posts);

    res.status(201).json(newPost);
  } catch (e) {
    console.error('Error creating post:', e);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// PUT update post
app.put('/api/posts/:id', (req, res) => {
  try {
    const { title, content, date, images } = req.body;
    const posts = readPosts();
    const index = posts.findIndex(p => p.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const updatedPost = {
      ...posts[index],
      title: title?.trim() || posts[index].title,
      content: content?.trim() || posts[index].content,
      date: date || posts[index].date,
      images: images || posts[index].images,
      updatedAt: new Date().toISOString(),
    };

    posts[index] = updatedPost;
    writePosts(posts);

    res.json(updatedPost);
  } catch (e) {
    console.error('Error updating post:', e);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// DELETE post
app.delete('/api/posts/:id', (req, res) => {
  try {
    const posts = readPosts();
    const index = posts.findIndex(p => p.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }

    posts.splice(index, 1);
    writePosts(posts);

    res.json({ success: true });
  } catch (e) {
    console.error('Error deleting post:', e);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// ============ TIMELINE API ============

const readTimeline = () => {
  if (!existsSync(TIMELINE_FILE)) {
    return [
      { id: 1, age: '6 Bulan', storageKey: '6bulan' },
      { id: 2, age: '1 Tahun', storageKey: '1tahun' },
      { id: 3, age: '1.5 Tahun', storageKey: '1_5tahun' },
      { id: 4, age: '2 Tahun', storageKey: '2tahun' },
      { id: 5, age: '2.5 Tahun', storageKey: '2_5tahun' },
      { id: 6, age: '3 Tahun', storageKey: '3tahun' },
      { id: 7, age: '3.5 Tahun', storageKey: '3_5tahun' },
      { id: 8, age: '4 Tahun', storageKey: '4tahun' },
      { id: 9, age: '4.5 Tahun', storageKey: '4_5tahun' },
      { id: 10, age: '5 Tahun', storageKey: '5tahun' },
    ];
  }
  try {
    return JSON.parse(readFileSync(TIMELINE_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
};

const writeTimeline = (timeline) => {
  try {
    writeFileSync(TIMELINE_FILE, JSON.stringify(timeline, null, 2));
    return true;
  } catch (e) {
    console.error('Error writing timeline:', e);
    return false;
  }
};

// GET all timeline entries
app.get('/api/timeline', (req, res) => {
  try {
    const timeline = readTimeline();
    res.json(timeline);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch timeline' });
  }
});

// PUT update timeline image (base64)
app.put('/api/timeline/:storageKey', (req, res) => {
  try {
    const { image } = req.body;
    const timeline = readTimeline();
    const entry = timeline.find(t => t.storageKey === req.params.storageKey);

    if (!entry) {
      return res.status(404).json({ error: 'Timeline entry not found' });
    }

    entry.image = image;
    entry.updatedAt = new Date().toISOString();
    writeTimeline(timeline);

    res.json(entry);
  } catch (e) {
    console.error('Error updating timeline:', e);
    res.status(500).json({ error: 'Failed to update timeline' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Zema API server running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  GET    /api/posts       - Get all blog posts`);
  console.log(`  GET    /api/posts/:id   - Get single post`);
  console.log(`  POST   /api/posts       - Create post`);
  console.log(`  PUT    /api/posts/:id   - Update post`);
  console.log(`  DELETE /api/posts/:id   - Delete post`);
  console.log(`  GET    /api/timeline    - Get timeline`);
  console.log(`  PUT    /api/timeline/:storageKey - Update timeline image`);
});
