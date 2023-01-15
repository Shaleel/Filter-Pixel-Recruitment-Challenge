import { createContext, useContext, useState } from "react";

//create a context, with createContext api
export const AuthContext = createContext({ user: null });

const AuthContextProvider = (props) => {
  // this state will be shared with all components
  const [user, setuser] = useState(null);

  return (
    // this is the provider providing state
    <AuthContext.Provider value={{ user, setuser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
export default AuthContextProvider;
