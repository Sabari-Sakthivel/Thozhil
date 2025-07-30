import axios from "axios";
import { jobsFail, jobsRequest, jobsSuccess } from "../Slices/jobsSlices";

export const getJobs = () => {
  return async (dispatch) => {
    try {
      dispatch(jobsRequest());
      const { data } = await axios.get("http://localhost:4000/company/getalljobdetails");
      dispatch(jobsSuccess(data));
    } catch (error) {
      dispatch(jobsFail(error?.response?.data?.message || error.message));
    }
  };
};
