import React from "react";
import api from "../api";
import { User } from "../types";
import { AuthContext } from "./authContext";

interface State {
  users: User[];
  page: number;
  total: number;
}
interface Context {
  state: State;
  actions: {
    get: (page?: number) => void;
    create: (user: Omit<User, "_id">) => void;
  };
}

const UsersContext = React.createContext({} as Context);

const initialState = { state: { users: [], total: 0, page: 0 } };
const UsersProvider: React.FC = ({ children }) => {
  const [data, setData] = React.useState<State>(initialState.state);
  const { token } = React.useContext(AuthContext);

  const [status, setStatus] =
    React.useState<"loading" | "done" | "error">("loading");
  async function get(page?: number) {
    try {
      const res = await api.getAll(page, token);
      setData({
        users: res.results,
        total: res.total,
        page: res.page,
      });
    } catch (error) {
      console.log(error);
      setStatus(error.message);
    }
  }

  function create(user: Omit<User, User["_id"]>) {
    const newUser = { ...user, _id: "81238" } as User;
    setData((data) => ({
      ...data,
      users: [newUser, ...data.users],
      total: data.total + 1,
    }));
  }

  return (
    <UsersContext.Provider value={{ state: data, actions: { get, create } }}>
      {children}
    </UsersContext.Provider>
  );
};

export { UsersContext, UsersProvider };
