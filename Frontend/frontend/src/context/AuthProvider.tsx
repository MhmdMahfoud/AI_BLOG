import { useEffect, useState, useCallback, type ReactNode } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext, type AuthContextType, type User } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Exposed checkAuth for manual calls (e.g. manually refreshing user state)
  const checkAuth = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/users/me", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial auth check runs strictly once on component mount
  useEffect(() => {
    let isMounted = true;

    axios
      .get("http://localhost:5000/users/me", { withCredentials: true })
      .then((res) => {
        if (isMounted) setUser(res.data.user);
      })
      .catch(() => {
        if (isMounted) setUser(null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []); // Empty array prevents render loops and linter cascading errors

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/users/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
      toast.success("Login successful");
      return { success: true };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Login failed"
        );
      } else {
        toast.error("Login failed");
      }
      return { success: false };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/users/register",
        { name, email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
      toast.success("Registration successful!");
      return { success: true };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Registration failed"
        );
      } else {
        toast.error("Registration failed");
      }
      return { success: false };
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    checkAuth,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};