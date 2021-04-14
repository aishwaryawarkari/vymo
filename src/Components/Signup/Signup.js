import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import styles from "./Signup.module.css";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright 2021 - KobZo SuperStore - All Rights Reserved."}
      {/* <Link color="inherit" href="">
        Kobzo.com. All rights reserved
      </Link>{" "}
      {new Date().getFullYear()}
      {"."} */}
    </Typography>
  );
}

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const charOnly = RegExp(/^[a-zA-Z\s]*$/);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class Signup extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    customer_privacy: 0,
    psgdpr: 0,
    submitCreate: 0,
    // create_account: 0,
    errors: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      privacy: "",
      psgdpr: "",
    },
  };
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "firstname":
        this.setState({ ...this.state, firstname: value });

        if (!charOnly.test(value)) {
          errors.firstname = "Only letters are allowed";
        } else if (value.length === 0) {
          errors.firstname = "Firstname is required";
        } else {
          errors.firstname = "";
        }
        break;
      case "lastname":
        this.setState({ ...this.state, lastname: value });
        if (!charOnly.test(value)) {
          errors.lastname = "Only letters are allowed";
        } else if (value.length === 0) {
          errors.lastname = "Lastname is required";
        } else {
          errors.lastname = "";
        }
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      case "datapolicy":
        // this.setState({ customer_privacy: value });

        console.log(value);
        errors.privacy =
          this.state.customer_privacy === 1 ? "" : "please check";
        break;
      case "terms":
        // this.setState({ customer_privacy: value });
        this.setState({ ...this.state, psgdpr: 0 });
        console.log(value);
        errors.psgdpr = this.state.psgdpr === 1 ? "" : "please check";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };
  cutomer_change = () => {
    // this.setState({ customer_privacy: 1 });
    if (this.state.customer_privacy === 0) {
      this.setState({ customer_privacy: 1 });
    } else {
      this.setState({ customer_privacy: 0 });
    }
  };

  privacy_change = () => {
    if (this.state.psgdpr === 0) {
      this.setState({ psgdpr: 1 });
    } else {
      this.setState({ psgdpr: 0 });
    }
  };

  submitCreate = () => {
    this.setState({ submitCreate: 1 });
  };
  // create_account = () => {
  //   this.setState({ create_account: 1 });
  // };

  handleSubmit = (event) => {
    event.preventDefault();

    console.log(this.state.customer_privacy);
    console.log(this.state.psgdpr);

    let errors = this.state.errors;
    if (this.state.firstname.length == 0) {
      errors.firstname = "First Name is required";
    }
    if (this.state.lastname.length == 0) {
      errors.lastname = "Last Name is required";
    }
    if (!validEmailRegex.test(this.state.email)) {
      errors.email = "email is invalid";
    }
    if (this.state.password.length < 8) {
      errors.password = "password is invalid";
    }
    if (this.state.customer_privacy === 0) {
      errors.privacy = "please check customer data policy";
    }
    if (this.state.psgdpr === 0) {
      errors.psgdpr = "please check terms and condition";
    }
    if (this.state.customer_privacy === 0) {
      errors.privacy = "please check customer data policy";
    } else {
      errors.privacy = "";
    }
    if (this.state.psgdpr === 0) {
      errors.psgdpr = "please check terms and condition";
    } else {
      errors.psgdpr = "";
    }
    this.setState({ ...this.state, errors });
    // if (validateForm(this.state.errors)) {
    //   console.info("Valid Form");
    // } else {
    //   console.error("Invalid Form");
    // }
    console.log(this.state);
    console.log("validate", validateForm(this.state.errors));
    if (!validateForm(this.state.errors)) {
      return console.error("Invalid Form");
    }
    // else {
    //   this.create_account();
    // }
    console.log(this.state);
    axios
      .get("https://kobzo.store/logins/login-api.php", {
        params: {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          password: this.state.password,
          submitCreate: this.state.submitCreate,
          create_account: 1,
          customer_privacy: this.state.customer_privacy,
          psgdpr: this.state.psgdpr,
          ajax: 1,
        },
      })
      .then((response) => {
        console.log(response.data);
        const { success, error } = response.data;
        if (response.data.success == true) {
          window.location.href = "https://www.kobzo.store/?superCustomer=1";
        }
        if (error) {
          const errors = response.data[0];
          const stateErrors = this.state.errors;

          stateErrors.firstname = errors.firstname;
          stateErrors.lastname = errors.lastname;
          stateErrors.email = errors.email;
          stateErrors.password = errors.password;
          stateErrors.privacy = errors.customer_privacy;
          stateErrors.psgdpr = errors.psgdpr;

          this.setState({ ...this.state, errors: stateErrors });
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
          Sign up
        </Typography>
        <form onSubmit={this.handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First Name"
            name="firstname"
            autoComplete="firstname"
            autoFocus
            onChange={this.handleChange}
            noValidate
          />
          {errors.firstname.length > 0 && (
            <span className="error">{errors.firstname}</span>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Last Name"
            name="lastname"
            autoComplete="lastname"
            onChange={this.handleChange}
            noValidate
          />
          {errors.lastname.length > 0 && (
            <span className="error">{errors.lastname}</span>
          )}
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
          <br></br>
          <br></br>
          <input
            type="checkbox"
            id="customer"
            name="customer"
            value={this.state.customer_privacy}
            onChange={this.cutomer_change}
          />
          <label for="customer" className={styles.label}>
            {" "}
            Customer data policy
          </label>
          <br></br>
          {this.state.customer_privacy === 1 ? (
            ""
          ) : (
            <span className="error">{errors.privacy}</span>
          )}
          <p className={styles.terms}>
            The personal data you provide is used to answer queries, process
            orders or allow access to specific information. You have the right
            to modify and delete all the personal information found in the "My
            Account" page.
          </p>

          <br></br>

          <input
            type="checkbox"
            id="terms"
            name="terms"
            value={this.state.psgdpr}
            onChange={this.privacy_change}
          />
          <label for="terms" className={styles.label}>
            {" "}
            I agree to the terms and conditions and the privacy policy
          </label>
          <br></br>
          {this.state.psgdpr === 1 ? (
            ""
          ) : (
            <span className="error">{errors.psgdpr}</span>
          )}
          <br></br>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.btn_grad}
            onClick={this.submitCreate}
          >
            Sign up
          </Button>
          <Grid container className={styles.buttons}>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
              Forgot password?
            </Link> */}
              <Button
                onClick={() => this.props.changeAuthState("forgetPassword")}
              >
                Forgot Password
              </Button>
            </Grid>
            <Grid item>
              {/* <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link> */}
              <Button onClick={() => this.props.changeAuthState("signin")}>
                Sign In
              </Button>
            </Grid>
          </Grid>
          {/* <Box mt={5}>
            <Copyright />
          </Box> */}
        </form>
      </div>
    );
  }
}

export default Signup;
