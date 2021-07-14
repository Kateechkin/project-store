import axios from "axios";
import { getItem } from "@/helpers/persistanceStorage";

axios.defaults.baseURL = "https://storage.podrugems.ru/";
axios.interceptors.request.use((config) => {
  const token = getItem("accessTokenStore");
  const authorizationToken = token ? `${token}` : "";
  config.headers.Authorization = authorizationToken;
  // console.log(config);
  return config;
});

export default axios;
