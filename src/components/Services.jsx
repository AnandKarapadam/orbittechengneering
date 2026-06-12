// src/components/Services.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  Bolt,
  Droplets,
  Wrench,
  ShieldCheck,
  Factory,
  Building2,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "../styles/services.css";

const projectImages = [
  "/projects/project-1.jpg",
  "/projects/project-2.jpg",
  "/projects/project-3.jpg",
  "/projects/project-4.jpg",
];

const services = [
  {
    icon: Bolt,
    title: "Electrical Works",
    description:
      "Reliable electrical installation, maintenance, wiring, and support for residential, commercial, and industrial requirements.",
  },
  {
    icon: Droplets,
    title: "Plumbing Solutions",
    description:
      "Professional plumbing services with careful planning, durable fittings, and clean execution for long-term performance.",
  },
  {
    icon: Wrench,
    title: "Contracting & Maintenance",
    description:
      "End-to-end contracting and maintenance support handled by an experienced team with a strong focus on quality.",
  },
  {
    icon: ShieldCheck,
    title: "Waterproofing",
    description:
      "Specialized waterproofing solutions designed to protect structures from leakage, dampness, and long-term damage.",
  },
];

export default function Services() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projectImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % projectImages.length);
    }

    if (isRightSwipe) {
      setCurrentSlide(
        (prev) => (prev - 1 + projectImages.length) % projectImages.length,
      );
    }
  };
  return (
    <section id="services" className="services">
      <div className="services-title-wrap">
        <p className="services-eyebrow">What We Do</p>
        <h2 className="services-main-title">Our Services</h2>
      </div>

      <div className="services-content">
        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article className="service-card" key={service.title}>
                <div className="service-icon">
                  <Icon size={24} strokeWidth={2.2} />
                </div>

                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="services-note">
          <Factory size={18} />
          <span>
            Experienced in industrial projects and complex site requirements.
          </span>
        </div>
      </div>

      <div className="services-gallery">
        <div className="services-slider-header">
          <Building2 size={20} />
          <span>Project Gallery</span>
        </div>

        <div
          className="custom-slider"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="custom-slider-track"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {projectImages.map((src, index) => (
              <div className="custom-slide" key={index}>
                <img src={src} alt={`Project ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="slider-dots">
            {projectImages.map((_, index) => (
              <button
                key={index}
                className={`dot ${currentSlide === index ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
