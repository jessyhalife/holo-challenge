import React from "react";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const { login } = React.useContext(AuthContext);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login("admin", "123");
  }
  return (
    <div>
      <form action="submit" onSubmit={handleSubmit}>
        <input type="text" />
        <input type="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
