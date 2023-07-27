import classes from "./LoginPage.module.css"
import LoginForm from "./LoginForm"
import ProjectInfo from "./ProjectInfo"
import { Fragment } from 'react';

const Login = () => {
    return (  
      <div className={classes.container}>
        <ProjectInfo/>
        <LoginForm/>
      </div>
    )
}

export default Login;