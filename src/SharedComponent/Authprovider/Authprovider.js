import React, { createContext, useState } from "react";
export const AuthContext = createContext();
const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const authInfo = { user, setUser };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Authprovider;
