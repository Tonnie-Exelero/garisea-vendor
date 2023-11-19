// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import { GET_ROLES, GET_FILTERED_ROLES } from "@api/admin/role";

// ** Others
import { Role } from "./types";
import { encryptData } from "@core/utils/encryption";

// Initial state.
const rolesInitialState = {
  edges: [
    {
      cursor: "",
      node: {
        id: "",
        name: "",
        slug: "",
        description: "",
        ability: "",
        permissions: [
          {
            id: "",
            name: "",
            slug: "",
            description: "",
            subjects: "",
          },
        ],
        users: [
          {
            id: "",
          },
        ],
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

interface RolesState {
  edges: {
    cursor: string;
    node: Role;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch Roles
export const fetchRoles = createAsyncThunk<Role, any, {}>(
  "appRoles/fetchRoles",
  async (roleData, { rejectWithValue }) => {
    const { first, last, after, before, ...rest } = roleData;
    const encryptedData = rest && encryptData(rest);
    const pagination = {
      ...(first && { first }),
      ...(last && { last }),
      ...(after && { after }),
      ...(before && { before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_ROLES,
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

// ** Fetch Filtered Roles
export const fetchFilteredRoles = createAsyncThunk<Role, any, {}>(
  "appRoles/fetchFilteredRoles",
  async (roleData, { rejectWithValue }) => {
    const { first, last, after, before, ...rest } = roleData;
    const encryptedData = rest && encryptData(rest);
    const pagination = {
      ...(first && { first }),
      ...(last && { last }),
      ...(after && { after }),
      ...(before && { before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_ROLES,
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

export const appRolesSlice = createSlice({
  name: "appRoles",
  initialState: {
    roles: <RolesState>{
      ...rolesInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state, action) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchRoles.fulfilled, (state, { payload }) => {
        // Reset state.
        state.roles = { ...rolesInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { roles }: any = payload;
        state.roles = roles;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchFilteredRoles.fulfilled, (state, { payload }) => {
        // Reset state.
        state.roles = { ...rolesInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { rolesFiltered }: any = payload;
        state.roles = rolesFiltered;
      });
  },
});

export default appRolesSlice.reducer;
