import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRegisterPage from "../admin/EventList";
import CreateEventPage from "../admin/CreateEventPage";
import AdminDashboardPage from "../admin/AdminDashboard";
import LoginPage from "../auth/LoginPage";
import SignUpPage from "../auth/SignUpPage";
import NotFoundPage from "../NotFoundPage";
import EventList from "../admin/EventList";
import LandingPage from "../LandingPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/register" element={<AdminRegisterPage />} />
        <Route path="/admin/create-event" element={<CreateEventPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/event-list" element={<EventList />} />
        <Route path="/landing-page" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
