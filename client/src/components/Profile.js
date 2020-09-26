import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// MUI
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from "@material-ui/core/Typography";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from '@material-ui/icons/CalendarTodaySharp';

const styles = (theme) => ({
  ...theme.formTheme,
});

export class Profile extends Component {
  render() {
    const { classes, 
            user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, 
            loading,
            authenticated } 
    } = this.props;
    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="profile-image">
              <img src={imageUrl} alt="profile" />
            </div>
            <hr />
            <div className="profile">
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
                  <a href={website} target="_blank" rel="noopener no referrer">
                    {" "}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color="primary">
                {" "}
                <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
              </CalendarToday>
            </div>
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

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(withStyles(styles)(Profile));