//TODO: remove server and put on renderers
const axios = require("axios");
const { URLPaths } = require("../config");

// export function get_request(address = "", retries = 3) {
//   return fetch(`${server}/${address}`, {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       console.error("Fetch error:", error);
//       if (retries > 0) {
//         console.warn(`Retrying... (${3 - retries + 1})`);
//         setTimeout(() => get_request(address, retries - 1), 1000);
//       } else {
//         console.error("Max retries reached.");
//         return []; // Fallback value
//       }
//     });
// }

// export function post_request(address = "", body = {}) {
//   fetch(`${server}/${address}`, {
//     method: "POST",
//     // body: JSON.stringify({ books: books }),
//     body: JSON.stringify(body),
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error("There was a problem with the fetch operation:", error);
//     });
// }

const useRequest = async (url, method = "GET", payload = null) => {
  const options = {
    method,
    url: URLPaths.API_URL + url,
    headers: { "Content-Type": "application/json" },
    data: method === "POST" ? payload : null,
  };

  try {
    const response = await axios(options);
    // console.log(response.data);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export { useRequest };
