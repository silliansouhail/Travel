import { configureStore } from "@reduxjs/toolkit";

import usersSlice from "./userSlice";
import offersSlice from "./offerSlice";

export default configureStore({
  reducer: {
    users: usersSlice,
    offers: offersSlice,
  },
});
