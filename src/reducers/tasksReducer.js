import * as type from "../constants/actionTypes.js";

const initialState = {
    tasks: [],
    fetching: true,
    // error: null, 
};

const taskReducer = (state = initialState, action) => {
    // Loading state
    if (action.type.endsWith(type.PENDING)) return { ...state, fetching: true };

    // Error state
    if (action.type.endsWith(type.REJECTED))
        return { ...state, fetching: false, error: action.payload };

    switch (action.type) {
        case type.FETCH_TASKS + type.FULFILLED:
            return {
                ...state,
                fetching: false,
                tasks: action.payload.data,
            };

        case type.ADD_TASK + type.FULFILLED:
            return {
                ...state,
                fetching: false,
                tasks: state.tasks.concat(action.payload.data),
            };

        case type.UPDATE_TASK + type.FULFILLED:
            return {
                ...state,
                fetching: false,
                tasks: state.tasks.map((task) =>
                    task._id === action.payload._id ? action.payload : task
                ),
            };

        case type.DELETE_TASK + type.FULFILLED:
            return {
                ...state,
                fetching: false,
                tasks: state.tasks.filter(
                    (task) => task._id !== action.payload.data
                ),
            };

        default:
            return state;
    }
};

export default taskReducer;
