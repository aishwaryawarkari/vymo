import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./Main.module.css";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import ForgetPassword from "../ForgetPassword/ForgetPassword";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    // backgroundImage: "url(banner6.jpg)",
    backgroundImage: ` linear-gradient(to right , #e71c25, #ce172a)`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Main = () => {
  const [authState, setAuthState] = useState("signin");
  const classes = useStyles();

  const changeAuthState = (state) => {
    setAuthState(state);
  };

  let authComponent = <Login changeAuthState={changeAuthState} />;
  if (authState == "signup")
    authComponent = <Signup changeAuthState={changeAuthState} />;
  if (authState == "forgetPassword")
    authComponent = <ForgetPassword changeAuthState={changeAuthState} />;

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={false} sm={0} md={7} className={classes.image}>
        <Grid container>
          <Grid xs={2}></Grid>
          <Grid xs={8}>
            <h1 className={styles.h1}>WFH Store</h1>
            <h2 className={styles.h2}>
              An exclusive SuperStore for corporate employees.
            </h2>
            <center>
              <img src="banner111.png" className={styles.banner} />
            </center>

            <p className={styles.text}>
              For any support, please contact hello@kobzo.com or call us at
              9361133463 (10am - 6pm)
            </p>
            <Grid container>
              <Grid xs={2}></Grid>
              <Grid xs={8}>
                {/* <div className={styles.footer}>
                  <p className="copright">
                    Copyright 2021 - KobZo SuperStore - All Rights Reserved.
                  </p>
                </div> */}
              </Grid>
              <Grid xs={2}></Grid>
            </Grid>
          </Grid>
          <Grid xs={2}></Grid>
        </Grid>
        <Grid container>
          <Grid xs={2}></Grid>
          <Grid xs={8}>
            <Grid container>
              <Grid xs={2}></Grid>
              <Grid xs={8}>
                <div className={styles.footer}>
                  <p className="copright">
                    Copyright 2021 - KobZo SuperStore - All Rights Reserved.
                  </p>
                </div>
              </Grid>
              <Grid xs={2}></Grid>
            </Grid>
          </Grid>
          <Grid xs={2}></Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sm={12}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        <Grid container>
          <Grid xs={1}></Grid>
          <Grid xs={10}>
            <div className={classes.paper}>
              {/* <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar> */}
              {/* {authState == "signin" ? (
                <Login changeAuthState={changeAuthState} />
              ) : (
                <Signup changeAuthState={changeAuthState} />
              )} */}
              <img src="logo-vymo.png" className={styles.logo} />
              {authComponent}
              <div className={styles.footer}>
                <p className="copright1">
                  Copyright 2021 - KobZo SuperStore - All Rights Reserved.
                </p>
              </div>
            </div>
          </Grid>
          <Grid xs={1}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Main;
