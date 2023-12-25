import React, { useState } from "react";
import classes from "./LoginForm.module.css";
import { Hourglass } from "react-loader-spinner";

const RegisterForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://fastapi-ian5.onrender.com/auth/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log(response);
      if (response.ok) {
        // Успешная регистрация, обработка ответа от сервера
        setIsLoading(false);
        console.log(data);
        localStorage.setItem("token", data.access_token);
        window.location.href = "/notes";
      } else {
        setIsLoading(false);
        // Обработка ошибок при регистрации
        setErrorMessage(
          data.detail || "Произошла ошибка при отправке запроса."
        );
      }
    } catch (error) {
      setIsLoading(false);
      // Обработка ошибок при регистрации
      setErrorMessage("Произошла ошибка при отправке запроса.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.container}>
      <h2>Sign up</h2>
      <div className={classes.registerInputs}>
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

      {isLoading ? (
        <div style={{ padding: 10 }}>
          <Hourglass
            visible={true}
            height="50"
            width="50"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
        </div>
      ) : (
        <button type="submit">Create account</button>
      )}
      <p>
        Already have an account? <br />
        <a onClick={props.toggleForm} className={classes.accountAction}>
          Sign In
        </a>
      </p>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default RegisterForm;
