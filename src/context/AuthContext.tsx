// ** React Imports
import { createContext, useEffect, useState, ReactNode } from "react";
import toast from "react-hot-toast";

// ** Next Import
import { useRouter } from "next/router";

// ** Config
import authConfig from "src/configs/auth";

// ** Types
import { AuthValuesType, LoginParams, UserDataType } from "./types";
import { signIn } from "@redux/apps/auth";

// ** Others
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/index";
import { encryptData, decryptData } from "@utils/encryption";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  // ** Hooks
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      setLoading(true);

      window.localStorage.removeItem("uD");
      window.localStorage.removeItem("rT");
      window.localStorage.removeItem("aT");
      setUser(null);

      setLoading(false);
      if (
        authConfig.onTokenExpiration === "logout" &&
        !router.pathname.includes("login")
      ) {
        router.replace("/login");
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (params: LoginParams) => {
    setLoading(true);

    try {
      const resultAction = await dispatch(signIn({ ...params }));

      if (signIn.fulfilled.match(resultAction)) {
        // user will have a type signature of User as we passed that as the Returned parameter in createAsyncThunk
        const user = resultAction.payload;
        const { loginUser }: any = user;

        if (loginUser) {
          window.localStorage.setItem(
            authConfig.storageTokenKeyName,
            loginUser.token
          );

          const returnUrl = router.query.returnUrl;

          setUser({ ...loginUser });
          window.localStorage.setItem("uD", encryptData(loginUser));

          const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";

          setLoading(false);
          router.replace(redirectURL as string);
        }

        // Remove login error message
        window.localStorage.removeItem("lE");
        window.localStorage.removeItem("iT");

        toast.success(`Login successful!`);
      } else {
        toast.error(
          `An error occurred while signing in. Check your credentials and try again.`
        );
        window.localStorage.setItem(
          "lE",
          "An error occurred while signing in. Check your credentials and try again."
        );
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        `An error occurred while signing in. Check your credentials and try again.`
      );
      setLoading(false);
      window.location.reload();
      return;
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("uD");
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    router.push("/login");
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
