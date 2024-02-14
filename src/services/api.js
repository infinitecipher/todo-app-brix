import axios from "axios";
// axios.defaults.withCredentials = true;

const todoUrl = "http://localhost:8000/todos/";

const headers = {
  "Content-Type": "application/json",
};

export const addTodoAPI = (payload) => {
  //   const data = axios.post(todoUrl, payload);

  const data = axios({
    method: "post",
    url: todoUrl,
    headers: headers,
    data: payload,
    withCredentials: false,
  });

  return data;
};

export const getTodos = () => {
  //   const data = axios.post(todoUrl, payload);

  const data = axios({
    method: "get",
    url: todoUrl,
    headers: headers,
    withCredentials: false,
  });

  return data;
};
