import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import './Login.css';
import Button from 'react-bootstrap/Button';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
    <h1 className="welcome">Welcome!</h1>
    <h2 className="please">Please Login Below to view your Book Shelf</h2>
    <Button className="login-button" onClick={() => loginWithRedirect()}>Log In</Button>
    </>
  );
  
};

export default LoginButton;