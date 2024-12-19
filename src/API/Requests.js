const axios = require("axios");
const { URLPaths } = require("../config");

const useRequest = async (url, method = "GET", payload = null) => {
  console.log("sending request to ", url);
  const options = {
    method,
    url: URLPaths.API_URL + url,
    headers: { "Content-Type": "application/json" },
    data: method === "POST" ? payload : null,
  };

  try {
    const response = await axios(options);
    return {
      data: response.data?.data || response.data,
      error:
        response.data?.error ||
        response.data?.data?.error ||
        response.error ||
        response.message?.error ||
        null,
      message:
        response.data?.message ||
        response.data?.data?.message ||
        response.message ||
        null,
    };
  } catch (error) {
    return { data: null, error: error.message, message: null };
  }
};

export { useRequest };
