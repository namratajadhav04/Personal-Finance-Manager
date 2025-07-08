import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getTransaction = () => {
  return API.get("/alltransaction");
};

export const addTransaction = (data) => {
  API.post("/add", data);
};

export const editTransaction = (id, data) => {
  API.put("/edit/${_id}");
};

export const deleteTransaction = (id) => {
  API.delete("/delete/${_id}");
};
