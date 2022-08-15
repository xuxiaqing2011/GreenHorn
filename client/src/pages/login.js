import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { AllContext } from '../index.jsx';
import LoginForm from '../components/loginComponents/LoginForm.jsx';
// import {registerWithEmailAndPassword} from '../firebase.jsx'


// {registerwithEmailAndPassword("Andrew", "[EMAIL]", "somePassword")}
const Login = () => {

  const { counter } = useContext(AllContext);


  return (
    <>
      <LoginForm />
      <h1> {counter} </h1>
      <div><Link to="/seeker">Redirect to Seeker view </Link></div>
      <div><Link to="/recruiter">Redirect to Recruiter view </Link></div>
      <div><Link to="/">Back to Home</Link></div>
      {/* <button onClick={registerWithEmailAndPassword("Andrew", "[EMAIL]", "somePassword")}>click here to make an account</button> */}
    </>
  )
};

export default Login;