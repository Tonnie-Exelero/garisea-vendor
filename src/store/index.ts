// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import authedVendor from "@redux/apps/auth";
import vendors from "@redux/apps/vendor/vendor";
import singleVendor from "@redux/apps/vendor/vendor/single";
import customers from "@redux/apps/frontend/customer";
import singleCustomer from "@redux/apps/frontend/customer/single";
import brands from "@redux/apps/admin/brand";
import singleBrand from "@redux/apps/admin/brand/single";
import models from "@redux/apps/admin/model";
import vehicles from "@redux/apps/vendor/vehicle";
import singleVehicle from "@redux/apps/vendor/vehicle/single";
import organizations from "@redux/apps/vendor/organization";
import singleOrganization from "@redux/apps/vendor/organization/single";

export const store = configureStore({
  reducer: {
    authedVendor,
    vendors,
    singleVendor,
    customers,
    singleCustomer,
    brands,
    singleBrand,
    models,
    vehicles,
    singleVehicle,
    organizations,
    singleOrganization,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
