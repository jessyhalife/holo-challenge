import React from "react";
import { UsersContext } from "../../context/usersContext";
import "./styles.css";

const Paginator = () => {
  const {
    state: { page, users, total },
    actions: { get },
  } = React.useContext(UsersContext);

  function fetchPage(page: number) {
    get(page);
  }
  return (
    <div>
      <small>
        Showing {users.length} of {total}
      </small>
      <div className="paginator__container">
        <button
          className="paginator__btn"
          onClick={() => (page > 1 ? fetchPage(page - 1) : undefined)}
        >
          Previous
        </button>
        <button className="paginator__btn" onClick={() => fetchPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Paginator;
