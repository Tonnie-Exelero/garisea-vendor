// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import { CUSTOMER_LOGIN } from "@api/frontend/auth";

// ** Others
import { Customer } from "../customer/types";

// ** Login Customer
export const customerSignIn = createAsyncThunk<Customer, Partial<Customer>, {}>(
  "appCustomerAuth/customerSignIn",
  async (customerData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CUSTOMER_LOGIN,
        variables: { ...customerData },
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

export const appCustomerAuthSlice = createSlice({
  name: "appCustomerAuth",
  initialState: {
    user: <Partial<Customer>>{
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
      .addCase(customerSignIn.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(customerSignIn.fulfilled, (state, { payload }) => {
        const { loginCustomer }: any = payload;

        if (state.loading === "pending") {
          state.loading = "";
          state.user = loginCustomer;
        }
      })
      .addCase(customerSignIn.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      });
  },
});

export default appCustomerAuthSlice.reducer;
