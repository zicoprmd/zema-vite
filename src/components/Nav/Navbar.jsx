import { React, useState } from 'react';
import { Link } from 'react-router-dom';
//scss
import './Navbar.scss';
//react-icons
import {
  BiHomeAlt,
  BiSolidUser,
  BiBookOpen,
  BiPlusMedical,
  BiMessageDetail,
  BiTime,
  BiMenu,
  BiX,
  BiBookHeart,
} from 'react-icons/bi';
//hooks
import useDragger from '../../hooks/useDragger';

const Navbar = () => {
  const [activeNav, setActiveNav] = useState('#');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useDragger('theNav');

  const navItems = [
    { href: '#banner', icon: <BiHomeAlt />, label: 'Home', key: 'home' },
    { href: '#zema1', icon: <BiSolidUser />, label: 'About', key: 'about' },
    { href: '#services', icon: <BiPlusMedical />, label: 'Gallery', key: 'services' },
    { href: '#newsletter', icon: <BiMessageDetail />, label: 'Contact', key: 'contact' },
  ];

  const handleNavClick = (key) => {
    setActiveNav(`#${key}`);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav id="theNav" className={`navbar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      {/* Desktop items - shown on desktop */}
      <div className="nav-items desktop-items">
        {navItems.map((item) => (
          <a
            key={item.key}
            href={item.href}
            onClick={() => handleNavClick(item.key)}
            className={activeNav === `#${item.key}` ? 'active' : ''}>
            {item.icon}
          </a>
        ))}
        <Link
          to="/timeline"
          className="timeline-link">
          <BiTime />
        </Link>
        <Link
          to="/blog"
          className="blog-link">
          <BiBookHeart />
        </Link>
      </div>

      {/* Mobile single button */}
      <div className="mobile-trigger">
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <BiX /> : <BiMenu />}
        </button>

        {/* Mobile popup - only shown when open */}
        {isMobileMenuOpen && (
          <div className="mobile-popup" onClick={(e) => e.stopPropagation()}>
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => handleNavClick(item.key)}
                className={`mobile-popup__item ${activeNav === `#${item.key}` ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
            <Link
              to="/timeline"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-popup__item timeline-link">
              <BiTime />
              <span>Timeline</span>
            </Link>
            <Link
              to="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-popup__item blog-link">
              <BiBookHeart />
              <span>Blog</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
