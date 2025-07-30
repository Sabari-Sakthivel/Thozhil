import { createSlice } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    loading: false,
    jobs: [],
    error: null,
  },
  reducers: {
    jobsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    jobsSuccess(state, action) {
      state.loading = false;
      state.jobs = action.payload.data;
    },
    jobsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { jobsRequest, jobsSuccess, jobsFail } = jobsSlice.actions;
export default jobsSlice.reducer;
