// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  GET_USERS,
  GET_FILTERED_USERS,
  GET_USERS_BY_ROLE_ID,
  GET_USERS_BY_STATUS,
} from "@api/admin/user";

// ** Others
import { User } from "./types";
import { encryptData } from "@core/utils/encryption";

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
    const encryptedData = userData && encryptData(userData);
    const pagination = {
      ...(userData.first && { first: userData.first }),
      ...(userData.last && { last: userData.last }),
      ...(userData.after && { after: userData.after }),
      ...(userData.before && { before: userData.before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_USERS,
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

// ** Fetch Filtered Users
export const fetchFilteredUsers = createAsyncThunk<User, any, {}>(
  "appUsers/fetchFilteredUsers",
  async (userData, { rejectWithValue }) => {
    const encryptedData = userData && encryptData(userData);
    const pagination = {
      ...(userData.first && { first: userData.first }),
      ...(userData.last && { last: userData.last }),
      ...(userData.after && { after: userData.after }),
      ...(userData.before && { before: userData.before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_FILTERED_USERS,
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

// ** Fetch Users By Role
export const fetchUsersByRole = createAsyncThunk<User, any, {}>(
  "appUsers/fetchUsersByRole",
  async (userData, { rejectWithValue }) => {
    const encryptedData = userData && encryptData(userData);
    const pagination = {
      ...(userData.first && { first: userData.first }),
      ...(userData.last && { last: userData.last }),
      ...(userData.after && { after: userData.after }),
      ...(userData.before && { before: userData.before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_USERS_BY_ROLE_ID,
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

// ** Fetch Users By Status
export const fetchUsersByStatus = createAsyncThunk<User, any, {}>(
  "appUsers/fetchUsersByStatus",
  async (userData, { rejectWithValue }) => {
    const encryptedData = userData && encryptData(userData);
    const pagination = {
      ...(userData.first && { first: userData.first }),
      ...(userData.last && { last: userData.last }),
      ...(userData.after && { after: userData.after }),
      ...(userData.before && { before: userData.before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_USERS_BY_STATUS,
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
      });
  },
});

export default appUsersSlice.reducer;
