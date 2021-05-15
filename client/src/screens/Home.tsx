import React from "react";
import Item from "../components/Item";
import { AuthContext } from "../context/authContext";
import { UsersContext } from "../context/usersContext";

import "./Home.styles.css";
import Paginator from "../components/Paginator/index";
import Form from "../components/Form";
import List from "../components/List/index";

const Home = () => {
  const { isAdmin } = React.useContext(AuthContext);
  const { status } = React.useContext(UsersContext);
  const [isCreating, setIsCreating] = React.useState<Boolean>(false);
  return (
    <div className="container">
      {isAdmin && (
        <button className="btn add__btn" onClick={() => setIsCreating(true)}>
          + Add new
        </button>
      )}
      {isCreating && <Form closeForm={() => setIsCreating(false)} />}
      {status === "loading" && <h3>Loading..</h3>}
      {status === "error" && <h3>Oops.. something went wrong.</h3>}
      <List />
      <Paginator />
    </div>
  );
};

export default Home;
