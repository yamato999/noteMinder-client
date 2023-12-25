import { useState } from "react";
import classes from "./LoginForm.module.css";
import { Hourglass } from "react-loader-spinner";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const url = "https://fastapi-ian5.onrender.com/auth/users/tokens";
    const payload = new URLSearchParams();
    payload.append("grant_type", "password");
    payload.append("username", username);
    payload.append("password", password);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload,
    })
      .then((response) => {
        if (!response.ok) {
          setErrorMessage("Invalid Credentials");
          setIsLoading(false);
          throw new Error("Request failed with status " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        localStorage.setItem("token", data.access_token);
        window.location.href = "/notes";
        console.log(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage("Invalid Credentials");
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
            placeholder="Email"
            value={username}
            onChange={handleUsernameChange}
            className=""
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className=""
          />
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
            <button type="submit">Login</button>
          )}
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      <p>
        Don't have an account? <br />
        <a onClick={props.toggleForm} className={classes.accountAction}>
          {" "}
          Create account
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
