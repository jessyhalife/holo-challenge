import React from "react";
import { AuthContext } from "../context/authContext";
import "./Login.styles.css";

const Login = () => {
  const { login, error, status } = React.useContext(AuthContext);
  const [input, setInput] = React.useState({
    username: "",
    password: "",
  });
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login(input.username, input.password);
  }
  return (
    <div className="login__container">
      <h2>Hello, please login to continue</h2>
      <form className="login__form" action="submit" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            name="username"
            type="text"
            value={input.username}
            onChange={(e) =>
              setInput((input) => ({ ...input, username: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={(e) =>
              setInput((input) => ({ ...input, password: e.target.value }))
            }
          />
        </div>
        <button
          className="btn login__btn"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Loading..." : "Login"}
        </button>
      </form>
      {status === "error" && (
        <p className="form__error">{error || "Oops.. something went wrong"}</p>
      )}
    </div>
  );
};

export default Login;
