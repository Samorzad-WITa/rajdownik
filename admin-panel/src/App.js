import './App.css';
import Announcements from './Components/announcements.js';
import Navbar from './Components/navbar.js';
import Participants from './Components/participants.js';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom'; // Dodaj useNavigate
import Schedule from './Components/schedule.js';
import Staff from './Components/staff.js';
import Settings from './Components/settings.js';
import NotFound from './Components/notFound.js';
import Test from './Components/test';
import Login from './Components/login';
import ProtectedRoute from './Components/ProtectedRoute'; // Importujemy nowy komponent do ochrony tras
import { useState } from 'react'; // Import useState

// Nowy komponent AppContent, który używa useLocation
function AppContent({ setToken }) { // Dodaj setToken jako props
  const location = useLocation(); // Używamy useLocation, aby sprawdzić aktualną ścieżkę
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="App">
      <div className={`${!isLoginPage ? 'container' : ''}`}>
        {/* Wyświetlamy Navbar tylko, jeśli aktualna ścieżka nie jest /login */}
        {location.pathname !== '/login' && (
          <div className='navPlaceHolder'>
            <Navbar />
          </div>
        )}

        <div className='content'>
          <Routes>
            {/* Używamy ProtectedRoute dla zabezpieczenia tras */}
            <Route path="/" element={<ProtectedRoute><Participants /></ProtectedRoute>} />
            <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
            <Route path="/participants" element={<ProtectedRoute><Participants /></ProtectedRoute>} />
            <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
            <Route path="/staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/test" element={<ProtectedRoute><Test /></ProtectedRoute>} />
            <Route path="/login" element={<Login setToken={setToken} />} /> {/* Przekazujemy setToken */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

// Główny komponent App, w którym opakowujemy AppContent w Router
function App() {
  const [token, setToken] = useState(localStorage.getItem('token')); // Dodajemy stan tokenu

  return (
    <Router>
      <AppContent setToken={setToken} /> {/* Przekazujemy setToken jako props */}
    </Router>
  );
}

export default App;
