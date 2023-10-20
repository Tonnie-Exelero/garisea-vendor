// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_USERS,
  GET_FILTERED_USERS,
  GET_USERS_BY_ROLE_ID,
  GET_USERS_BY_STATUS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from "@api/admin/user";

// ** Others
import { User } from "./types";
import { generateRandomString } from "@utils/random-string";

// Initial state.
const usersInitialState = {
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
        role: {
          id: "",
          name: "",
          slug: "",
        },
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

interface UsersState {
  edges: {
    cursor: string;
    node: Partial<User>;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch Users
export const fetchUsers = createAsyncThunk<User, any, {}>(
  "appUsers/fetchUsers",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_USERS,
        variables: userData,
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

// ** Fetch Filtered Users
export const fetchFilteredUsers = createAsyncThunk<User, any, {}>(
  "appUsers/fetchFilteredUsers",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_USERS,
        variables: userData,
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

// ** Fetch Users By Role
export const fetchUsersByRole = createAsyncThunk<User, any, {}>(
  "appUsers/fetchUsersByRole",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_USERS_BY_ROLE_ID,
        variables: userData,
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

// ** Fetch Users By Status
export const fetchUsersByStatus = createAsyncThunk<User, any, {}>(
  "appUsers/fetchUsersByStatus",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_USERS_BY_STATUS,
        variables: userData,
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

// ** Create User
export const addUser = createAsyncThunk<User, Partial<User>, {}>(
  "appUsers/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_USER,
        variables: { ...userData },
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

// ** Update User
export const editUser = createAsyncThunk<User, Partial<User>, {}>(
  "appUsers/editUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_USER,
        variables: { ...userData },
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

// ** Delete User
export const removeUser = createAsyncThunk<User, Partial<User>, {}>(
  "appUsers/removeUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_USER,
        variables: { id: userData.id },
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

export const appUsersSlice = createSlice({
  name: "appUsers",
  initialState: {
    users: <UsersState>{
      ...usersInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        // Reset state.
        state.users = { ...usersInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { users }: any = payload;
        state.users = users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchFilteredUsers.fulfilled, (state, { payload }) => {
        // Reset state.
        state.users = { ...usersInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { usersFiltered }: any = payload;
        state.users = usersFiltered;
      })
      .addCase(fetchUsersByRole.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchUsersByRole.fulfilled, (state, { payload }) => {
        // Reset state.
        state.users = { ...usersInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { usersByRoleId }: any = payload;
        state.users = usersByRoleId;
      })
      .addCase(fetchUsersByRole.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(fetchUsersByStatus.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchUsersByStatus.fulfilled, (state, { payload }) => {
        // Reset state.
        state.users = { ...usersInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { usersByStatus }: any = payload;
        state.users = usersByStatus;
      })
      .addCase(fetchUsersByStatus.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      })
      .addCase(addUser.fulfilled, (state, { payload }) => {
        const { createUser }: any = payload;

        const newUser = {
          cursor: generateRandomString(12),
          node: { ...createUser },
        };
        state.users.edges.push(newUser);
      })
      .addCase(editUser.fulfilled, (state, { payload }) => {
        const { updateUser }: any = payload;
        const { id, ...rest } = updateUser;

        state.users.edges.some((user) => {
          if (user.node.id === updateUser.id) {
            return {
              ...user,
              node: {
                ...user.node,
                rest,
              },
            };
          }
        });
      })
      .addCase(removeUser.fulfilled, (state, { payload }) => {
        const { deleteUser }: any = payload;

        if (state.users.edges.some((user) => user.node.id === deleteUser.id)) {
          state.users.edges.filter((user) => user.node.id !== deleteUser.id);
        }
      });
  },
});

export default appUsersSlice.reducer;
