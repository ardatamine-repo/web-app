import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth";
import organizationReducer from "./features/organizations";
import projectsReducer from "./features/projects";
import rolesReducer from "./features/roles";
import adminReducer from "./features/admin";
export const store = configureStore({
  reducer: {
    admin:adminReducer,
    auth: authReducer,
    organizations:organizationReducer,
    projects:projectsReducer,
    roles:rolesReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
