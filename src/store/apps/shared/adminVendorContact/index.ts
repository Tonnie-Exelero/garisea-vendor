// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_CONTACTS,
  GET_CONTACTS_BY_IDS,
} from "@api/shared/adminVendorContact";

// ** Others
import { AdminVendorContact } from "./types";
import { encryptData } from "@core/utils/encryption";

// Initial state.
const adminVendorContactsInitialState = {
  edges: [
    {
      cursor: "",
      node: {
        id: "",
        user: {
          id: "",
          firstName: "",
          lastName: "",
          image: "",
          onlineStatus: "",
        },
        vendor: {
          id: "",
          firstName: "",
          lastName: "",
          image: "",
          onlineStatus: "",
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

interface AdminVendorContactsState {
  edges: {
    cursor: string;
    node: AdminVendorContact;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch AdminVendorContacts
export const fetchAdminVendorContacts = createAsyncThunk<
  AdminVendorContact,
  any,
  {}
>(
  "appAdminVendorContacts/fetchAdminVendorContacts",
  async (adminVendorContactData, { rejectWithValue }) => {
    const encryptedData = adminVendorContactData && encryptData(adminVendorContactData);
    const pagination = {
      ...(adminVendorContactData.first && { first: adminVendorContactData.first }),
      ...(adminVendorContactData.last && { last: adminVendorContactData.last }),
      ...(adminVendorContactData.after && { after: adminVendorContactData.after }),
      ...(adminVendorContactData.before && { before: adminVendorContactData.before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_CONTACTS,
        variables: {
          ...(encryptedData && { pl: encryptedData }),
          ...pagination,
        },
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

// ** Fetch AdminVendorContacts By Ids
export const fetchAdminVendorContactsByIds = createAsyncThunk<
  AdminVendorContact,
  any,
  {}
>(
  "appAdminVendorContacts/fetchAdminVendorContactsByIds",
  async (adminVendorContactData, { rejectWithValue }) => {
    const encryptedData = adminVendorContactData && encryptData(adminVendorContactData);
    const pagination = {
      ...(adminVendorContactData.first && { first: adminVendorContactData.first }),
      ...(adminVendorContactData.last && { last: adminVendorContactData.last }),
      ...(adminVendorContactData.after && { after: adminVendorContactData.after }),
      ...(adminVendorContactData.before && { before: adminVendorContactData.before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_CONTACTS_BY_IDS,
        variables: {
          ...(encryptedData && { pl: encryptedData }),
          ...pagination,
        },
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

export const appAdminVendorContactsSlice = createSlice({
  name: "appAdminVendorContacts",
  initialState: {
    adminVendorContacts: <AdminVendorContactsState>{
      ...adminVendorContactsInitialState,
    },
    adminVendorContactsByIds: <AdminVendorContactsState>{
      ...adminVendorContactsInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminVendorContacts.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchAdminVendorContacts.fulfilled, (state, { payload }) => {
        // Reset state.
        state.adminVendorContacts = { ...adminVendorContactsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { adminVendorContacts }: any = payload;
        state.adminVendorContacts = adminVendorContacts;
      })
      .addCase(fetchAdminVendorContacts.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(
        fetchAdminVendorContactsByIds.fulfilled,
        (state, { payload }) => {
          // Reset state.
          state.adminVendorContactsByIds = {
            ...adminVendorContactsInitialState,
          };

          if (state.loading === "pending") {
            state.loading = "";
          }

          const { contactsByAdminVendorIds }: any = payload;
          state.adminVendorContactsByIds = contactsByAdminVendorIds;
        }
      );
  },
});

export default appAdminVendorContactsSlice.reducer;
