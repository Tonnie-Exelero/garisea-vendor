// ** React Imports
import { createContext, useEffect, useState, ReactNode } from "react";
import toast from "react-hot-toast";

// ** Next Import
import { useRouter } from "next/router";

// ** Config
import authConfig from "src/configs/auth";

// ** Types
import { AuthValuesType, LoginParams, VendorDataType } from "./types";
import { signIn, logOut } from "@redux/apps/auth";

// ** Others
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/index";
import { decryptData, encryptData } from "@utils/encryption";
import { decodeToken } from "@src/configs/jwt";

// ** Defaults
const defaultProvider: AuthValuesType = {
  vendor: null,
  loading: true,
  setVendor: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  softLogout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [vendor, setVendor] = useState<VendorDataType | null>(
    defaultProvider.vendor
  );
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
      setVendor(null);

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
        // vendor will have a type signature of Vendor as we passed that as the Returned parameter in createAsyncThunk
        const vendor = resultAction.payload;
        const { loginVendor }: any = vendor;

        if (loginVendor) {
          window.localStorage.setItem(
            authConfig.storageTokenKeyName,
            loginVendor.token
          );

          const returnUrl = router.query.returnUrl;

          const decryptedPayload = decryptData(loginVendor.token);
          const vendorData: any = await decodeToken(decryptedPayload);

          setVendor({ ...vendorData?.vendor, role: "superadmin" });
          window.localStorage.setItem("uD", encryptData(loginVendor));

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

  const handleLogout = async () => {
    setLoading(true);

    try {
      const resultAction = await dispatch(logOut({ email: vendor?.email }));

      if (logOut.fulfilled.match(resultAction)) {
        // vendor will have a type signature of Vendor as we passed that as the Returned parameter in createAsyncThunk
        const vendor = resultAction.payload;
        const { logoutVendor }: any = vendor;

        if (logoutVendor.email) {
          toast.success(`Logged out successfully.`, { duration: 2000 });

          setVendor(null);
          setLoading(false);

          window.localStorage.removeItem("uD");
          window.localStorage.removeItem(authConfig.storageTokenKeyName);
          router.push("/login");
        } else {
          toast.error(`An error occurred while logging out. Try again.`);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(`An error occurred while logging out. Try again.`);
      setLoading(false);
      return;
    }
  };

  const handleSoftLogout = async () => {
    setLoading(true);

    try {
      const resultAction = await dispatch(logOut({ email: vendor?.email }));

      if (logOut.fulfilled.match(resultAction)) {
        // vendor will have a type signature of Vendor as we passed that as the Returned parameter in createAsyncThunk
        const vendor = resultAction.payload;
        const { logoutVendor }: any = vendor;

        if (logoutVendor.email) {
          setVendor(null);
          setLoading(false);

          window.localStorage.removeItem("uD");
          window.localStorage.removeItem(authConfig.storageTokenKeyName);

          router.replace({
            pathname: "/login",
            query: { returnUrl: router.asPath },
          });
        } else {
          toast.error(`An error occurred while logging out. Try again.`);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(`An error occurred while logging out. Try again.`);
      setLoading(false);
      return;
    }
  };

  const values = {
    vendor,
    loading,
    setVendor,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    softLogout: handleSoftLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
