import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
require("dotenv").config();

ROOT_URL = process.env.ROOT_URL;

export const storeData = () => {
  axios.post(`${rootUrl}/data.json, value`);
  // 1. data kan behöva fyllas i parentesen för vad som ska postas till firebase.
  // 2. filnamn behöva tillkomma ex. axios.post(`${rootUrl}/data.json`, data);
  // 3. Infoga sedan komponenten ex. {storeData} i den filen och ex. storeData() i den funktionen som hanterar den data som ska sparas eller hämtas.
};

export const getData = async () => {
  const response = await axios.get(`${rootUrl}/data.json`);
  console.log(response.data);
  // Ex. på omformatering av hämtad data:
  // for (const 2 in response.data)
  // { const amount = response.data[key].amount; data.push({}) }
};

// 1. Datan som hämtas kan behöva formateras om. Kolla console.log(response.data) för att veta hur svaret ser ut.
