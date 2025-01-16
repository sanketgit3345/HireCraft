import { createSlice } from "@reduxjs/toolkit";

const userInfoFromLocalStorage = window.localStorage.getItem("userInfo");
const initialState = {
  user: userInfoFromLocalStorage ? JSON.parse(userInfoFromLocalStorage) : {},
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
    },
    logout(state) {
      state.user = null;
      localStorage?.removeItem("userInfo");
    },
    updateUser(state, action) {
      state.user = action.payload.updatedUser;
    },
    updateJobWithApplicationId(state, action) {
      const { jobId, applicationId } = action.payload;
      const jobIndex = state.user.application.findIndex(
        (job) => job._id === jobId
      );
      if (jobIndex !== -1) {
        state.user.application[jobIndex].applications.push(applicationId);
      }
    },
  },
});

export default userSlice.reducer;

export function Login(user) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.login({ user }));
  };
}

export function Logout() {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.logout());
  };
}

export function UpdatedUser(updatedUser) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.updateUser({ updatedUser }));
  };
}

export function updateJobWithApplicationId(jobId, applicationId) {
  return (dispatch, getState) => {
    dispatch(
      userSlice.actions.updateJobWithApplicationId({ jobId, applicationId })
    );
  };
}
