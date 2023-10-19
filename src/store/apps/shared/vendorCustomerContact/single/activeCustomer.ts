// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import { GET_CUSTOMER_BY_ID } from "@api/frontend/customer";

// ** Others
import { Customer } from "../../../frontend/customer/types";

// ** Customer initial state
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
  onlineStatus: "",
};

// ** Fetch Customer By ID
export const fetchActiveCustomerById = createAsyncThunk<
  Customer,
  { id: string },
  {}
>(
  "appVendorCustomerContact/fetchActiveCustomerById",
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

export const appVendorCustomerActiveContactSlice = createSlice({
  name: "appVendorCustomerContact",
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
      .addCase(fetchActiveCustomerById.pending, (state, action) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchActiveCustomerById.fulfilled, (state, { payload }) => {
        // Reset customer state.
        state.customer = { ...customerInitialState };

        if (state.loading === "pending") {
          const { customerById }: any = payload;

          state.loading = "";
          state.customer = customerById;
        }
      })
      .addCase(fetchActiveCustomerById.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      });
  },
});

export default appVendorCustomerActiveContactSlice.reducer;
