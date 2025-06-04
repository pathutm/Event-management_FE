# Event Management Platform – Frontend

This is the frontend file of the Event Management Platform, built with **React (functional components)** and structured for **scalability, reusability, and clarity**. It provides a seamless UI for event creation, leveraging **Google Gemini API** for smart description generation and **React Dropzone** for intuitive image upload.

## Technologies Used

| Category       | Stack/Library          |
|----------------|------------------------|
| Framework      | React (Vite + ESM)     |
| State Handling | React useState/useEffect/useCallback |
| File Upload    | react-dropzone         |
| API Integration| Fetch API              |
| Styling        | Inline CSS styling     |
| AI Integration | Google Gemini API      |
| Routing        | react-router-dom       |


## Features

- Clean, responsive, and intuitive UI
- Form-driven event creation (title, venue, location, date, time, type, cost, image)
- Event image upload - **functional along with DB : MongoDB**
- Smart event description generation using **Google Gemini API**
- Secure form submission with **JWT-based auth**
- Displays success alert and redirects on successful creation
- Fully inline-styled – no external CSS files or Tailwind used
- Structured with **scalable components and custom React hooks will be developeed further**
- Codebase designed with **clean separation and future extensibility in mind**


Here,s the completely functional and maintainable code architecture i used
## Folder Architecture (Based on Project Structure)


```bash
src/
├── assets/
│   └── routes/
│       └── react.svg
├── constants/
│   ├── avatars.jsx
│   ├── buttons.jsx
│   └── reusables.jsx
├── pages/
│   ├── admin/
│   ├── auth/
│   ├── routes/
│   ├── user/
│   ├── LandingPage.jsx
│   └── NotFoundPage.jsx
├── App.jsx             # Route configuration
├── main.jsx            # React DOM Mount
├── index.css           # (Optional Global Styles - not used much)
├── index.html          # Vite entry HTML
├── .env                # Store VITE_GEMINI_API_KEY
├── package.json
├── README.md

```

## Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# 2. Navigate to the frontend folder
cd your-repo-name

# 3. Install dependencies
npm install

# 4. Create a `.env` file and add your Gemini API key
VITE_GEMINI_API_KEY=your_api_key_here

# 5. Start the development server
npm run dev

```
Then visit http://localhost:5173 to view the app in your browser.


## API Endpoint (Backend Integration)
The form submits data to:

```
 POST http://localhost:5000/api/events/create
```

Payload includes:

Title, Venue, Date, Time, Cost, Location, Description

Image (as base64 string)

You’ll also need a valid ```Bearer token``` stored in localStorage under ```token```

 ## Status
 UI and validation completed

 Gemini API working

 MongoDB image upload tested

 Auth and redirect integrated

 Production-ready frontend for hackathon/demo purposes

 ## Done by

 Pathu T
 
 Intern
 
 SNS InnovationHub

Thank you for taking the time. Your feedback is greatly appreciated!



