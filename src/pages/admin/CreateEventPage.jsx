import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

const CreateEventPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    venue: '',
    date: '',
    time: '',
    costType: '',
    description: '',
    type: '',
    location: '',
    image: null
  });

  const [loadingDesc, setLoadingDesc] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setForm((prev) => ({ ...prev, image: file }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerateDescription = async () => {
    setLoadingDesc(true);
    const prompt = `Generate a short, engaging event description for the following details:
- Title: ${form.title}
- Venue: ${form.venue}
- Location: ${form.location}
- Date: ${form.date}
- Time: ${form.time}
- Type: ${form.type}
- Cost: ${form.costType}
Please keep it clear and under 100 words.`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );
      const data = await res.json();
      const desc = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (desc) {
        setForm((prev) => ({ ...prev, description: desc }));
      } else {
        alert('Failed to generate description');
      }
    } catch (err) {
      console.error('Gemini API error:', err);
      alert('Error generating description');
    } finally {
      setLoadingDesc(false);
    }
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]); // strip data:<type>
      reader.onerror = reject;
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageBase64 = null;
    if (form.image) {
      imageBase64 = await convertToBase64(form.image);
    }

    const payload = { ...form, imageBase64 };

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/events/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        alert('Event created successfully!');
        // Wait a bit before navigating for smooth UX
        setTimeout(() => {
          navigate('/event-list');
        }, 200);
      } else {
        console.error(data);
        alert('Error creating event');
      }
    } catch (err) {
      console.error('Network error:', err);
      alert('Error while sending request');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Create Event</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="title"
          placeholder="Event Title"
          style={styles.input}
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="venue"
          placeholder="Event Venue"
          style={styles.input}
          value={form.venue}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          style={styles.input}
          value={form.location}
          onChange={handleChange}
          required
        />
        <input
          name="type"
          placeholder="Type"
          style={styles.input}
          value={form.type}
          onChange={handleChange}
          required
        />

        <div style={styles.row}>
          <input
            type="date"
            name="date"
            style={styles.input}
            value={form.date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            style={styles.input}
            value={form.time}
            onChange={handleChange}
            required
          />
        </div>

        <input
          name="costType"
          placeholder="Cost Type"
          style={styles.input}
          value={form.costType}
          onChange={handleChange}
          required
        />

        <h2 style={styles.subheading}>Event Image</h2>
        <div {...getRootProps()} style={styles.dropzone}>
          <input {...getInputProps()} />
          {form.image ? (
            <img
              src={URL.createObjectURL(form.image)}
              alt="preview"
              style={{ maxHeight: '150px', borderRadius: '8px' }}
            />
          ) : (
            <p>{isDragActive ? 'Drop image here...' : 'Drag & drop or click to upload'}</p>
          )}
        </div>

        <textarea
          name="description"
          placeholder="Event Description"
          value={form.description}
          style={styles.textarea}
          onChange={handleChange}
          required
        />

        <button
          type="button"
          onClick={handleGenerateDescription}
          style={styles.outlineBtn}
          disabled={loadingDesc}
        >
          {loadingDesc ? 'Generating...' : 'Generate Description with Gemini'}
        </button>

        <button type="submit" style={styles.button}>
          Create Event
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f9f9fb',
    minHeight: '100vh'
  },
  heading: {
    fontSize: '1.8rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: '#222'
  },
  subheading: {
    fontSize: '1.2rem',
    marginTop: '1rem',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#444'
  },
  form: {
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  input: {
    padding: '12px 14px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontFamily: 'inherit'
  },
  row: {
    display: 'flex',
    gap: '1rem'
  },
  textarea: {
    padding: '12px 14px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    height: '120px',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  dropzone: {
    border: '2px dashed #aaa',
    padding: '20px',
    textAlign: 'center',
    borderRadius: '8px',
    backgroundColor: '#f4f4f4',
    cursor: 'pointer'
  },
  button: {
    padding: '12px 14px',
    fontSize: '1rem',
    backgroundColor: '#673ab7',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  outlineBtn: {
    padding: '12px 14px',
    fontSize: '1rem',
    backgroundColor: '#fff',
    color: '#673ab7',
    border: '2px solid #673ab7',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

export default CreateEventPage;
