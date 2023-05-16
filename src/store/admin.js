import axios from "axios";

const admin = (state = [], action) => {
  if (action.type === "CREATE_ACCOUNT") {
    state = [...state, action.admin];
  }
  return state;
};

export const createAcc = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/admin", credentials);
    dispatch({ type: "CREATE_ACCOUNT", account: response.data });
  };
};

export default admin;
