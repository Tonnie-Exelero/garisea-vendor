// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import { VENDOR_LOGIN } from "@api/vendor/auth";

// ** Others
import { Vendor } from "../vendor/types";

// ** Login Vendor
export const vendorSignIn = createAsyncThunk<Vendor, Partial<Vendor>, {}>(
  "appVendorAuth/vendorSignIn",
  async (vendorData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: VENDOR_LOGIN,
        variables: { ...vendorData },
      });

      return data;
    } catch (err) {
      let error: any = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data);
    }
  }
);

export const appVendorAuthSlice = createSlice({
  name: "appVendorAuth",
  initialState: {
    user: <Partial<Vendor>>{
      id: "",
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      image: "",
      language: "",
      status: "",
      address: "",
      city: "",
      country: "",
      token: "",
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(vendorSignIn.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(vendorSignIn.fulfilled, (state, { payload }) => {
        const { loginVendor }: any = payload;

        if (state.loading === "pending") {
          state.loading = "";
          state.user = loginVendor;
        }
      })
      .addCase(vendorSignIn.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      });
  },
});

export default appVendorAuthSlice.reducer;
