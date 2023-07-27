import { useState } from 'react';
import classes from './LoginForm.module.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = 'http://localhost:8000/auth/users/tokens';
    const payload = new URLSearchParams();
    payload.append('grant_type', 'password');
    payload.append('username', username);
    payload.append('password', password);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Request failed with status ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        localStorage.setItem('token', data.access_token);
        window.location.href = '/notes';
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className={classes.container}>
      <div>
        <h2>Hello Again!</h2>
        <p>Welcome Back</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            className=""
          />
          <br/>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className=""
          />
          <button type="submit">Login</button>
        </form>
        <a></a>
      </div>
    </div>
  );
};

export default LoginForm;
