
Event Management - Create Event Page
This React component provides a user interface to create events with details like title, venue, location, date, time, cost, and an image upload. It integrates Google’s Gemini API to generate a short event description automatically based on user inputs.

Features
Form inputs for event details (title, venue, location, date, time, type, cost)

Drag and drop or click to upload event image

Auto-generate engaging event descriptions using Google Gemini API

Submit event data with image (encoded in base64) to backend API

Displays success alert and redirects to event list on successful creation

Uses inline styling (no external CSS dependencies)

Uses React hooks and react-dropzone for file handling

Technologies Used
React (with hooks)

react-dropzone (for image upload)

React Router (useNavigate) for navigation after creation

Fetch API for backend and Gemini API calls

Google Gemini Language API for text generation

Setup Instructions
Clone or Download this project

Install dependencies

bash
Copy
Edit
npm install react react-dom react-router-dom react-dropzone
Environment Variables

Create a .env file in your root and add your Google Gemini API key:

ini
Copy
Edit
VITE_GEMINI_API_KEY= your_google_gemini_api_key_here
Make sure to replace with your actual Gemini API key.

Backend API

The form submits to:

bash
Copy
Edit
http://localhost:5000/api/events/create
Ensure your backend server is running and accepts POST requests at this endpoint with JSON payload containing the event data, including an optional base64-encoded image string (imageBase64).

React Router Setup

Make sure your app is wrapped with BrowserRouter to enable navigation, and you have a route for /event-list where users get redirected after event creation.

Example:

jsx
Copy
Edit
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateEventPage from './CreateEventPage';
import EventListPage from './EventListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/event-list" element={<EventListPage />} />
        {/* other routes */}
      </Routes>
    </BrowserRouter>
  );
}
Start the React app

bash
Copy
Edit
npm run dev