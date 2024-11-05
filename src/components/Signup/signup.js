import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css'; // Make sure the path is correct

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    dob: '',
    occupation: '',
    genres: [],
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const genresList = [
    "Fiction", "Science Fiction", "Fantasy", "Mystery", "Romance", "Horror",
    "Biography", "Autobiography", "Self-Help", "Travel", "History", "Science",
    "Graphic Novels", "Poetry", "Classic Literature", "Sports & Recreation"
  ];

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenreSelection = (genre) => {
    setForm((prevForm) => {
      const updatedGenres = prevForm.genres.includes(genre)
        ? prevForm.genres.filter((g) => g !== genre)
        : [...prevForm.genres, genre];
      return { ...prevForm, genres: updatedGenres };
    });
  };

  const handleSignup = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/signup', form);
      alert(res.data.message);
      navigate('/'); // Redirect to login page on successful signup
    } catch (error) {
      alert(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-title">Sign Up</h2>
        <input className="signup-input" name="name" placeholder="Name" onChange={handleInputChange} />
        <input className="signup-input" name="email" placeholder="Email" onChange={handleInputChange} />
        <input className="signup-input" name="username" placeholder="Username" onChange={handleInputChange} />
        <input className="signup-input" name="dob" type="date" onChange={handleInputChange} />

        <select className="signup-select" name="occupation" onChange={handleInputChange}>
          <option value="">Select Occupation</option>
          <option value="school">School</option>
          <option value="college">College</option>
          <option value="work">Work</option>
          <option value="other">Other</option>
        </select>

        <h3 className="signup-genre-title">Select Your Favorite Genres</h3>
        <div className="signup-genre-list">
          {genresList.map((genre) => (
            <label key={genre} className="signup-genre-label">
              <input
                type="checkbox"
                checked={form.genres.includes(genre)}
                onChange={() => handleGenreSelection(genre)}
              />
              {genre}
            </label>
          ))}
        </div>

        <input
          className="signup-input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
        <input
          className="signup-input"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleInputChange}
        />
        <button className="signup-button" onClick={handleSignup}>Sign Up</button>

        <div className="signup-login">
          <p>Already a user? <Link to="/">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
