import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
    const success = handleInputErrors({ fullName,username,password,confirmPassword,gender });
    if (!success) return; // if there are some problems in the inputs return out of the function

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
      });
      const data = await res.json(); // get the response in json format
      if(data.error){
         throw new Error(data.error); // this will catch inside the catch block and show the toast
      }
       
      //set the user in local storage
      //and we will update our context
      // so when we refresh our page we can get that value from local storage that we know that we are logged in or not

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return { signup, loading };

};

export default useSignup;

const handleInputErrors = ({ fullName, username, password, confirmPassword, gender }) => {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
};
