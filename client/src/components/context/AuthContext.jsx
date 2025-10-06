import { createContext, useState, useEffect } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [currentChat, setCurrentChat] = useState(null);

  const updateCurrentUser = (user) => {
    setCurrentUser(user);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <authContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentChat,
        setCurrentChat,
        updateCurrentUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
