import classes from "./LoginPage.module.css"
import LoginForm from "./LoginForm"
import ProjectInfo from "./ProjectInfo"
import RegisterForm from "./RegisterForm"
import { Fragment} from 'react';
import React, { useState } from 'react';
const Login = () => {
    const [isLoginForm, setIsLoginForm] = useState(false);

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
    };
    return (  
      <div className={classes.container}>
        <ProjectInfo/>
        {isLoginForm ? <LoginForm toggleForm={toggleForm} /> : <RegisterForm toggleForm={toggleForm} />}
      </div>
    )
}

export default Login;