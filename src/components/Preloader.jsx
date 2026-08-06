// src/components/Preloader.jsx
import React, { useEffect, useState } from "react";
import "../styles/preloader.css";

export default function Preloader({ progress = 0, isLoading = true }) {
  const [shouldRender, setShouldRender] = useState(true);
  const formattedProgress = Math.min(100, Math.max(0, Math.round(progress)));

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 700); // match transition duration
      return () => clearTimeout(timer);
    } else {
      setShouldRender(true);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`preloader-overlay ${!isLoading ? "fade-out" : ""}`}
      aria-hidden={!isLoading}
    >
      <div className="preloader-content">
        <div className="preloader-progress-box">
          <div className="preloader-bar-track">
            <div
              className="preloader-bar-fill"
              style={{ width: `${formattedProgress}%` }}
            />
          </div>
          <div className="preloader-info">
            <span className="preloader-status">Loading Assets...</span>
            <span className="preloader-percentage">{formattedProgress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
