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
}

const AuthContext = React.createContext({} as Context);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<Auth>();
  const [token, setToken] = React.useState<string>("");
  const [status, setStatus] =
    React.useState<"init" | "loading" | "done" | "error">("init");
  async function login(username: string, password: string) {
    console.log(username, password);
    try {
      setStatus("loading");
      const user = await api.login(username, password);
      setUser({ username: user.username, isAdmin: Boolean(user.admin) });
      setToken(user.token);
      setStatus("done");
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  }

  function logout() {
    setUser(undefined);
  }
  {
    status === "loading" && <div>Loading...</div>;
  }
  {
    status === "error" && <div>Ops...</div>;
  }
  return (
    <AuthContext.Provider
      value={{
        username: user?.username,
        login,
        token,
        logout,
        isLoggedIn: user !== undefined,
        isAdmin: user ? user.isAdmin : false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
