import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Hidden } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import styles from "./ForgetPassword.module.css";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"© 2012-2020 Kobzo.com. All Rights Reserved."}
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

class ForgetPassword extends Component {
  state = {
    email: "",
    errorMessage: "",
    passwordSetMessage: "",
    errors: {
      email: "",
    },
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let errors = this.state.errors;
    if (!validEmailRegex.test(this.state.email)) {
      errors.email = "email is invalid";
    }
    this.setState({ ...this.state, errors });
    console.log("validate", validateForm(this.state.errors));
    if (!validateForm(this.state.errors)) {
      return console.error("Invalid Form");
    }
    console.log(this.state);
    axios
      .get("https://kobzo.store/logins//auth-api.php", {
        params: {
          email: this.state.email,
          ajax: 1,
        },
      })
      .then((response) => {
        console.log(response.data);
        const { success, errors } = response.data;
        if (success && success.length > 0) {
          // window.location.href = "https://www.kobzo.store";
          this.setState({
            ...this.state,
            passwordSetMessage: success[0],
          });
        }
        if (errors && errors.length > 0) {
          this.setState({ ...this.state, errorMessage: errors[0] });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        {this.state.errorMessage.length > 0 ? (
          <span className={styles.errorMessage}>{this.state.errorMessage}</span>
        ) : (
          ""
        )}
        {this.state.passwordSetMessage.length > 0 ? (
          <span className={styles.passwordSetMessage}>
            {this.state.passwordSetMessage}
          </span>
        ) : (
          ""
        )}
        <form className="form1" onSubmit={this.handleSubmit} noValidate>
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
            className={styles.txtf}
          />
          {errors.email.length > 0 && (
            <span className="error">{errors.email}</span>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.btn_grad}
          >
            Send
          </Button>
          <Grid container className={styles.buttons}>
            <Grid item xs>
              <Button
                onClick={() => this.props.changeAuthState("signin")}
                className={styles.buttonText}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => this.props.changeAuthState("signup")}
                className={styles.buttonText}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </form>
      </div>
    );
  }
}

export default ForgetPassword;
