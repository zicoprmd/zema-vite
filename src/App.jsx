import { React } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Nav/Navbar';
import Banner from './components/Banner/Banner';
import Article1 from './components/Article/Article1';
import Article2 from './components/Article/Article2';
import Horizontal from './components/Horizontal/Horizontal';
import Paralax from './components/Paralax/Paralax';
import Newsletter from './components/Newsletter/Newsletter';
import Reserved from './components/Reserved/Reserved';
import Timeline from './pages/Timeline';
import Blog from './pages/Blog';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <section className="App">
          <Navbar />
          <Banner />
          <Article1 />
          <Paralax />
          <Article2 />
          <Horizontal />
          <Newsletter />
          <Reserved />
        </section>
      } />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
}

export default App;
