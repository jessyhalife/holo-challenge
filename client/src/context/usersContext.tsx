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
  status: "loading" | "error" | "done";
  actions: {
    get: (page?: number) => void;
    create: (user: Omit<User, "_id">) => void;
  };
}

const UsersContext = React.createContext({} as Context);

const initialState = {
  state: { users: [], total: 0, page: 0 },
};
const UsersProvider: React.FC = ({ children }) => {
  const [data, setData] = React.useState<State>(initialState.state);
  const { token } = React.useContext(AuthContext);

  const [status, setStatus] =
    React.useState<"loading" | "done" | "error">("loading");

  React.useEffect(() => {
    get(0);
  }, []);

  async function get(page?: number) {
    try {
      setStatus("loading");
      const res = await api.getAll(page, token);

      setData({
        users: res.results,
        total: res.total,
        page: res.page,
      });
      setStatus("done");
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  }

  async function create(user: Omit<User, User["_id"]>) {
    try {
      await api.create(user as Omit<User, "_id">, token);
      await get(0);
    } catch (err) {
      console.log(err.message);
      setStatus("error");
    }
  }

  return (
    <UsersContext.Provider
      value={{ state: data, actions: { get, create }, status }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersContext, UsersProvider };
