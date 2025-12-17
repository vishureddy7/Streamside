import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import ImprovedLandingPage from './components/ImprovedLandingPage';
import ImprovedDashboard from './components/ImprovedDashboard';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import StudioLobby from './components/StudioLobby';
import StudioCall from './components/StudioCall';
import StudioSettings from './components/StudioSettings';
import GuestJoinPage from './components/GuestJoinPage';
import ProfileSettings from './components/ProfileSettings';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ImprovedLandingPage />} />
          <Route path="/auth/signin" element={<SignInPage />} />
          <Route path="/auth/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<ImprovedDashboard />} />
          <Route path="/studio/:studioId" element={<StudioLobby />} />
          <Route path="/studio/:studioId/call" element={<StudioCall />} />
          <Route path="/studio/:studioId/settings" element={<StudioSettings />} />
          <Route path="/join/:inviteCode" element={<GuestJoinPage />} />
          <Route path="/settings" element={<ProfileSettings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}