import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "../components/EditDetails";
import MyButton from "../util/MyButton";

// Redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../redux/actions/userActions";

// MUI
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from "@material-ui/core/Typography";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

const styles = (theme) => ({
  ...theme.formTheme,
});

export class Profile extends Component {
  handleImageChange = (event) => {
    console.log(event.target)
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData)
    // send to server
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
  }

  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated,
      },
    } = this.props;
    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="profile-image">
              <img src={imageUrl} alt="profile" />
              <input
                type="file"
                id="imageInput"
                hidden={true}
                onChange={this.handleImageChange}
              />
              <MyButton
                tip="Edit profile picture"
                onClick={this.handleEditPicture}
                btnClassName="button"
              >
                <EditIcon color="primary" />
              </MyButton>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn color="primary" /> <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color="primary" />{" "}
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
            <MyButton
              tip="Log out"
              onClick={this.handleLogout}
            >
              <KeyboardReturn color="primary" />
            </MyButton>
            <EditDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found, please log in again
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Log in
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Sign up
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p>loading...</p>
    );

    return profileMarkup;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage }

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
