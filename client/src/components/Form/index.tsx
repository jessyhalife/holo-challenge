import React from "react";
import { UsersContext } from "../../context/usersContext";
import "./styles.css";
interface Props {
  closeForm: () => void;
}
const Form: React.FC<Props> = ({ closeForm }) => {
  const {
    actions: { create },
  } = React.useContext(UsersContext);
  const [input, setInput] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      create({
        username: input.username,
        password: input.password,
        email: input.email,
      });
    } catch (err) {
      console.log("err");
    }
  }

  return (
    <form action="submit" className="form__container" onSubmit={handleSubmit}>
      <h2>Create new user</h2>
      <div className="form-group">
        <label htmlFor="username">username:</label>
        <input
        tabIndex={1}
          type="text"
          name="username"
          value={input.username}
          onChange={(e) =>
            setInput((input) => ({ ...input, username: e.target.value }))
          }
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">email:</label>
        <input
        tabIndex={2}
          type="text"
          name="email"
          value={input.email}
          onChange={(e) =>
            setInput((input) => ({ ...input, email: e.target.value }))
          }
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">password:</label>
        <input
        tabIndex={3}
          type="password"
          name="password"
          value={input.password}
          onChange={(e) =>
            setInput((input) => ({ ...input, password: e.target.value }))
          }
        />
      </div>
      <div className="form__buttons">
        <button className="btn btn__close" onClick={closeForm} tabIndex={5}>
          Close
        </button>
        <button className="btn btn__save" tabIndex={4}>Save</button>
      </div>
    </form>
  );
};

export default Form;
