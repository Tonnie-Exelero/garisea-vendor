// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import { GET_INTERESTS } from "@api/frontend/interest";

// ** Others
import { Interest } from "./types";
import { encryptData } from "@core/utils/encryption";

// Initial state
const interestsInitialState = {
  edges: [
    {
      cursor: "",
      node: {
        id: "",
        customer: {
          id: "",
          firstName: "",
          lastName: "",
          image: "",
          onlineStatus: "",
        },
        vehicle: {
          id: "",
          vendor: {
            id: "",
            storeLink: "",
            organization: {
              id: "",
              name: "",
              nicename: "",
            },
          },
          brand: {
            id: "",
            name: "",
          },
          model: {
            id: "",
            name: "",
          },
          trim: "",
          slug: "",
          yearOfManufacture: "",
          yearOfFirstRegistration: "",
          condition: "",
          images: "",
          viewingLocation: "",
          reserved: "",
          sold: "",
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

interface InterestsState {
  edges: {
    cursor: string;
    node: Partial<Interest>;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch Interests
export const fetchInterests = createAsyncThunk<Interest, any, {}>(
  "appInterests/fetchInterests",
  async (interestData, { rejectWithValue }) => {
    const { first, last, after, before, ...rest } = interestData;
    const encryptedData = rest && encryptData(rest);
    const pagination = {
      ...(first && { first }),
      ...(last && { last }),
      ...(after && { after }),
      ...(before && { before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_INTERESTS,
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

export const appInterestsSlice = createSlice({
  name: "appInterests",
  initialState: {
    interests: <InterestsState>{
      ...interestsInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInterests.pending, (state, action) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchInterests.fulfilled, (state, { payload }) => {
        // Reset state.
        state.interests = { ...interestsInitialState };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { interests }: any = payload;
        state.interests = interests;
      })
      .addCase(fetchInterests.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      });
  },
});

export default appInterestsSlice.reducer;
