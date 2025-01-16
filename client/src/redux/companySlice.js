// import { createSlice } from "@reduxjs/toolkit";

// const companyInfoFromLocalStorage = window.localStorage.getItem("companyInfo");
// const initialState = {
//   company: companyInfoFromLocalStorage
//     ? JSON.parse(companyInfoFromLocalStorage)
//     : {},
// };

// const companySlice = createSlice({
//   name: "companyInfo",
//   initialState,
//   reducers: {
//     login(state, action) {
//       state.company = action.payload.company;
//     },
//     logout(state) {
//       state.company = null;
//       localStorage?.removeItem("companyInfo");
//     },
//     updateCompany(state, action) {
//       state.company = action.payload.updatedCompany;
//     },
//   },
// });

// export default companySlice.reducer;

// export const { login, logout, updateCompany } = companySlice.actions;
