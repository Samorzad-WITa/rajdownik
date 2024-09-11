import React, { useState } from "react";
import axios from "axios";
import userIcon from "./assets/icons/ProfilUzytkownika.svg";
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) { // Otrzymujemy funkcję setToken jako props
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:1133/auth/login", {
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200) {
        // Zapisz token do localStorage
        localStorage.setItem("token", data.token);
        setToken(data.token); // Ustaw token w stanie aplikacji
        navigate('/'); // Przekieruj użytkownika na stronę główną
      } else {
        setError(data.message || "Błąd logowania");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Błąd logowania");
      } else if (err.request) {
        setError("Brak odpowiedzi z serwera. Spróbuj ponownie później.");
      } else {
        setError("Błąd sieci lub serwera");
      }
    }
  };

  return (
    <div className="login">
      <h1>Logowanie</h1>
      <div className="loginDiv">
        <img className="userIcon" src={userIcon} alt="User icon" />
        <form onSubmit={handleLogin}>
          <input
            className="loginInput"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="loginInput"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="loginButton" type="submit">
            Zaloguj się
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
