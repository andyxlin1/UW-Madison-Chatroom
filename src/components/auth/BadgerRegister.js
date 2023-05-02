import React, { useState } from 'react';

export default function BadgerRegister() {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePassChange = (event) => {
    setPass(event.target.value);
  };

  const handleConfirmPassChange = (event) => {
    setConfirmPass(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !pass) {
      alert('You must provide both a username and password!');
      return;
    }

    if (pass !== confirmPass) {
      alert('Your passwords do not match!');
      return;
    }

    fetch('https://www.cs571.org/s23/hw6/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CS571-ID': 'bid_5213ece1083c3d09bef9',
      },
      credentials: 'include',
      body: JSON.stringify({ username: name, password: pass }),
    })
      .then((response) => {
        if (response.ok) {
          setIsSuccess(true);
          alert('Registration was successful!');
        } else if (response.status === 409) {
          alert('That username has already been taken!');
          setIsSuccess(false);
        } else {
          throw new Error('Error registering user');
        }
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        alert('Error registering user');
        setIsSuccess(false);
      });
  };

  return (
    <>
      <h1>Register</h1>
      {isSuccess && (
        <div className="alert alert-success" role="alert">
          Registration was successful!
        </div>
      )}
      {!isSuccess && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pass" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="pass"
              className="form-control"
              value={pass}
              onChange={handlePassChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPass" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPass"
              className="form-control"
              value={confirmPass}
              onChange={handleConfirmPassChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      )}
    </>
  );
}
