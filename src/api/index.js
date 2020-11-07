import axios from "axios";

// const url = "http://localhost:5000/tasks";
const url = "https://todos-emre.herokuapp.com/tasks";

export const fetchTasks = () => axios.get(url);
export const createTask = (title) => axios.post(url, { title });
export const updateTask = (data) => axios.patch(url + `/${data.id}`, data);
export const deleteTask = (id) => axios.delete(url + `/${id}`);
export const deleteAllTasks = () => axios.delete(url);