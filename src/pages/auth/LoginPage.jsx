import React, { useState } from 'react';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
      } else {
        // Save token to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect to dashboard or homepage
        window.location.href = '/event-list';
      }
    } catch (err) {
      setError('Network error');
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.left}>
          <div style={styles.logo}>
            <span style={styles.logoBlack}>Event </span>
            <span style={styles.logoPurple}>Hive</span>
          </div>
          <h2 style={styles.heading}>Sign In to Event Hive</h2>

          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>YOUR EMAIL</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>PASSWORD</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                style={styles.input}
                required
              />
              <div style={styles.forgot}>Forgot your password?</div>
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div style={styles.right}>
          <div style={styles.overlay}>
            <h2 style={styles.rightTitle}>Hello Friend</h2>
            <p style={styles.rightText}>
              To keep connected with us please login with your email
            </p>
            <button
              style={styles.signupBtn}
              onClick={() => (window.location.href = '/signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {

  error: {
    color: 'red',
    marginTop: '0.5rem',
    fontWeight: '600',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#e5e7eb',
    fontFamily: 'Segoe UI, sans-serif',
    padding: '2rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: '950px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  left: {
    flex: 1,
    padding: '3rem',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
  },
  logoBlack: {
    color: '#111',
  },
  logoPurple: {
    color: '#7c3aed',
  },
  heading: {
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '2rem',
    color: '#1f2937',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.4rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: '600',
    marginBottom: '0.4rem',
    color: '#4b5563',
  },
  input: {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1.5px solid #d1d5db',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  forgot: {
    marginTop: '0.4rem',
    fontSize: '0.85rem',
    color: '#6b7280',
    textAlign: 'right',
    cursor: 'pointer',
  },
  button: {
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: '#7c3aed',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  right: {
    flex: 1,
    backgroundImage:
      'url("https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    textAlign: 'center',
  },
  rightTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '1rem',
  },
  rightText: {
    maxWidth: '80%',
    marginBottom: '1.5rem',
    fontSize: '1rem',
  },
  signupBtn: {
    padding: '0.6rem 1.5rem',
    backgroundColor: 'transparent',
    color: '#fff',
    border: '2px solid #fff',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
};

export default LoginPage;
