import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Chart } from "react-google-charts";
import StatsTable from "../../components/StatsTable/StatsTable";
import tomSmall from "../../images/pomoduck_stats_smaller.png";
import tom from "../../images/pomoduck_Stats.png";
import { useMediaQuery } from "react-responsive";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    // backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 6, 4),
    backgroundColor: "#66bb6a",
    border: "2px #ef9a9a",
    color: "white",
    borderRadius: 20,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
}));

export default function SettingsModal() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 750px)"
  });

  const storeState = useSelector((state) => state);
  //This useEffect gets all of the users info after they are logged in
  //you can see their total stats on breaks, pomodoros with this
  useEffect(() => {
    if (storeState.userInfo.loggedIn) {
      // console.log(storeState.userInfo.userDetails);
    }
  }, [storeState]);

  const calcTotalLongBreak = () => {
    let longBreak = storeState.userInfo.userDetails.totalBigBreakSeconds; // eslint-disable-line
    return longBreak;
  };

  const calcTotalWork = () => {
    let totalWork = storeState.userInfo.userDetails.totalPomSeconds; // eslint-disable-line
    return totalWork;
  };

  const calcShortBreak = () => {
    let shortBreak = storeState.userInfo.userDetails.totalSmallBreakSeconds; // eslint-disable-line
    return shortBreak;
  };

  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="button" color="inherit" onClick={handleOpen}>
        <img src="/Assets/icons/graph-white.png" alt="Stats" className="signupIcon" />
        <div className="settingsTitle">Stats</div>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Stats Modal"
        aria-describedby="See your pomodoro stats here"
      >
        <div className={classes.paper} id="statsModal">
          <StatsTable stat={storeState.taskList.tasks} />
          {/* container start */}
          <Grid container spacing={3}>
            {/* chart start */}
            <Grid style={{ marginRight: -20, marginTop:20 }} xs={8}>
              <Chart
                width={"45vh"}
                height={"40vh"}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ["Works/Break", "Minutes per day"],
                  ["Long Breaks", calcTotalLongBreak()],
                  ["Short Breaks", calcShortBreak()],
                  ["Work", calcTotalWork()]
                ]}
                options={{
                  title: "Productivity",
                  // Just add this option
                  pieHole: 0.4
                }}
                rootProps={{ "data-testid": "3" }}
              />
            </Grid>
            {/* chart end */}
            <Grid xs={4} style={{ marginTop: 125 }}>
            {isDesktopOrLaptop && <img src={tom} alt="Stats Duck" />}
              </Grid>
          </Grid>
          {/* containter end */}
          <Grid style={{ marginTop: -20 }}>
            <Button variant="contained" className="modalbutton" onClick={handleClose} style={{ marginTop: -50 }}>
              Close
            </Button>
          </Grid>
        </div>
      </Modal>
    </>
  );
}
