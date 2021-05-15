import React from "react";
import "./App.css";
import { AuthContext } from "./context/authContext";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { UsersProvider } from "./context/usersContext";

const App: React.FC = () => {
  const { isLoggedIn, logout } = React.useContext(AuthContext);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Users management</h1>
        {isLoggedIn && <button onClick={logout}>logout</button>}
        {isLoggedIn ? (
          <UsersProvider>
            <Home />{" "}
          </UsersProvider>
        ) : (
          <Login />
        )}
      </header>
    </div>
  );
};

export default App;
