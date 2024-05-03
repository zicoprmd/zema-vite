import { useState } from 'react';
//scss
import './App.scss';
//import components
import Banner from './components/Banner/Banner';
import Article1 from './components/Article/Article1';
import Article2 from './components/Article/Article2';
import Horizontal from './components/Horizontal/Horizontal';
import Paralax from './components/Paralax/Paralax';
import Newsletter from './components/Newsletter/Newsletter';
import Reserved from './components/Reserved/Reserved';

function App() {
  const [count, setCount] = useState(0);

  return (
    <section className="App">
      <Banner />
      <Article1 />
      <Paralax />
      <Article2 />
      <Horizontal />
      <Newsletter />
      <Reserved />
    </section>
  );
}

export default App;
