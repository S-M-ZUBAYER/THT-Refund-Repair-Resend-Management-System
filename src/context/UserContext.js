import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext();

//create this component function pass data from one component to another

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logInPage, setLogInPage] = useState("");
  const [allRefundRequest, setAllRefundRequest] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");


  //use useEffect to get teh data from login user to manage the private route
  useEffect(() => {
    const storedUser = localStorage.getItem('RFuser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user from local storage:', error);
        toast.error("Error parsing user from local storage")
      }
    }

    //create functionalities to get the system language and set this value in language property
    if (navigator && navigator.language) {
      setSelectedLanguage(navigator.language);
    } else {
      // Fallback: return a default language code if not supported
      setSelectedLanguage('en-US'); // You can set your preferred default language code here
    }
    setLoading(false);
  }, []);



  //crate a object to pass share all these from all of the component by using use context

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    logInPage,
    setLogInPage,
    allRefundRequest,
    setAllRefundRequest,
    selectedLanguage,
    setSelectedLanguage
  };


  // share all the value into all children 
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserContext;
