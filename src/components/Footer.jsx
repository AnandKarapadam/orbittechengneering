import React from "react";
import { FiMail } from "react-icons/fi";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-social">
          <a
            href="mailto:info@orbittechengineering.com"
            aria-label="Email"
          >
            <FiMail size={20} />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
          >
            <FaXTwitter size={20} />
          </a>
        </div>

        <p className="footer-copyright">
          © {new Date().getFullYear()} OrbitTech Engineering. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}