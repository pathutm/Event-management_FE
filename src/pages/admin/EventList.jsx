import React, { useEffect, useState } from "react";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events");
      const data = await res.json();
      console.log({ data });
      // Assuming your API returns an array of events directly
      setEvents(data || []);
    } catch (err) {
      console.error("Failed to load events:", err);
    }
  };

  return (
    <div
      style={{ fontFamily: "Segoe UI, sans-serif", backgroundColor: "#f9f9f9" }}
    >
      {/* Navbar */}
      <header style={styles.header}>
        <h1 style={styles.logo}>
          <span style={{ color: "#000" }}>Event</span>
          <span style={{ color: "#7c3aed" }}>Hive</span>
        </h1>
        <div>
          {user ? (
            user.role === "admin" ? (
              <button
                style={styles.createBtn}
                onClick={() =>
                  window.open(
                    "http://localhost:5173/admin/create-event",
                    "_self"
                  )
                }
              >
                Create Event
              </button>
            ) : null
          ) : (
            <>
              <a href="/login" style={styles.login}>
                Login
              </a>
              <button style={styles.signup}>Sign up</button>
            </>
          )}
        </div>
      </header>

      {/* Hero */}
      <section
        style={{ position: "relative", color: "#fff", textAlign: "center" }}
      >
        <img
          src="https://images.unsplash.com/photo-1503424886306-4cc4f3f1d9bf"
          alt="hero"
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
        <div style={styles.overlay}></div>
        <h2 style={styles.heroText}>MADE FOR THOSE WHO DO</h2>

        {/* Filters */}
        <div style={styles.filtersContainer}>
          <select style={styles.dropdown}>
            <option>Choose category</option>
          </select>
          <select style={styles.dropdown}>
            <option>Choose location</option>
          </select>
          <select style={styles.dropdown}>
            <option>Choose date</option>
          </select>
          <button style={styles.searchBtn}>Search</button>
        </div>
      </section>

      {/* Event Grid */}
      <main style={{ marginTop: "4rem", padding: "2rem 4rem" }}>
        <h2 style={styles.sectionTitle}>
          Upcoming <span style={{ color: "#7c3aed" }}>Events</span>
        </h2>

        <div style={styles.eventFilters}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <select style={styles.filterDropdown}>
              <option>All Venues</option>
            </select>
            <select style={styles.filterDropdown}>
              <option>Event Type</option>
            </select>
          </div>
          <input type="text" placeholder="Search" style={styles.searchInput} />
        </div>

        {/* Events */}
        <div style={styles.eventGrid}>
          {events.length > 0 ? (
            events.map((event, i) => (
              <div key={i} style={styles.eventCard}>
                <img
                  src={
                    event.imageBase64
                      ? `data:image/jpeg;base64,${event.imageBase64}`
                      : `https://source.unsplash.com/random/400x200?event,concert,stage&sig=${i}`
                  }
                  alt="event"
                  style={styles.eventImage}
                />
                <div style={{ padding: "1rem" }}>
                  <h3 style={{ fontWeight: "600" }}>{event.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "#666" }}>
                    {event.location} | {event.time}
                  </p>
                  <button style={styles.bookNowBtn}>Book Now</button>
                </div>
              </div>
            ))
          ) : (
            <p>No events available.</p>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button style={styles.loadMoreBtn}>Load More</button>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: "600" }}>
          Event <span style={{ color: "#7c3aed" }}>Hive</span>
        </h2>
        <div style={{ margin: "1rem 0" }}>
          <input
            type="email"
            placeholder="Enter your email"
            style={styles.emailInput}
          />
          <button style={styles.subscribeBtn}>Subscribe</button>
        </div>
        <p style={{ fontSize: "0.85rem", color: "#aaa" }}>
          © 2025 EventHive. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5rem 3rem",
    backgroundColor: "#fff",
    borderBottom: "1px solid #eee",
  },
  logo: { fontSize: "1.5rem", fontWeight: "600" },
  login: {
    marginRight: "1rem",
    fontWeight: "500",
    textDecoration: "none",
    color: "#444",
  },
  signup: {
    backgroundColor: "#7c3aed",
    color: "#fff",
    padding: "0.5rem 1.2rem",
    borderRadius: "8px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
  },
  createBtn: {
    backgroundColor: "#10b981",
    color: "#fff",
    padding: "0.5rem 1.2rem",
    borderRadius: "8px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
  },
  heroText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "2.5rem",
    fontWeight: "700",
  },
  filtersContainer: {
    position: "absolute",
    bottom: "-25px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "1rem",
    backgroundColor: "#2e1065",
    padding: "1rem",
    borderRadius: "10px",
  },
  dropdown: {
    padding: "0.6rem 1rem",
    borderRadius: "6px",
    border: "none",
    outline: "none",
  },
  searchBtn: {
    backgroundColor: "#7c3aed",
    color: "white",
    padding: "0.6rem 1.2rem",
    borderRadius: "6px",
    border: "none",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1.5rem",
  },
  eventFilters: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  filterDropdown: {
    padding: "0.4rem 1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  searchInput: {
    padding: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  eventGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },
  eventImage: {
    width: "100%",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    height: "180px",
    objectFit: "cover",
  },
  bookNowBtn: {
    backgroundColor: "#7c3aed",
    color: "#fff",
    padding: "0.6rem 1rem",
    borderRadius: "6px",
    border: "none",
    fontWeight: "600",
    marginTop: "0.5rem",
  },
  loadMoreBtn: {
    padding: "0.6rem 1.5rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#7c3aed",
    color: "#fff",
    fontWeight: "600",
  },
  footer: {
    backgroundColor: "#1e1e2f",
    color: "#fff",
    padding: "3rem 2rem",
    marginTop: "4rem",
    textAlign: "center",
  },
  emailInput: {
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "none",
    marginRight: "0.5rem",
  },
  subscribeBtn: {
    padding: "0.5rem 1.2rem",
    backgroundColor: "#7c3aed",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontWeight: "600",
  },
};

export default EventPage;
