import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Grid,
    Form,
    Header,
    Button,
    Modal,
    Icon,
    Checkbox,
} from "semantic-ui-react";

import TaskList from "../components/TaskList/TaskList";
import * as TaskActions from "../actions/tasksActions";
import { ASK_FOR_CONFIRM } from "../constants/storageKeys";
import "./Home.css";

const Home = () => {
    const readConfirmPreference = () => {
        return localStorage.getItem(ASK_FOR_CONFIRM);
    };

    const [newTaskInput, setNewTaskInput] = useState(""); // new task to be potentially added
    const [deletingId, setDeletingId] = useState(null); // id of the task to be potentially deleted
    const [askForConfirm, setAskForConfirm] = useState( // user's delete confirmation choice
        readConfirmPreference() === "true"
    );

    const dispatch = useDispatch();
    let { tasks, fetching } = useSelector((state) => state.tasks);

    // Fetch data on initialization
    useEffect(() => {
        dispatch(TaskActions.fetchTasks());
    }, [dispatch]);

    // Dispatches action to create a new task
    const handleAdd = () => {
        if (newTaskInput !== "") {
            dispatch(TaskActions.addTask(newTaskInput));
            setNewTaskInput("");
        }
    };

    // Dispatches action to update a task
    const handleUpdate = (data) => {
        dispatch(TaskActions.updateTask(data));
    };

    // Handles delete calls
    const handleDelete = (id) => {
        // skip confirmation if user settings are such
        if (!askForConfirm) dispatch(TaskActions.deleteTask(id));
        // otherwise, proceed with a pop-up modal
        else setDeletingId(id);
    };

    // Dispatches action to delete a task
    const handleDeleteConfirm = () => {
        dispatch(TaskActions.deleteTask(deletingId));
        setDeletingId(null);
    };

    // Updates local storage if user changes prefered setting
    const handleUpdateConfirmPreference = () => {
        localStorage.setItem(ASK_FOR_CONFIRM, !askForConfirm);
        setAskForConfirm(!askForConfirm);
    };

    return (
        <>
            <Grid container style={{ margin: 30 }} textAlign="center">
                <Grid.Row style={{ marginBottom: 20 }}>
                    <Grid.Column>
                        <Header size="huge" color="teal">
                            Your To-Do List 📝
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={12} tablet={12} mobile={16}>
                        <TaskList
                            tasks={tasks}
                            fetching={fetching}
                            updateHandler={handleUpdate}
                            deleteHandler={handleDelete}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ marginTop: 5 }}>
                    <Grid.Column computer={9} tablet={9} mobile={16}>
                        <Form>
                            <Form.Field>
                                <label style={{ float: "left" }}>
                                    Add a new task
                                </label>
                                <input
                                    placeholder="Order snacks from the app"
                                    value={newTaskInput}
                                    onChange={(e) =>
                                        setNewTaskInput(e.target.value)
                                    }
                                />
                            </Form.Field>
                            <Button
                                floated="left"
                                type="submit"
                                onClick={handleAdd}
                                color="orange"
                            >
                                Add Task
                            </Button>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
                {tasks.length > 0 && (
                    <Grid.Row style={{ marginTop: 20 }}>
                        <Grid.Column computer={9} mobile={7} floated="right">
                            <Checkbox
                                checked={askForConfirm}
                                label="Ask for delete confirmation"
                                onChange={handleUpdateConfirmPreference}
                            />
                        </Grid.Column>
                    </Grid.Row>
                )}
            </Grid>

            {deletingId && (
                <Modal
                    basic
                    onClose={() => setDeletingId(null)}
                    open={!!deletingId}
                    size="small"
                >
                    <Header icon>
                        <Icon name="archive" />
                        Delete Task
                    </Header>
                    <Modal.Content>
                        <p>
                            Are your sure you want to delete this task: "
                            {
                                tasks.find((task) => task._id === deletingId)
                                    .title
                            }
                            " ?
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            basic
                            color="red"
                            inverted
                            onClick={() => setDeletingId(null)}
                        >
                            <Icon name="remove" /> No
                        </Button>
                        <Button
                            color="green"
                            inverted
                            onClick={handleDeleteConfirm}
                        >
                            <Icon name="checkmark" /> Yes
                        </Button>
                    </Modal.Actions>
                </Modal>
            )}
        </>
    );
};

export default Home;
