import React, { useState } from "react";
import { toast } from "react-toastify";
import "../styles/contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please correct the highlighted fields");
      return;
    }

    setErrors({});

    try {
      // API call here later

      toast.success(
        "Message sent successfully. We'll contact you soon."
      );

      setForm({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (err) {
      toast.error(
        "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-header">
        <p className="contact-eyebrow">Get In Touch</p>
        <h2>Contact Us</h2>
      </div>

      <div className="contact-grid">

        {/* Map */}
        <div className="contact-map">
          <iframe
            title="OrbitTech Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3215.544085084225!2d76.25151287406958!3d11.659175388548386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba60faccac7b1c9%3A0x3567e0cee7e85468!2sOrbit%20Tech%20Engineering!5e1!3m2!1sen!2sin!4v1781283557857!5m2!1sen!2sin"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Form */}
        <div className="contact-form-wrap">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
              {errors.name && (
                <span className="error">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
              {errors.phone && (
                <span className="error">{errors.phone}</span>
              )}
            </div>

            <div className="form-group">
              <label>Email (Optional)</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
              {errors.email && (
                <span className="error">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea
                rows="5"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />
              {errors.message && (
                <span className="error">{errors.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="contact-submit-btn"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}