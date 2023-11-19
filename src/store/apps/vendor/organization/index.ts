// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_ORGANIZATIONS,
  GET_FILTERED_ORGANIZATIONS,
} from "@api/vendor/organization";

// ** Others
import { Organization } from "./types";
import { encryptData } from "@core/utils/encryption";

// Initial state
const organizationsInitialState = {
  edges: [
    {
      cursor: "",
      node: {
        id: "",
        name: "",
        nicename: "",
        email: "",
        phone: "",
        address: "",
        address2: "",
        city: "",
        country: "",
        coverImage: "",
        logo: "",
        certificate: "",
        kraPin: "",
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

interface OrganizationsState {
  edges: {
    cursor: string;
    node: any;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch Organizations
export const fetchOrganizations = createAsyncThunk<Organization, any, {}>(
  "appOrganizations/fetchOrganizations",
  async (organizationData, { rejectWithValue }) => {
    const { first, last, after, before, ...rest } = organizationData;
    const encryptedData = rest && encryptData(rest);
    const pagination = {
      ...(first && { first }),
      ...(last && { last }),
      ...(after && { after }),
      ...(before && { before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_ORGANIZATIONS,
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

// ** Fetch Filtered Organizations
export const fetchFilteredOrganizations = createAsyncThunk<
  Organization,
  any,
  {}
>(
  "appOrganizations/fetchFilteredOrganizations",
  async (organizationData, { rejectWithValue }) => {
    const { first, last, after, before, ...rest } = organizationData;
    const encryptedData = rest && encryptData(rest);
    const pagination = {
      ...(first && { first }),
      ...(last && { last }),
      ...(after && { after }),
      ...(before && { before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_ORGANIZATIONS,
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

export const appOrganizationsSlice = createSlice({
  name: "appOrganizations",
  initialState: {
    organizations: <OrganizationsState>{
      ...organizationsInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state, action) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchOrganizations.fulfilled, (state, { payload }) => {
        // Reset state.
        state.organizations = { ...organizationsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { organizations }: any = payload;
        state.organizations = organizations;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchFilteredOrganizations.fulfilled, (state, { payload }) => {
        // Reset state.
        state.organizations = { ...organizationsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { organizationsFiltered }: any = payload;
        state.organizations = organizationsFiltered;
      });
  },
});

export default appOrganizationsSlice.reducer;
