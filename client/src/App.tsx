import React from "react";
import "./App.css";
import { AuthContext } from "./context/authContext";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { UsersProvider } from "./context/usersContext";

const App: React.FC = () => {
  const { isLoggedIn, logout, username } = React.useContext(AuthContext);
  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn && (
          <nav>
            <h3>Welcome back, {username}! </h3>
            <button className="btn logout__btn" onClick={logout}>
              logout
            </button>
          </nav>
        )}
        <h1>Users management</h1>

        {isLoggedIn ? (
          <UsersProvider>
            <Home />
          </UsersProvider>
        ) : (
          <Login />
        )}
      </header>
    </div>
  );
};

export default App;
