import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAlertContext } from "./alertContext";
import { auth } from "./firebase";

export const useAuthContext = () => {
  const { setAlert } = useAlertContext();
  const [user, loading, error] = useAuthState(auth);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => setAlert(error), [error, setAlert]);

  return {
    loading,
    user,
    login,
    logout,
  };
};
