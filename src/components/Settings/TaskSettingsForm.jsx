import React, { useState, useEffect } from "react";
// import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import store from "../../store";
import TextField from "@material-ui/core/TextField";
import { UPDATE_TASK, ADD_TASKS_FROM_STORE } from "../../actions/TaskActions";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import API from "../../utils/API";

export default function TaskSettingsForm(props) {
  const storeState = useSelector((state) => state);
  const [estimatedPoms, setEstimatedPoms] = useState({
    poms: ""
  });
  const [inputState, setInputState] = useState({
    taskName: ""
  });

  const handleUpdate = () => {
    if (inputState.taskName.length === 0) {
      alert("Task Name can not be empty");
    } else {
      updateTask(props.currentItem.id, inputState.taskName, estimatedPoms.poms, false);
      props.handleClose();
    }
  };

  const updateTask = async (id, taskName, estimatedPoms, isComplete) => {
    try {
      await API.taskUpdate(id, taskName, estimatedPoms, isComplete);
      return store.dispatch({ type: UPDATE_TASK, payload: [] });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async () => {
    try {
      await API.taskRemove(props.currentItem.id);
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    deleteTask();
    props.handleClose();
  };

  useEffect(() => {
    if (estimatedPoms.poms.length === 0) {
      setEstimatedPoms({ poms: props.estimatedPoms.estimatedPoms });
    }
    setInputState({ taskName: props.currentItem.taskName });

    if (storeState.taskList.loading === true) {
      getTasks(storeState.userInfo.userDetails.id);
    }
  }, [props.currentItem, props.estimatedPoms, estimatedPoms, storeState]);

  const handleChange = (event) => {
    setInputState({ ...inputState, [event.target.name]: event.target.value });
  };

  const handlePomChange = (event) => {
    setEstimatedPoms({ poms: event.target.value });
  };
  const handleComplete = () => {
    updateTask(props.currentItem.id, inputState.taskName, estimatedPoms.poms, true);
    props.handleClose();
  };

  return (
    <FormControl component="fieldset">
      <h1 id="TaskSetting">Task Settings</h1>
      <FormGroup>
        <TextField
          label="Task Name"
          value={inputState.taskName}
          onChange={handleChange}
          type="text"
          name="taskName"
          placeholder="Enter Task"
          variant="outlined"
        />
        <Select label="Estimated Poms" value={estimatedPoms.poms} onChange={handlePomChange}>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
        <Grid style={{ marginTop: 20 }}>
          <Button className="modalbutton" variant="contained" onClick={handleUpdate}>
            Update
          </Button>
          <Button className="modalbutton" variant="contained" onClick={handleDelete} style={{ marginLeft: 20 }}>
            Delete
          </Button>
          <Button className="modalbutton" variant="contained" onClick={handleComplete} style={{ marginLeft: 20 }}>
            Complete
          </Button>
        </Grid>
      </FormGroup>
    </FormControl>
  );
}
