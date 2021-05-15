import React from "react";
import { AuthContext } from "../context/authContext";
import { UsersContext } from "../context/usersContext";

const Home = () => {
  const {
    state: { users, page, total },
    actions: { get, create },
  } = React.useContext(UsersContext);
  const { isAdmin } = React.useContext(AuthContext);
  React.useEffect(() => {
      console.log("ke onda")
    get();
  }, []);

  function fetchPage(page: number) {
    get(page);
  }
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
      <button onClick={() => fetchPage(page - 1)}>Prev</button>
      <button onClick={() => fetchPage(page + 1)}>Next</button>
      <div>Showing 4 of {total}</div>
      {isAdmin && (
        <button
          onClick={() =>
            create({ username: "test", email: "jes", password: "1234" })
          }
        >
          Create new!
        </button>
      )}
    </div>
  );
};

export default Home;
