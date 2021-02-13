import React, { useState } from "react";
import Header from "../../components/Header/Header";
import StatsTable from "../../components/StatsTable/StatsTable";
import Footer from "../../components/Footer/Footer";
import { Button, Grid } from "@material-ui/core";

// pass logged in?
const StatsPage = () => {
  const [statsState, setStatState] = useState({
    //   will be replaced with API call
    statsList: [
      {
        userId: "1",
        taskName: "Work on backend integration for web app.",
        estimatedPoms: "4",
        completedPoms: "1",
        completedSmallBreak: "2",
        createdAt: "2021-02-04 11:04:43"
      },
      {
        userId: "1",
        taskName: "Do produce stuff.",
        estimatedPoms: "5",
        completedPoms: "6",
        completedSmallBreak: "3",
        createdAt: "2021-02-04 11:04:44"
      },
      {
        userId: "1",
        taskName: "Make dummy data.",
        estimatedPoms: "1",
        completedPoms: "2",
        completedSmallBreak: "1",
        createdAt: "2021-02-04 11:04:45"
      }
    ]
  });

  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Header />
          <Grid item sm={12}>
            <StatsTable stat={statsState.statsList} />
          </Grid>
          <Grid container sm={12} alignItems="center" justify="center">

          </Grid>
          <Button onClick={setStatState}>I'm Useless!</Button>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={10} lg={8}> */}
              <Footer />
            {/* </Grid> */}
      </Grid>
    </>
  );
};

export default StatsPage;