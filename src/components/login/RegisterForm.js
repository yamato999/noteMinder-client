import React, { useState } from 'react';
import classes from './LoginForm.module.css';

const RegisterForm = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://fastapi-ian5.onrender.com/auth/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(response)
      if (response.ok) {
        // Успешная регистрация, обработка ответа от сервера
        console.log(data);
        localStorage.setItem('token', data.access_token);
        window.location.href = '/notes';
      } else {
        // Обработка ошибок при регистрации
        setErrorMessage(data.detail || 'Произошла ошибка при отправке запроса.');
      }
    } catch (error) {
      // Обработка ошибок при регистрации
      setErrorMessage('Произошла ошибка при отправке запроса.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.container}>
      <h1>Sign up</h1>
      <div>
        <label></label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label></label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      
      <button type="submit">Create account</button>
      <p>Already have an account? <a onClick={props.toggleForm}> Create account</a></p>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default RegisterForm;
