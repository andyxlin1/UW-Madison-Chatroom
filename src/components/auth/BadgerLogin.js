import React, { useRef, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContexts';
import { useNavigate } from 'react-router-dom';

export default function BadgerLogin() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const { login, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      alert('You must provide both a username and password!');
      return;
    }

    fetch('https://www.cs571.org/s23/hw6/api/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ username, password }),
      headers: { 
        'Content-Type': 'application/json', 
        'X-CS571-ID': 'bid_5213ece1083c3d09bef9' 
      }
    })
      .then(response => {
        if (response.ok) {
          alert('Login successful!');
          login();
          setUser(username);
          navigate('/');
        } else if (response.status === 401) {
          alert('Incorrect username or password!');
        } else {
          alert('Login failed, please try again later.');
        }
      })
      .catch(error => {
        alert('Login failed, please try again later.');
        console.error(error);
      });
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input type="text" className="form-control" id="username" ref={usernameRef} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" className="form-control" id="password" ref={passwordRef} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </>
  );
}
