import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
     null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", inputs);
      // console.log(res.data)
      setCurrentUser(res.data);
      // console.log(currentUser)
    } catch(e) {
          
    }
  };

  const logout = async (inputs) => {
    try {
      await axios.post("/logout");
      setCurrentUser(null);
    } catch (e) {

    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login,logout }}>
      {children}
    </AuthContext.Provider>
  );
};