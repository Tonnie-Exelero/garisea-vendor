// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import authedUser from "@redux/apps/auth";
import chat from "@redux/apps/chat";
import users from "@redux/apps/admin/user";
import singleUser from "@redux/apps/admin/user/single";
import vendors from "@redux/apps/vendor/vendor";
import customers from "@redux/apps/frontend/customer";
import email from "@redux/apps/email";
import invoice from "@redux/apps/invoice";
import calendar from "@redux/apps/calendar";
import permissions from "@redux/apps/admin/permission";
import singlePermission from "@redux/apps/admin/permission/single";
import roles from "@redux/apps/admin/role";
import singleRole from "@redux/apps/admin/role/single";
import brands from "@redux/apps/admin/brand";
import models from "@redux/apps/admin/model";
import vehicles from "@redux/apps/vendor/vehicle";
import singleVehicle from "@redux/apps/vendor/vehicle/single";

export const store = configureStore({
  reducer: {
    authedUser,
    users,
    singleUser,
    vendors,
    customers,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    singlePermission,
    roles,
    singleRole,
    brands,
    models,
    vehicles,
    singleVehicle,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
