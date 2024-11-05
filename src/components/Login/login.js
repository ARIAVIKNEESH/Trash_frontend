import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login({ setIsLoggedIn }) {
  const [form, setForm] = useState({
    emailOrUsername: '',
    loginPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle login form submission
  const handleLogin = async () => {
    if (!form.emailOrUsername || !form.loginPassword) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/login', {
        emailOrUsername: form.emailOrUsername,
        password: form.loginPassword
      });
      alert(res.data.message);
      localStorage.setItem('username', form.emailOrUsername);
      setIsLoggedIn(true); // Update App component's login state
      navigate('/home'); // Redirect to Home page on successful login
    } catch (error) {
      setError(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        className="login-input"
        name="emailOrUsername"
        placeholder="Enter Email or Username"
        onChange={handleInputChange}
      />
      <input
        className="login-input"
        name="loginPassword"
        type="password"
        placeholder="Enter Password"
        onChange={handleInputChange}
      />
      <button className="login-button" onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Log In"}
      </button>
      <div className="signup-link">
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
}

export default Login;
