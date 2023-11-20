// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** API
import apolloClient from "@lib/apollo";
import {
  CREATE_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
} from "@api/shared/vendorCustomerContact";

// ** Others
import { VendorCustomerContact } from "../types";
import { encryptData } from "@core/utils/encryption";

// Initial state.
const vendorCustomerContactInitialState = {
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
};

// ** Create VendorCustomerContact
export const addVendorCustomerContact = createAsyncThunk<
  VendorCustomerContact,
  any,
  {}
>(
  "appVendorCustomerContact/addVendorCustomerContact",
  async (vendorCustomerContactData, { rejectWithValue }) => {
    const encryptedData = encryptData(vendorCustomerContactData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_CONTACT,
        variables: { pl: encryptedData },
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

// ** Update VendorCustomerContact
export const editVendorCustomerContact = createAsyncThunk<
  VendorCustomerContact,
  any,
  {}
>(
  "appVendorCustomerContact/editVendorCustomerContact",
  async (vendorCustomerContactData, { rejectWithValue }) => {
    const encryptedData = encryptData(vendorCustomerContactData);

    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_CONTACT,
        variables: { pl: encryptedData },
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

// ** Delete VendorCustomerContact
export const removeVendorCustomerContact = createAsyncThunk<
  VendorCustomerContact,
  any,
  {}
>(
  "appVendorCustomerContact/removeVendorCustomerContact",
  async (vendorCustomerContactData, { rejectWithValue }) => {
    const encryptedData = encryptData({ id: vendorCustomerContactData.id });

    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_CONTACT,
        variables: { pl: encryptedData },
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

export const appVendorCustomerContactSlice = createSlice({
  name: "appVendorCustomerContact",
  initialState: {
    vendorCustomerContact: <VendorCustomerContact>{
      ...vendorCustomerContactInitialState,
    },
    loading: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addVendorCustomerContact.fulfilled, (state, { payload }) => {
        // Reset vendorCustomerContact state.
        state.vendorCustomerContact = { ...vendorCustomerContactInitialState };

        const { createVendorCustomerContact }: any = payload;

        state.vendorCustomerContact = { ...createVendorCustomerContact };
      })
      .addCase(editVendorCustomerContact.fulfilled, (state, { payload }) => {
        // Reset vendorCustomerContact state.
        state.vendorCustomerContact = { ...vendorCustomerContactInitialState };

        const { updateVendorCustomerContact }: any = payload;

        state.vendorCustomerContact = { ...updateVendorCustomerContact };
      })
      .addCase(removeVendorCustomerContact.fulfilled, (state, { payload }) => {
        const { deleteVendorCustomerContact }: any = payload;
      });
  },
});

export default appVendorCustomerContactSlice.reducer;
