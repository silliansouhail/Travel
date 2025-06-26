import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "usersLogic",
  initialState: {
    users: [
      {
        id: 1,
        name: "testAgency",
        email: "test@test.com",
        password: "123456789",
        type: "agency",
        present: false,
        logoImag: "",
      },
      {
        id: 2,
        name: "Souhail",
        email: "souhail@test.com",
        password: "123456789",
        type: "admin",
        present: false,
        logoImag: "",
      },
      {
        id: 2,
        name: "testUser",
        email: "testUser@test.com",
        password: "123456789",
        type: "client",
        present: false,
        logoImag: "",
      },
    ],
    user: null,
  },
  reducers: {
    userSignIn: (state, actions) => {
      const { email, password } = actions.payload;
      const userIndex = state.users.findIndex(
        (user) => user.email === email && user.password === password
      );

      if (userIndex !== -1) {
        state.users[userIndex].present = true;
        state.user = state.users[userIndex];
      } else {
        alert("Invalid credentials, please try again.");
      }
    },

    userSignOut: (state) => {
      if (state.user) {
        const userIndex = state.users.findIndex(
          (user) => user.id === state.user.id
        );
        if (userIndex !== -1) {
          state.users[userIndex].present = false;
          state.user = null;
        }
      }
    },

    registerUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
  },
});

export const { userSignIn, userSignOut, registerUser } = userSlice.actions;

export default userSlice.reducer;
