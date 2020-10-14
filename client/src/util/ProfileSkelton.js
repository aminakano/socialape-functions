import React from 'react';
import PropTypes from "prop-types";
import NoImg from "../images/no-img.png";
import { withStyles } from "@material-ui/core";

// MUI
import Paper from "@material-ui/core/Paper";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
  ...theme.formTheme,
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: "0 auto 7px auto",
  },
  fullLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    marginBottom: 10,
  },
});

const ProfileSkelton = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="profile-image">
          <img src={NoImg} alt="profile" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle}></div>
          <hr />
          <div className={classes.halfLine}></div>
          <div className={classes.fullLine}></div>
          <div className={classes.fullLine}></div>
          <hr />
          <LocationOn color="primary" /> <span>Location</span>
          <hr />
          <LinkIcon color="primary" /> https://website.com
          <hr />
          <CalendarToday color="primary" /> Joined date
        </div>
      </div>
    </Paper>
  );
}

ProfileSkelton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkelton);
