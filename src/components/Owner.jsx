import React from "react";
import { User, Mail, Phone } from "lucide-react";
import "../styles/owner.css";

export default function Owner() {
  const phoneNumber = "+91 9400579445";

  const handlePhoneClick = () => {
    const isMobile =
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      navigator.clipboard.writeText(phoneNumber);
      alert("Phone number copied to clipboard");
    }
  };

  return (
    <section id="founder" className="owner">
      <h2 className="owner-title">Connect With Us</h2>

      <div className="owner-card">
        <div className="owner-avatar">
          <User size={60} strokeWidth={1.8} />
        </div>

        <h3>ANU PRASAD</h3>

        <p className="owner-text">
          Feel free to connect with us for project inquiries, partnerships, or
          business opportunities.
        </p>

        <div className="owner-contact">
          <a href="mailto:info@orbittechengineering.com" className="owner-link">
            <Mail size={18} />
            info@orbittechengineering.com
          </a>

          <button
            type="button"
            className="owner-phone-btn"
            onClick={handlePhoneClick}
          >
            <Phone size={18} />
            {phoneNumber}
          </button>
        </div>
      </div>
    </section>
  );
}