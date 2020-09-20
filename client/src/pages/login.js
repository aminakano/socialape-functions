import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import appIcon from "../images/icon.png"
import axios from "axios";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    margin: "20px auto",
  },
  pageTitle: {
    margin: "10px auto",
  },
  TextField: {
    margin: "10px auto",
  },
  button: {
    marginTop: 20,
    position: "relative"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "0.5rem",
  },
  progress: {
    position: "absolute"
  }
};


class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {},
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post("/login", userData)
      .then(res => {
        console.log(res.data)
        this.setState({
          loading: false
        });
        this.props.history.push("/"); //homepage
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false,
        });
      })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;

    return (
      <div className="App">
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <img src={appIcon} alt="smiley" className={classes.image} />
            <Typography variant="h2" className={classes.pageTitle}>
              Login
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                helperText={errors.email}
                error={errors.email ? true : false}
                className={classes.TextField}
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
                helperText={errors.password}
                error={errors.password ? true : false}
                className={classes.TextField}
                value={this.state.password}
                onChange={this.handleChange}
                fullWidth
              />
              {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Log in
                {loading && <CircularProgress className={classes.progress} size={30} />}
              </Button>
              <br />
              <small>
                Don't have an account? <Link to="/signup">Sign up</Link>
              </small>
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    );
  }
}

login.propTypes = {
  classes: PropTypes.isRequired
};

export default withStyles(styles)(login);
