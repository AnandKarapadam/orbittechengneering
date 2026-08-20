// src/App.jsx
import React, { useEffect, useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Careers from "./components/Careers";
import About from "./components/About";
import ContactForm from "./components/ContactForm";
import OrbitBackground from "./components/OrbitBackground";
import Preloader from "./components/Preloader";
import "./App.css";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Owner from "./components/Owner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleProgress = useCallback((val) => {
    setProgress((prev) => Math.max(prev, val));
  }, []);

  const handleLoaded = useCallback(() => {
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
      ScrollTrigger.refresh();
    }, 300);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-fade]").forEach((el) => {
        const target = el.firstElementChild || el;

        gsap.fromTo(
          target,
          {
            autoAlpha: 0,
            y: 10,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div className="app">
      <Preloader progress={progress} isLoading={isLoading} />
      <div style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.5s ease" }}>
        <OrbitBackground />
        <Navbar />

        <main className="page-content">
          <div data-fade>
            <Hero onProgress={handleProgress} onLoaded={handleLoaded} />
          </div>
          <div data-fade>
            <Services />
          </div>
          <div data-fade>
            <About />
          </div>
          <div data-fade>
            <Owner />
          </div>
          <div data-fade>
            <Careers />
          </div>
          <div data-fade>
            <ContactForm />
          </div>
          
        </main>
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        <Footer/>
      </div>
    </div>
  );
}

export default App;
