import React from "react";
import { UsersContext } from "../../context/usersContext";
import Item from "../Item";
import "./styles.css";
const List: React.FC = () => {
  const {
    state: { users },
  } = React.useContext(UsersContext);
  if (users.length === 0) {
    return <h3>No users found =(</h3>;
  }
  return (
    <ul>
      {users?.map((user) => (
        <Item key={user._id} user={user} />
      ))}
    </ul>
  );
};

export default List;
