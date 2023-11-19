// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import { GET_MESSAGES } from "@api/shared/vendorCustomerMessage";

// ** Others
import { VendorCustomerMessage } from "./types";
import { encryptData } from "@core/utils/encryption";

// Initial state.
const vendorCustomerMessagesInitialState = {
  edges: [
    {
      cursor: "",
      node: {
        id: "",
        vendor: {
          id: "",
        },
        customer: {
          id: "",
        },
        vehicle: {
          id: "",
        },
        senderId: "",
        type: "",
        message: "",
        timeSent: "",
        isSent: false,
        isSeen: false,
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

interface VendorCustomerMessagesState {
  edges: {
    cursor: string;
    node: VendorCustomerMessage;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
  totalCount: number;
}

// ** Fetch VendorCustomerMessages
export const fetchVendorCustomerMessages = createAsyncThunk<
  VendorCustomerMessage,
  any,
  {}
>(
  "appVendorCustomerMessages/fetchVendorCustomerMessages",
  async (vendorCustomerMessageData, { rejectWithValue }) => {
    const { first, last, after, before, ...rest } = vendorCustomerMessageData;
    const encryptedData = rest && encryptData(rest);
    const pagination = {
      ...(first && { first }),
      ...(last && { last }),
      ...(after && { after }),
      ...(before && { before }),
    };

    try {
      const { data } = await apolloClient.query({
        query: GET_MESSAGES,
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

export const appVendorCustomerMessagesSlice = createSlice({
  name: "appVendorCustomerMessages",
  initialState: {
    vendorCustomerMessages: <VendorCustomerMessagesState>{
      ...vendorCustomerMessagesInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorCustomerMessages.pending, (state) => {
        if (state.loading === "") {
          state.loading = "pending";
        }
      })
      .addCase(fetchVendorCustomerMessages.fulfilled, (state, { payload }) => {
        // Reset state.
        state.vendorCustomerMessages = {
          ...vendorCustomerMessagesInitialState,
        };

        if (state.loading === "pending") {
          state.loading = "";
        }

        const { vendorCustomerMessages }: any = payload;
        state.vendorCustomerMessages = vendorCustomerMessages;
      })
      .addCase(fetchVendorCustomerMessages.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "";
          state.error = <any>action.error.message;
        }
      });
  },
});

export default appVendorCustomerMessagesSlice.reducer;
