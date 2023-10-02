// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_CUSTOMER_BY_ID,
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER,
  UPDATE_PASSWORD,
  UPDATE_EMAIL_VERIFIED,
  DELETE_CUSTOMER,
} from "@api/frontend/customer";

// ** Others
import { Customer } from "../types";

// Initial state
const customerInitialState = {
  id: "",
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  image: "",
  language: "",
  status: "",
  address: "",
  city: "",
  country: "",
  emailVerified: "",
};

// ** Fetch Customer By ID
export const fetchCustomerById = createAsyncThunk<Customer, { id: string }, {}>(
  "appCustomer/fetchCustomerById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_CUSTOMER_BY_ID,
        variables: { ...id },
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

// ** Create Customer
export const addCustomer = createAsyncThunk<Customer, Partial<Customer>, {}>(
  "appCustomer/addCustomer",
  async (customerData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_CUSTOMER,
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

// ** Update Customer
export const editCustomer = createAsyncThunk<Customer, Partial<Customer>, {}>(
  "appCustomer/editCustomer",
  async (customerData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_CUSTOMER,
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

// ** Update Password
export const editPassword = createAsyncThunk<Customer, Partial<Customer>, {}>(
  "appCustomer/editPassword",
  async (customerData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_PASSWORD,
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

// ** Update Email Verified
export const editEmailVerified = createAsyncThunk<
  Customer,
  Partial<Customer>,
  {}
>(
  "appCustomer/editEmailVerified",
  async (customerData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_EMAIL_VERIFIED,
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

// ** Delete Customer
export const removeCustomer = createAsyncThunk<Customer, Partial<Customer>, {}>(
  "appCustomer/removeCustomer",
  async (customerData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_CUSTOMER,
        variables: { id: customerData.id },
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

export const appCustomerSlice = createSlice({
  name: "appCustomer",
  initialState: {
    customer: <Customer>{
      ...customerInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerById.pending, (state, action) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchCustomerById.fulfilled, (state, { payload }) => {
        // Reset customer state.
        state.customer = { ...customerInitialState };

        const { customerById }: any = payload;

        state.customer = { ...customerById };
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(addCustomer.fulfilled, (state, { payload }) => {
        // Reset customer state.
        state.customer = { ...customerInitialState };

        const { createCustomer }: any = payload;

        state.customer = { ...createCustomer };
      })
      .addCase(editCustomer.fulfilled, (state, { payload }) => {
        // Reset customer state.
        state.customer = { ...customerInitialState };

        const { updateCustomer }: any = payload;

        state.customer = { ...updateCustomer };
      })
      .addCase(editPassword.fulfilled, (state, { payload }) => {
        // Reset customer state.
        state.customer = { ...customerInitialState };

        const { updateCustomerPassword }: any = payload;

        state.customer = { ...updateCustomerPassword };
      })
      .addCase(editEmailVerified.fulfilled, (state, { payload }) => {
        const { updateCustomerEmailVerified }: any = payload;
      })
      .addCase(removeCustomer.fulfilled, (state, { payload }) => {
        const { deleteCustomer }: any = payload;
      });
  },
});

export default appCustomerSlice.reducer;
