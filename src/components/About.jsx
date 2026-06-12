// src/components/About.jsx
import React, {useState} from "react";
import "../styles/about.css";

const stats = [
  { number: "10+", label: "Years Experience" },
  { number: "15+", label: "Skilled Employees" },
  { number: "50+", label: "Projects Completed" },
  { number: "100%", label: "Quality Focus" },
];

export default function About() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="about" id="about">
      <div className="about-header">
        <p className="about-eyebrow">Who We Are</p>
        <h2>Building Trust Through Quality Engineering</h2>
      </div>

      <div className="about-content">
        <div className={`about-text-wrapper ${expanded ? "expanded" : ""}`}>
          <p className="about-description">
            Since 2015, OrbitTech Engineering has been delivering reliable
            electrical, plumbing, waterproofing, glass installation,
            contracting, and maintenance solutions across Wayanad,
            Karnataka, and South India. Our reputation is built on quality
            workmanship, fair pricing, durable solutions, and customer
            satisfaction.
          </p>

          <p className="about-description">
            With a highly trained team of professionals and experience
            working on major industrial and commercial projects, we ensure
            every project is completed with precision, safety, and long-term
            performance in mind. We stand behind our work with
            warranty-backed services and a strong commitment to excellence.
          </p>
        </div>

        <button
          className="about-readmore"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Read Less ▲" : "Read More ▼"}
        </button>
      </div>

      <div className="about-stats">
        {stats.map((item) => (
          <div className="stat-card" key={item.label}>
            <h3>{item.number}</h3>
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      <div className="about-features">
        <div className="feature-card">✓ Electrical Works</div>
        <div className="feature-card">✓ Plumbing Solutions</div>
        <div className="feature-card">✓ Waterproofing Services</div>
        <div className="feature-card">✓ Glass Installation</div>
        <div className="feature-card">✓ Industrial Experience</div>
        <div className="feature-card">✓ Warranty Support</div>
        <div className="feature-card">✓ Customer Friendly Team</div>
        <div className="feature-card">✓ Fair & Transparent Pricing</div>
      </div>
    </section>
  );
}