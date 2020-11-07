import React from "react";
import PropTypes from "prop-types";
import { Dimmer, Loader, Item, Button, Grid } from "semantic-ui-react";
import EditableItemHeader from "../EditableItemHeader/EditableItemHeader";
import "./TaskList.css";

const TaskListView = ({ tasks, deleteHandler, updateHandler, fetching }) => {
    // console.log('Rendering Task List');
    if (!tasks.length && !fetching) {
        return (
            <p>
                You currently have no items!
                <br />
                Go add some below 👇
            </p>
        );
    }

    const mappedTasks = tasks.map((task) => {
        const completed = task.status === "completed";
        const nextStatusOnToggle = completed ? "incomplete" : "completed";

        return (
            <Item key={task._id} className={"task"}>
                <Item.Content>
                    <Grid stackable>
                        <Grid.Row divided>
                            <Grid.Column
                                computer={13}
                                tablet={12}
                                mobile={15}
                                className={"hoverable"}
                                verticalAlign={"middle"}
                            >
                                <EditableItemHeader
                                    title={task.title}
                                    completed={completed}
                                    onSubmitNewTitle={(newTitle) =>
                                        updateHandler({
                                            id: task._id,
                                            title: newTitle,
                                        })
                                    }
                                />
                            </Grid.Column>
                            <Grid.Column
                                floated="right"
                                computer={3}
                                tablet={4}   
                                mobile={1}
                            >
                                <Button
                                    icon="checkmark"
                                    color={completed ? "teal" : undefined}
                                    onClick={() =>
                                        updateHandler({
                                            id: task._id,
                                            status: nextStatusOnToggle,
                                        })
                                    }
                                />

                                <Button
                                    icon="remove"
                                    onClick={() => deleteHandler(task._id)}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Item.Content>
            </Item>
        );
    });

    return (
        <>
            <Item.Group divided>{mappedTasks}</Item.Group>

            <Dimmer active={fetching} inverted>
                <Loader inverted inline content="Loading" />
            </Dimmer>
        </>
    );
};

TaskListView.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object),
    deleteHandler: PropTypes.func,
    updateHandler: PropTypes.func,
    fetching: PropTypes.bool,
};

export default TaskListView;
