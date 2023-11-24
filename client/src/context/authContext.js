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

  const update = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/update", inputs);
      // console.log(res.data)
      setCurrentUser(res.data);
      // console.log(currentUser)
    } catch(e) {
          
    }
  };

  const logout = async (inputs) => {
    try {
      setCurrentUser(null);
      localStorage.setItem("user", undefined);
    } catch (e) {

    }
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      const userObj = localStorage.getItem("user")
      setCurrentUser(JSON.parse(userObj))
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login,logout, update }}>
      {children}
    </AuthContext.Provider>
  );
};