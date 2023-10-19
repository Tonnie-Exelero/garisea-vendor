// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_CONTACTS,
  GET_CONTACTS_BY_IDS,
} from "@api/shared/vendorCustomerContact";

// ** Others
import { VendorCustomerContact } from "./types";

// Initial state.
const vendorCustomerContactsInitialState = {
  edges: [
    {
      cursor: "",
      node: {
        id: "",
        vendor: {
          id: "",
          firstName: "",
          lastName: "",
          image: "",
          storeLink: "",
          onlineStatus: "",
        },
        customer: {
          id: "",
          firstName: "",
          lastName: "",
          image: "",
          onlineStatus: "",
        },
        vehicle: {
          id: "",
          brand: {
            name: "",
          },
          model: {
            name: "",
          },
          trim: "",
          slug: "",
          yearOfManufacture: "",
          yearOfFirstRegistration: "",
        },
        latestMessageTime: "",
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

interface VendorCustomerContactsState {
  edges: {
    cursor: string;
    node: VendorCustomerContact;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch VendorCustomerContacts
export const fetchVendorCustomerContacts = createAsyncThunk<
  VendorCustomerContact,
  any,
  {}
>(
  "appVendorCustomerContacts/fetchVendorCustomerContacts",
  async (vendorCustomerContactData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_CONTACTS,
        variables: vendorCustomerContactData,
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

// ** Fetch VendorCustomerContacts By Ids
export const fetchVendorCustomerContactsByIds = createAsyncThunk<
  VendorCustomerContact,
  any,
  {}
>(
  "appVendorCustomerContacts/fetchVendorCustomerContactsByIds",
  async (vendorCustomerContactData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_CONTACTS_BY_IDS,
        variables: vendorCustomerContactData,
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

export const appVendorCustomerContactsSlice = createSlice({
  name: "appVendorCustomerContacts",
  initialState: {
    vendorCustomerContacts: <VendorCustomerContactsState>{
      ...vendorCustomerContactsInitialState,
    },
    vendorCustomerContactsByIds: <VendorCustomerContactsState>{
      ...vendorCustomerContactsInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorCustomerContacts.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchVendorCustomerContacts.fulfilled, (state, { payload }) => {
        // Reset state.
        state.vendorCustomerContacts = {
          ...vendorCustomerContactsInitialState,
        };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { vendorCustomerContacts }: any = payload;
        state.vendorCustomerContacts = vendorCustomerContacts;
      })
      .addCase(fetchVendorCustomerContacts.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(
        fetchVendorCustomerContactsByIds.fulfilled,
        (state, { payload }) => {
          // Reset state.
          state.vendorCustomerContactsByIds = {
            ...vendorCustomerContactsInitialState,
          };

          if (state.loading === "pending") {
            state.loading = "";
          }

          const { contactsByVendorCustomerVehicleIds }: any = payload;
          state.vendorCustomerContactsByIds =
            contactsByVendorCustomerVehicleIds;
        }
      );
  },
});

export default appVendorCustomerContactsSlice.reducer;
