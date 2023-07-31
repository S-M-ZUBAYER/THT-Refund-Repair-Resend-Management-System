import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logInPage, setLogInPage] = useState("");
  const [allRefundRequest, setAllRefundRequest] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");

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

    // Check if the 'navigator' object and 'language' property are supported
    if (navigator && navigator.language) {
      setSelectedLanguage(navigator.language);
    } else {
      // Fallback: return a default language code if not supported
      setSelectedLanguage('en-US'); // You can set your preferred default language code here
    }

    setLoading(false);
  }, []);

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

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserContext;
