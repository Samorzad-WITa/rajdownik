import './App.css';
import './Components/styles/announcements.css'
import Announcements from './Components/announcements.js';
import Navbar from './Components/navbar.js';
import Participants from './Components/participants.js';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; 
import Schedule from './Components/schedule.js';
import Staff from './Components/staff.js';
import Settings from './Components/settings.js';
import NotFound from './Components/notFound.js';
import Test from './Components/test';
import Login from './Components/login';
import ProtectedRoute from './Components/ProtectedRoute';
import { useState } from 'react'; // Importujemy useState

// Nowy komponent AppContent, który używa useLocation
function AppContent({ setToken, token }) { // Dodaj setToken i token jako props
  const location = useLocation(); // Używamy useLocation, aby sprawdzić aktualną ścieżkę
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="App">
      <div className={`${!isLoginPage ? 'container' : ''}`}>
        {/* Wyświetlamy Navbar tylko, jeśli aktualna ścieżka nie jest /login */}
        {location.pathname !== '/login' && (
          <div className='navPlaceHolder'>
            <Navbar token={token} /> {/* Przekazujemy token */}
          </div>
        )}

        <div className='content'>
          <Routes>
            {/* Używamy ProtectedRoute dla zabezpieczenia tras */}
            <Route path="/" element={<ProtectedRoute token={token}><Participants /></ProtectedRoute>} />
            <Route path="/announcements" element={<ProtectedRoute token={token}><Announcements token={token}/></ProtectedRoute>} />
            <Route path="/participants" element={<ProtectedRoute token={token}><Participants /></ProtectedRoute>} />
            <Route path="/schedule" element={<ProtectedRoute token={token}><Schedule token={token} /></ProtectedRoute>} /> {/* Przekazujemy token */}
            <Route path="/staff" element={<ProtectedRoute token={token}><Staff /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute token={token}><Settings /></ProtectedRoute>} />
            <Route path="/test" element={<ProtectedRoute token={token}><Test /></ProtectedRoute>} />
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

  const handleSetToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // Zapisujemy token w localStorage
  };

  return (
    <Router>
      <AppContent token={token} setToken={handleSetToken} /> {/* Przekazujemy token i setToken */}
    </Router>
  );
}

export default App;