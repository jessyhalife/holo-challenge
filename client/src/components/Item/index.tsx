import React from "react";
import { User } from "../../types";
import './styles.css';
interface Props {
  user: User;
}
const Item: React.FC<Props> = ({ user }) => {
  return (
    <li className="item__container">
      <h3>{user.username}</h3>
      <p>{user.email}</p>
    </li>
  );
};

export default Item;
