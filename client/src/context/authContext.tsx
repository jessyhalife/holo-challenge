import React from "react";
import api from "../api";
import { Auth } from "../types";

interface Context {
  username: string | undefined;
  login: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: Boolean;
  isAdmin: Boolean;
  token: string;
  status: "init" | "loading" | "done" | "error";
  error: string;
}

const AuthContext = React.createContext({} as Context);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<Auth>();
  const [token, setToken] = React.useState<string>("");
  const [status, setStatus] =
    React.useState<"init" | "loading" | "done" | "error">("init");
  const [error, setError] = React.useState<string>("");

  async function login(username: string, password: string) {
    try {
      setStatus("loading");
      const user = await api.login(username, password);
      setUser({ username: user.username, isAdmin: Boolean(user.admin) });
      setToken(user.token);
      setStatus("done");
      setError("");
    } catch (error) {
      setUser({} as Auth);
      setStatus("error");
      setError(error.message);
    }
  }

  function logout() {
    setUser(undefined);
  }

  return (
    <AuthContext.Provider
      value={{
        username: user?.username,
        login,
        token,
        logout,
        isLoggedIn: Boolean(user && token),
        isAdmin: user ? user.isAdmin : false,
        status,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
