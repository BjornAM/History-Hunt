import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

const url =
  "https://history-hunt-29859-default-rtdb.europe-west1.firebasedatabase.app/";

export const addNewData = (location, value, token) => {
  console.log(token);
  fetch(url + `${location}.json`, {
    method: "POST",
    body: JSON.stringify(value),
  }).then((resp) => {
    console.log(resp.status);
  });
};

export const getData = async (location) => {
  const resp = await fetch(url + `${location}.json/`);
  const data = await resp.json();
  return data;
};

// export const addData = (location, key, value) => {
//   const authCtx = useContext(AuthContext);
//   fetch(url + `${location}/${key}.json/?auth=` + authCtx.token, {
//     method: "PUT",
//     body: JSON.stringify(value),
//   }).then((resp) => {});
// };

// export const storeHunt = (places) => {
//   const jsonData = JSON.stringify(huntTitle);

//   axios
//     .post(`${url}/hunts.json`, places)
//     .then((response) => {
//       console.log("Success:", response.data);
//     })
//     .catch((error) => {
//       console.error("Error:", error.response.data);
//     });
// };

// export const getHunts = async () => {
//   axios.get(`${url}/hunts.json`);
// };
