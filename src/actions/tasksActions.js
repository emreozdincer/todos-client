import * as api from "../api";
import * as type from "../constants/actionTypes.js";

export const fetchTasks = () => (dispatch) => {
    dispatch({ type: type.FETCH_TASKS, payload: api.fetchTasks() });
};

export const addTask = (title) => async (dispatch) => {
    await dispatch({
        type: type.ADD_TASK,
        payload: api.createTask(title),
    });
};

export const deleteTask = (id) => async (dispatch) => {
    await dispatch({
        type: type.DELETE_TASK,
        payload: api.deleteTask(id),
    });
};

export const updateTask = (data) => async (dispatch) => {
    await dispatch({
        type: type.UPDATE_TASK,
        payload: api.updateTask(data),
    });

    dispatch(fetchTasks()); // whole page needs to change
};
