import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  if (!token)
    return <Navigate to={role === "user" ? "/login" : "/agentLogin"} />;

  const decoded = jwtDecode(token);
  console.log(decoded);
  // const now = new Date(),
  //   exp = new Date(decoded.exp);

  // if (exp > now) {
  //   localStorage.removeItem("token");
  //   return <Navigate to={role === "user" ? "/login" : "/agentLogin"} />;
  // }

  return (role === "user" && decoded.user) || (role === "agent" && decoded.agent) ? (
    children
  ) : (
    <Navigate to={role === "user" ? "/login" : "/agentLogin"} />
  );
};
export default PrivateRoute;