// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
import navbarBrandTransparent from "/orbittech_navbaricon_transparent.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <a href="#hero" className="navbar-brand" onClick={closeMenu}>
        <img src={navbarBrandTransparent} alt="OrbitTech Engineering" className="navbar-logo" />
        <img
  src="/brand_text.png"
  alt="OrbitTech Engineering"
  className="navbar-brand-text"
/>
        {/* <span className="navbar-title">ORBITTECH ENGINEERING</span> */}
      </a>

      <button
        className={`navbar-toggler ${open ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`navbar-menu ${open ? "open" : ""}`}>
        <li><a href="#hero" onClick={closeMenu}>Home</a></li>
        <li><a href="#services" onClick={closeMenu}>Services</a></li>
        <li><a href="#about" onClick={closeMenu}>About Us</a></li>
        <li><a href="#founder" onClick={closeMenu}>Founder</a></li>
        <li><a href="#careers" onClick={closeMenu}>Careers</a></li>
        <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
      </ul>
    </nav>
  );
}