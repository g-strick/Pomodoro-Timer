import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { useSelector } from "react-redux";
import store from "../../store";
import { UPDATE_PROFILE } from "../../actions/UserActions";
import API from "../../utils/API";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function SnackAlert(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function Profile() {
  const storeState = useSelector((state) => state);
  // const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [inputState, setInputState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleFormSubmit = () => {
    if (inputState.firstName.length < 1) {
      setOpen(true);
    }
    if (inputState.lastName.length < 1) {
      setOpen(true);
    }
    if (inputState.email.length < 1) {
      setOpen(true);
    }
    if (inputState.password.length < 1) {
      setOpen(true);
    }
    store.dispatch({ type: UPDATE_PROFILE, payload: true });
    try {
      API.updateUserProfile(
        storeState.userInfo.userDetails.id,
        inputState.firstName,
        inputState.lastName,
        inputState.email,
        inputState.password
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (storeState.userInfo.loggedIn) {
      setInputState({
        firstName: storeState.userInfo.userDetails.firstName,
        lastName: storeState.userInfo.userDetails.lastName,
        email: storeState.userInfo.userDetails.email,
        password: ""
      });
    }
  }, [storeState]);
  const handleChange = (event) => {
    setInputState({ ...inputState, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormControl component="fieldset">
        <FormGroup>
          <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12} sm={12}>
              <TextField
                label="First Name"
                value={inputState.firstName}
                onChange={handleChange}
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                variant="outlined"
                className="textfieldbox"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Last Name"
                value={inputState.lastName}
                onChange={handleChange}
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                className="textfieldbox"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Email"
                value={inputState.email}
                onChange={handleChange}
                type="text"
                name="email"
                placeholder="Enter Email address"
                className="textfieldbox"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Password"
                value={inputState.password}
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Enter Password"
                className="textfieldbox"
                variant="outlined"
              />
            </Grid>
            <Grid item style={{ marginTop: 20 }}>
              <Button variant="contained" className="modalbutton" onClick={handleFormSubmit}>
                Update Info
              </Button>
            </Grid>
          </Grid>
        </FormGroup>
      </FormControl>
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <SnackAlert onClose={handleClose} severity="error">
            {"Field cannot be empty!"}
          </SnackAlert>
        </Snackbar>
      </div>
    </>
  );
}
