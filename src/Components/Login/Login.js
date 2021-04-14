import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import styles from "./Login.module.css";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright 2021 - KobZo SuperStore - All Rights Reserved."}
      {/* <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."} */}
    </Typography>
  );
}

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class Login extends Component {
  state = {
    email: "",
    password: "",
    submitLogin: 0,
    errors: {
      email: "",
      password: "",
    },
    errorMessage: "",
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };
  submitLogin = () => {
    this.setState({ submitLogin: 1 });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let errors = this.state.errors;
    if (!validEmailRegex.test(this.state.email)) {
      errors.email = "email is invalid";
    }
    if (this.state.password.length < 8) {
      errors.password = "password is invalid";
    }
    this.setState({ ...this.state, errors });

    console.log("validate", validateForm(this.state.errors));
    if (!validateForm(this.state.errors)) {
      return console.error("Invalid Form");
    }
    console.log(this.state);
    axios
      .get("https://kobzo.store/logins/login-api.php", {
        params: {
          email: this.state.email,
          password: this.state.password,
          submitLogin: this.state.submitLogin,
          ajax: 1,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success == true) {
          window.location.href = "https://www.kobzo.store/?superCustomer=1";
        } else {
          this.setState({
            ...this.state,
            errorMessage: "invalid email or password",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    // const classes = useStyles();
    const { errors } = this.state;
    return (
      <div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {this.state.errorMessage.length > 0 ? (
          <span className={styles.errorMessage}>{this.state.errorMessage}</span>
        ) : (
          ""
        )}
        <form className={styles.form} onSubmit={this.handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={this.handleChange}
            noValidate
          />
          {errors.email.length > 0 && (
            <span className="error">{errors.email}</span>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.handleChange}
            noValidate
          />
          {errors.password.length > 0 && (
            <span className="error">{errors.password}</span>
          )}
          {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.btn_grad}
            onClick={this.submitLogin}
          >
            Login
          </Button>
          <Grid container className={styles.buttons}>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
              Forgot password?
            </Link> */}
              <Button
                onClick={() => this.props.changeAuthState("forgetPassword")}
                className={styles.buttonText}
              >
                Forgot Password
              </Button>
            </Grid>
            <Grid item>
              {/* <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link> */}
              <Button
                onClick={() => this.props.changeAuthState("signup")}
                className={styles.buttonText}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
          <Box mt={5}>
            <center>
              <Copyright />
            </center>
          </Box>
        </form>
      </div>
    );
  }
}

export default Login;
