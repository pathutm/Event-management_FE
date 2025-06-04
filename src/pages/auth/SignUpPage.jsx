import React, { useState } from 'react';

const SignUpPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
      } else {
        setSuccessMsg('Registered successfully! Redirecting to login...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.overlay}>
          <h2 style={styles.leftTitle}>Welcome!</h2>
          <p style={styles.leftText}>
            To keep connected with us please sign up with your personal info
          </p>
          <button
            style={styles.leftButton}
            onClick={() => (window.location.href = '/login')}
          >
            Sign In
          </button>
        </div>
      </div>

      <div style={styles.rightPanel}>
        <h1 style={styles.brand}>
          <span style={{ color: '#333' }}>Event</span>{' '}
          <span style={{ color: '#7f5af0' }}>Hive</span>
        </h1>
        <h2 style={styles.formTitle}>Create your account</h2>

        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label}>Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Your Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Select Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {error && <p style={styles.error}>{error}</p>}
          {successMsg && <p style={styles.success}>{successMsg}</p>}

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif",
  },
  leftPanel: {
    flex: 1,
    backgroundImage:
      'url("https://images.unsplash.com/photo-1503424886306-4cc4f3f1d9bf")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: '100%',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    textAlign: 'center',
  },
  leftTitle: {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  leftText: {
    fontSize: '1rem',
    marginBottom: '2rem',
    maxWidth: '80%',
  },
  leftButton: {
    backgroundColor: 'white',
    color: '#333',
    padding: '0.75rem 2rem',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: '4rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  brand: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    fontWeight: '600',
  },
  formTitle: {
    fontSize: '1.8rem',
    fontWeight: '600',
    marginBottom: '2rem',
    color: '#111',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  label: {
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: '0.25rem',
    fontWeight: '500',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '6px',
    border: '2px solid #e0e0e0',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border 0.3s ease',
  },
  submitBtn: {
    backgroundColor: '#7f5af0',
    color: 'white',
    padding: '14px 16px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  error: {
    color: 'red',
    fontWeight: '600',
    marginTop: '0.5rem',
  },
  success: {
    color: 'green',
    fontWeight: '600',
    marginTop: '0.5rem',
  },
};

export default SignUpPage;
