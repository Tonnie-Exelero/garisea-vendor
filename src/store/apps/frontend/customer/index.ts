// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_CUSTOMERS,
  GET_CUSTOMERS_BY_STATUS,
  GET_FILTERED_CUSTOMERS,
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER,
  UPDATE_PASSWORD,
  UPDATE_EMAIL_VERIFIED,
  DELETE_CUSTOMER,
} from "@api/frontend/customer";

// ** Others
import { Customer } from "./types";
import { generateRandomString } from "@utils/random-string";

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

// ** Create Customer
export const addCustomer = createAsyncThunk<Customer, Partial<Customer>, {}>(
  "appCustomers/addCustomer",
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
  "appCustomers/editCustomer",
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
  "appCustomers/editPassword",
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
  "appCustomers/editEmailVerified",
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
  "appCustomers/removeCustomer",
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
      })
      .addCase(addCustomer.fulfilled, (state, { payload }) => {
        const { createCustomer }: any = payload;

        const newCustomer = {
          cursor: generateRandomString(12),
          node: { ...createCustomer },
        };
        state.customers && state.customers.edges.push(newCustomer);
      })
      .addCase(editCustomer.fulfilled, (state, { payload }) => {
        const { updateCustomer }: any = payload;
        const { id, ...rest } = updateCustomer;

        state.customers.edges.map((customer) => {
          if (customer.node.id === updateCustomer.id) {
            return {
              ...customer,
              node: {
                ...customer.node,
                rest,
              },
            };
          }
        });
      })
      .addCase(editPassword.fulfilled, (state, { payload }) => {
        const { updateCustomerPassword }: any = payload;
        const { id, ...rest } = updateCustomerPassword;

        state.customers.edges.map((customer) => {
          if (customer.node.id === updateCustomerPassword.id) {
            return {
              ...customer,
              node: {
                ...customer.node,
                rest,
              },
            };
          }
        });
      })
      .addCase(editEmailVerified.fulfilled, (state, { payload }) => {
        const { updateCustomerEmailVerified }: any = payload;
      })
      .addCase(removeCustomer.fulfilled, (state, { payload }) => {
        const { deleteCustomer }: any = payload;

        if (
          state.customers.edges.some(
            (customer) => customer.node.id === deleteCustomer.id
          )
        ) {
          state.customers.edges.filter(
            (customer) => customer.node.id !== deleteCustomer.id
          );
        }
      });
  },
});

export default appCustomersSlice.reducer;
