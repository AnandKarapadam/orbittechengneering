import React, { useState } from "react";
import "../styles/careers.css";

export default function Careers() {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    resume: null,
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Candidate name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.resume) {
      newErrors.resume = "Resume is required";
    } else if (formData.resume.type !== "application/pdf") {
      newErrors.resume = "Only PDF files are allowed";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSuccess("Profile submitted successfully!");

    console.log(formData);

    setTimeout(() => {
      setShowModal(false);
      setSuccess("");
      setFormData({
        name: "",
        phone: "",
        resume: null,
        message: "",
      });
    }, 1500);
  };

  return (
    <section id="careers" className="careers">
      <div className="careers-container">
        <p className="careers-eyebrow">Join Our Team</p>

        <h2>Careers</h2>

        <div className="career-notice">
          <h3>Explore Career Opportunities</h3>

          <p>
            We are always interested in connecting with talented and motivated
            professionals. While available positions may vary over time, we
            welcome applications from individuals who would like to be
            considered for current or future opportunities.
          </p>

          <p>
            Share your profile with us, and we'll contact you when a suitable opportunity arises.
          </p>

          <button className="career-btn" onClick={() => setShowModal(true)}>
            Submit Your Profile
          </button>
        </div>
      </div>

      {showModal && (
        <div className="career-modal-overlay">
          <div className="career-modal">
            <button
              className="career-close-btn"
              onClick={() => {
                setShowModal(false);
                setErrors({});
              }}
            >
              ×
            </button>

            <h3>Submit Your Profile</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Candidate Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>Resume (PDF)(Optional) *</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      resume: e.target.files[0],
                    })
                  }
                />
                {errors.resume && (
                  <span className="error">{errors.resume}</span>
                )}
              </div>

              <div className="form-group">
                <label>Additional Information (Optional)</label>
                <textarea
                  rows="4"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                />
              </div>

              {success && <p className="success-message">{success}</p>}

              <button type="submit" className="submit-btn">
                Submit Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
