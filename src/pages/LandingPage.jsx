import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.logo}>Event<span style={{ color: '#7c3aed' }}>Hive</span></h1>
        <nav>
          <Link to="/login" style={styles.navBtn}>Login</Link>
          <Link to="/signup" style={{ ...styles.navBtn, ...styles.signupBtn }}>Sign Up</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <h2 style={styles.heroTitle}>Smart Event Management for a Seamless Experience</h2>
          <p style={styles.heroText}>Empowering admins and users to create, discover, and manage events effortlessly with AI-powered tools and secure access.</p>
          <div>
            <Link to="/signup" style={styles.cta}>Get Started</Link>
            <Link to="/login" style={styles.learnMore}>Learn More</Link>
          </div>
        </div>
        <div>
          <img src="https://source.unsplash.com/400x280/?event,people" alt="Event sample" style={styles.heroImage} />
        </div>
      </section>

      {/* Feature Overview */}
      <section style={styles.features}>
        <h3 style={styles.featureHeader}>Platform Features & User Stories</h3>
        <div style={styles.cardGrid}>
          <div style={{ ...styles.card, ...styles.gradient1 }}>
            <h4>Admin - Register</h4>
            <p>Name (alphabetic), unique Email, inline validation, redirect with token.</p>
          </div>
          <div style={{ ...styles.card, ...styles.gradient2 }}>
            <h4>Admin - Create Events</h4>
            <p>Event info, image upload, date/time checks, AI-generated description.</p>
          </div>
          <div style={{ ...styles.card, ...styles.gradient3 }}>
            <h4>User - Sign Up/Login</h4>
            <p>Secure password, confirm match, valid email, inline error handling.</p>
          </div>
          <div style={{ ...styles.card, ...styles.gradient4 }}>
            <h4>User - Home Page</h4>
            <p>Browse by filters (type, date, location), dynamic updates, fallback states.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={{ color: "#bbb" }}>© 2025 EventHive. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f9fafb",
    color: "#111827",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  header: {
    backgroundColor: "#fff",
    padding: "1rem 2rem",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    fontSize: "1.8rem",
    fontWeight: "bold"
  },
  navBtn: {
    marginLeft: "1rem",
    textDecoration: "none",
    fontWeight: 500,
    color: "#4b5563"
  },
  signupBtn: {
    backgroundColor: "#7c3aed",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "6px"
  },
  hero: {
    display: "flex",
    justifyContent: "space-between",
    padding: "3rem 2rem",
    alignItems: "center",
    backgroundColor: "#ede9fe"
  },
  heroLeft: {
    flex: 1,
    marginRight: "2rem"
  },
  heroTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1rem"
  },
  heroText: {
    fontSize: "1rem",
    color: "#4b5563",
    marginBottom: "1.5rem"
  },
  cta: {
    backgroundColor: "#7c3aed",
    color: "#fff",
    padding: "0.75rem 1.25rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    marginRight: "1rem"
  },
  learnMore: {
    color: "#4b5563",
    textDecoration: "underline",
    fontWeight: "500"
  },
  heroImage: {
    width: "400px",
    height: "auto",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
  },
  features: {
    padding: "3rem 2rem",
    backgroundColor: "#fff",
    flex: 1
  },
  featureHeader: {
    textAlign: "center",
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "2rem"
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem"
  },
  card: {
    padding: "1.5rem",
    borderRadius: "10px",
    color: "#111827",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    fontSize: "0.95rem"
  },
  gradient1: {
    background: "linear-gradient(to right, #d8b4fe, #c084fc)"
  },
  gradient2: {
    background: "linear-gradient(to right, #bfdbfe, #93c5fd)"
  },
  gradient3: {
    background: "linear-gradient(to right, #fcd34d, #fbbf24)"
  },
  gradient4: {
    background: "linear-gradient(to right, #a7f3d0, #6ee7b7)"
  },
  footer: {
    padding: "1rem",
    textAlign: "center",
    backgroundColor: "#111827"
  }
};

export default LandingPage;
