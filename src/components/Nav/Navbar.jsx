import { React, useState } from 'react';
//scss
import './Navbar.scss';
//react-icons
import {
  BiHomeAlt,
  BiSolidUser,
  BiBookOpen,
  BiPlusMedical,
  BiMessageDetail,
} from 'react-icons/bi';
//hooks
import useDragger from '../../hooks/useDragger';

const Navbar = () => {
  const [activeNav, setActiveNav] = useState('#');
  /*  const [shrink, setShrink] = useState({ display: 'inline' });

  const changeShrink = () => {
    setShrink({ display: 'none' });
  };

  const resetShrink = () => {
    setShrink({ display: 'inline' });
  };
 */
  useDragger('theNav');

  return (
    <nav id="theNav">
      <a
        href="#banner"
        onClick={() => setActiveNav('#home')}
        className={activeNav === '#home' ? 'active' : ''}>
        <BiHomeAlt />
      </a>
      <a
        href="#zema1"
        onClick={() => setActiveNav('#about')}
        className={activeNav === '#about' ? 'user active' : 'user'}>
        <BiSolidUser />
      </a>
      <a
        href="#zema2"
        onClick={() => setActiveNav('#experience')}
        className={activeNav === '#experience' ? 'book active' : 'book'}>
        <BiBookOpen />
      </a>
      <a
        href="#zema10"
        onClick={() => setActiveNav('#services')}
        className={activeNav === '#services' ? 'plus active' : 'plus'}>
        <BiPlusMedical />
      </a>
      <a
        /* style={shrink}
        onMouseDown={changeShrink}
        onMouseUp={resetShrink} */
        href="#newsletter"
        onClick={() => setActiveNav('#contact')}
        className={activeNav === '#contact' ? 'message active' : 'message'}>
        <BiMessageDetail />
      </a>
    </nav>
  );
};

export default Navbar;
