// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_ORGANIZATIONS,
  GET_FILTERED_ORGANIZATIONS,
  CREATE_ORGANIZATION,
  UPDATE_ORGANIZATION,
  DELETE_ORGANIZATION,
} from "@api/vendor/organization";

// ** Others
import { Organization } from "./types";
import { generateRandomString } from "@utils/random-string";

// Initial state
const organizationsInitialState = {
  edges: [
    {
      cursor: "",
      node: {
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        address2: "",
        city: "",
        country: "",
        logo: "",
        certificate: "",
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
    try {
      const { data } = await apolloClient.query({
        query: GET_ORGANIZATIONS,
        variables: organizationData,
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
    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_ORGANIZATIONS,
        variables: organizationData,
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

// ** Create Organization
export const addOrganization = createAsyncThunk<Organization, any, {}>(
  "appOrganizations/addOrganization",
  async (organizationData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_ORGANIZATION,
        variables: { ...organizationData },
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

// ** Update Organization
export const editOrganization = createAsyncThunk<Organization, any, {}>(
  "appOrganizations/editOrganization",
  async (organizationData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_ORGANIZATION,
        variables: { ...organizationData },
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

// ** Delete Organization
export const removeOrganization = createAsyncThunk<Organization, any, {}>(
  "appOrganizations/removeOrganization",
  async (organizationData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_ORGANIZATION,
        variables: { id: organizationData.id },
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
      })
      .addCase(addOrganization.fulfilled, (state, { payload }) => {
        const { createOrganization }: any = payload;

        const newOrganization = {
          cursor: generateRandomString(12),
          node: { ...createOrganization },
        };
        state.organizations && state.organizations.edges.push(newOrganization);
      })
      .addCase(editOrganization.fulfilled, (state, { payload }) => {
        const { updateOrganization }: any = payload;
        const { id, ...rest } = updateOrganization;

        state.organizations.edges.map((organization) => {
          if (organization.node.id === updateOrganization.id) {
            return {
              ...organization,
              node: {
                ...organization.node,
                rest,
              },
            };
          }
        });
      })
      .addCase(removeOrganization.fulfilled, (state, { payload }) => {
        const { deleteOrganization }: any = payload;

        if (
          state.organizations.edges.some(
            (organization) => organization.node.id === deleteOrganization.id
          )
        ) {
          state.organizations.edges.filter(
            (organization) => organization.node.id !== deleteOrganization.id
          );
        }
      });
  },
});

export default appOrganizationsSlice.reducer;
