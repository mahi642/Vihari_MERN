import React from "react";
import { useContext, useState } from 'react';
import Footer from '../components/UI/Footer'
import { useNavigate } from 'react-router-dom'
import "../components/CSS/AgentLogin.css";
import userContext from '../context/User/userContext'
import Navbar from '../components/UI/Navbar'

const AgentLogin = () => {
  const navigate = useNavigate();
  const { verifyAgent } = useContext(userContext);
  const [loginCreds, setLoginCreds] = useState({ email: '', password: '' });

  const onLoginInput = (e) => {
    setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await verifyAgent(loginCreds.email, loginCreds.password);

    if (response.success) {
      localStorage.token = response.authToken;
      localStorage.agentId=response.agentId;
      
      if (response.agent.flag === 1 && !response.agent.blocked) {
        navigate('/agent/agentHome');
      } else {
        navigate('/waitForApproval');
      }
    } else {
      if (response.error) {
        alert(response.error);
        navigate('/waitForApproval');
      }
    }
    setLoginCreds({ email: '', password: '' });
  }

  return (
    < >
    <Navbar />
    <div className="login-body1">
      <div className="login1">
        <form>
          <label htmlFor="chk" className="login-label1" aria-hidden="true">
            Login
          </label>
          <input
            className="login-input1"
            type="email"
            name="email"
            onChange={onLoginInput}
            value={loginCreds.email}
            placeholder="Email"
            required
          />
          <input
            className="login-input1"
            type="password"
            name="password"
            onChange={onLoginInput}
            value={loginCreds.password}
            placeholder="Password"
            required
          />
          <button className="login-submit1" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
    </>
  );
};


export default AgentLogin;