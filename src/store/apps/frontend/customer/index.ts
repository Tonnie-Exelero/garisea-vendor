// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_CUSTOMERS,
  GET_CUSTOMERS_BY_STATUS,
  GET_FILTERED_CUSTOMERS,
} from "@api/frontend/customer";

// ** Others
import { Customer } from "./types";

// Initial state
const customersInitialState = {
  edges: [
    {
      cursor: "",
      node: {
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
      },
    },
  ],
  pageInfo: {
    endCursor: "",
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: "",
  },
  totalCount: 0,
};

interface CustomersState {
  edges: {
    cursor: string;
    node: Partial<Customer>;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch Customers
export const fetchCustomers = createAsyncThunk<Customer, any, {}>(
  "appCustomers/fetchCustomers",
  async (customerData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_CUSTOMERS,
        variables: customerData,
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

// ** Fetch Customers By Status
export const fetchCustomersByStatus = createAsyncThunk<Customer, any, {}>(
  "appCustomers/fetchCustomersByStatus",
  async (customerData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_CUSTOMERS_BY_STATUS,
        variables: customerData,
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

// ** Fetch Filtered Customers
export const fetchFilteredCustomers = createAsyncThunk<Customer, any, {}>(
  "appCustomers/fetchFilteredCustomers",
  async (customerData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_CUSTOMERS,
        variables: customerData,
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

export const appCustomersSlice = createSlice({
  name: "appCustomers",
  initialState: {
    customers: <CustomersState>{
      ...customersInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state, action) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchCustomers.fulfilled, (state, { payload }) => {
        // Reset state.
        state.customers = { ...customersInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { customers }: any = payload;
        state.customers = customers;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchFilteredCustomers.fulfilled, (state, { payload }) => {
        // Reset state.
        state.customers = { ...customersInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { customersFiltered }: any = payload;
        state.customers = customersFiltered;
      })
      .addCase(fetchCustomersByStatus.fulfilled, (state, { payload }) => {
        // Reset state.
        state.customers = { ...customersInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { customersByStatus }: any = payload;
        state.customers = customersByStatus;
      });
  },
});

export default appCustomersSlice.reducer;
