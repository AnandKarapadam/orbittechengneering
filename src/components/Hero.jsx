// src/components/Hero.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import HeroModel from "./HeroModel";
import "../styles/hero.css";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }
    );
  }, []);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero-content">
        <p className="hero-eyebrow">
          Electricals • Plumbing • Contracting • Maintenance
        </p>

        <h1>OrbitTech Engineering</h1>

        <p className="hero-description">
          Delivering trusted engineering, maintenance, and waterproofing
          solutions with years of hands-on experience, skilled workmanship, and
          a commitment to long-lasting quality.
        </p>

        <div className="hero-highlights">
          <span>Professional Waterproofing</span>
          <span>Reliable MEP Services</span>
          <span>Experienced Contracting Team</span>
        </div>

        <div className="hero-actions">
          <a href="#contact" className="hero-button hero-button-primary">
            Request a Consultation
          </a>
          <a href="#services" className="hero-button hero-button-secondary">
            Explore Services
          </a>
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="hero-glow"></div>
        <HeroModel />
      </div>
    </section>
  );
}