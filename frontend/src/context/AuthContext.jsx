import { createContext, useState, useContext } from "react";

// Create a context for authentication
export const AuthContext = createContext();

// Create a custom hook to access the authentication context
export const useAuthContext = () => {
  return useContext(AuthContext);
}

// Provider component to manage authentication state
export const AuthContextProvider = ({ children }) => {
  // Retrieve the current user from localStorage.
  // If the value is empty, we initialize authUser to null.
  // Use JSON.parse to convert the string from localStorage into an object.
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// The AuthContextProvider wraps the entire app,
// allowing access to authentication context values throughout the component tree.
