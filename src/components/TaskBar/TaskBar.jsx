import { Button, FormControl, TextField } from "@material-ui/core";
import CreateTask from "./CreateTask";
import "../../assets/styles/styles.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import store from "../../store";
import { UPDATE_TASK, ADD_TASKS_FROM_STORE } from "../../actions/TaskActions";
import API from "../../utils/API";

const TaskBar = (props) => {
  const storeState = useSelector((state) => state);
  const [taskListState, setTaskListState] = useState({
    tasks: "",
    taskList: []
  });

  const handleTaskListChange = (e) => {
    setTaskListState({
      ...taskListState,
      tasks: e.target.value
    });
  };

  const sendTasks = async () => {
    try {
      await API.creatTask(storeState.userInfo.userDetails.id, taskListState.tasks, 1);
      return store.dispatch({ type: UPDATE_TASK, payload: [] });
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async (userId) => {
    try {
      const request = await API.findAllTasks(userId);
      request.data.forEach((item) => {
        store.dispatch({ type: ADD_TASKS_FROM_STORE, payload: item });
      });

      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaskSubmit = () => {
    sendTasks();
    if (taskListState.tasks.length < 1) {
      return;
    }

    const temp = taskListState.taskList;
    temp.push(taskListState.tasks);
    setTaskListState({
      ...taskListState,
      taskList: temp,
      tasks: ""
    });
  };

  useEffect(() => {
    if (storeState.taskList.loading === true) {
      console.log("hit");
      getTasks(storeState.userInfo.userDetails.id);
    }
    if (Object.keys(storeState.userInfo.userDetails).length === 0) {
      return;
    }
    console.log("userInfo.userDetails.id:", storeState.userInfo.userDetails.id);
  }, [storeState]);

  return (
    <>
      {/* onClick to register when the add task button is clicked */}
      <div className="taskBar">
        <FormControl>
          <TextField
            value={taskListState.tasks}
            onChange={handleTaskListChange}
            type="text"
            placeholder="Enter task"
          />
          <Button variant="contained" onClick={handleTaskSubmit} className="addtaskbtn">
            Add Task
          </Button>
          <CreateTask />
        </FormControl>
      </div>
    </>
  );
};

export default TaskBar;
