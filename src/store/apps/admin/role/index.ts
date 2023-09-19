// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_ROLES,
  GET_FILTERED_ROLES,
  CREATE_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
} from "@api/admin/role";

// ** Others
import { Role } from "./types";
import { generateRandomString } from "@utils/random-string";

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
            firstName: "",
            lastName: "",
            image: "",
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
    try {
      const { data } = await apolloClient.query({
        query: GET_ROLES,
        variables: roleData,
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
    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_ROLES,
        variables: roleData,
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

// ** Create Role
export const addRole = createAsyncThunk<Role, Partial<Role>, {}>(
  "appRoles/addRole",
  async (roleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_ROLE,
        variables: { ...roleData },
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

// ** Update Role
export const editRole = createAsyncThunk<Role, Partial<Role>, {}>(
  "appRoles/editRole",
  async (roleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_ROLE,
        variables: { ...roleData },
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

// ** Delete Role
export const removeRole = createAsyncThunk<Role, Partial<Role>, {}>(
  "appRoles/removeRole",
  async (roleData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_ROLE,
        variables: { id: roleData.id },
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
      })
      .addCase(addRole.fulfilled, (state, { payload }) => {
        const { createRole }: any = payload;

        const newRole = {
          cursor: generateRandomString(12),
          node: { ...createRole },
        };
        state.roles.edges.push(newRole);
      })
      .addCase(editRole.fulfilled, (state, { payload }) => {
        const { updateRole }: any = payload;
        const { id, ...rest } = updateRole;

        state.roles.edges.some((role) => {
          if (role.node.id === updateRole.id) {
            return {
              ...role,
              node: {
                ...role.node,
                rest,
              },
            };
          }
        });
      })
      .addCase(removeRole.fulfilled, (state, { payload }) => {
        const { deleteRole }: any = payload;

        if (state.roles.edges.some((role) => role.node.id === deleteRole.id)) {
          state.roles.edges.filter((role) => role.node.id !== deleteRole.id);
        }
      });
  },
});

export default appRolesSlice.reducer;
