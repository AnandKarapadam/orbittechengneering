// src/components/Employee.jsx
import React from "react";

export default function Employee() {
  const team = [
    { name: "Ravi Patel", role: "Lead Engineer", img: "https://source.unsplash.com/200x200/?engineer" },
    { name: "Sara Lee", role: "UI/UX Designer", img: "https://source.unsplash.com/200x200/?designer" },
    { name: "Mohit Kumar", role: "Full‑Stack Developer", img: "https://source.unsplash.com/200x200/?developer" }
  ];

  return (
    <section className="employee" style={{ textAlign: "center", padding: "2rem 0" }}>
      <h2>Our Team</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
        {team.map((member, i) => (
          <div key={i} style={{ maxWidth: "200px" }}>
            <img
              src={member.img}
              alt={member.name}
              style={{ width: "100%", borderRadius: "8px", marginBottom: "0.5rem" }}
            />
            <h3 style={{ margin: "0.25rem 0" }}>{member.name}</h3>
            <p style={{ margin: 0, color: "var(--color-muted)" }}>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
