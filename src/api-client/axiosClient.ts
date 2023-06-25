import axios, { AxiosError } from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use(
  async (config) => {
    /* handle token, add token to header */
    // console.log("base url: ", axiosClient.defaults.baseURL);
    return config;
  },
  (error) => {
    console.log(
      "middleware axiosClient always run before request, when got error"
    );
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    const { url } = response.config;
    /* andle response here, save token to local storage */
    return response;
  },
  function (error: AxiosError) {
    /* handle error for all request here */
  }
);

export default axiosClient;
