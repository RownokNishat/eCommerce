import React, { createContext, useState } from "react";
export const AuthContext = createContext();
const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [toggle, settoggle] = useState(false);
  const authInfo = { user, setUser, toggle, settoggle };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Authprovider;
