import axios from "@/api/axios";

const register = (credentials) => {
  return axios.post("/sign-up", credentials);
};
const login = (credentials) => {
  return axios.post("/api/auth/signin", credentials);
};
const getCurrentUser = () => {
  return axios.get("api/user/");
};
export default {
  register,
  login,
  getCurrentUser,
};
