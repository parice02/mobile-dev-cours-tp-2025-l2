import { useServer } from "@/contexts/server.context";
import { User } from "@/types/types";
import { createContext, useCallback, useContext, useMemo, useReducer } from "react";

const UserContext = createContext({
  user: null as User | null,
  setUser: () => {},
  deleteUser: () => {},
});

export const reducer = (state: User | null, action: { type: string; payload: User | null }) => {
  switch (action.type) {
    case "ADD_USER":
      return action.payload;
    case "DELETE_USER":
      return null;
    default:
      return state;
  }
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, dispatch] = useReducer(reducer, null);
  const { getAccountInfo } = useServer();

  const setUser = useCallback(async () => {
    const fetchedUser = await getAccountInfo();
    dispatch({ type: "ADD_USER", payload: fetchedUser });
  }, [dispatch, getAccountInfo]);

  const deleteUser = useCallback(() => {
    dispatch({ type: "DELETE_USER", payload: null });
  }, [dispatch]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      deleteUser,
    }),
    [user, setUser, deleteUser],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
