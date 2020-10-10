import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";

// Icon
import NotificationsIcon from "@material-ui/icons/Notifications";
import Favorite from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

class Notifications extends Component {
  state = {
    anchorEl: null
  }
  // handleOpen = event => {
  //   this.setState({ anchorEl: event.target });
  // }

  // handleClose = () => {
  //   this.setState({ anchorEl: null })
  // }

  // onMenuOpened = () => {
  //   let unreadNotficationsIds = this.props.notifications
  //                               .filter(not => !not.read)
  //                               .map(not => not.notificationId)
  //   this.props.markNotificationsRead(unreadNotficationsIds);
  // }

  render () {
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;
    dayjs.extend(relativeTime)

    let notificationIcon;
    if(notifications && notifications.length > 0) {
      const len = notifications.filter(not => not.read === false).length;
      len > 0
        ? (notificationIcon = (
            <Badge badgeContent={len} color="secondary">
              <NotificationsIcon />
            </Badge>
          ))
        : (notificationIcon = <NotificationsIcon />);
    } else {
      notificationIcon = <NotificationsIcon />;
    }
    let notificationMarkup= 
      notifications && notifications.length > 0 ? (
        notifications.map(not => {
          const verb = not.type === "like" ? "liked" : "commented on";
          const time = dayjs(not.createdAt).fromNow();
          const iconColor = not.red ? "primary" : "secondary";
          const icon = not.type === "like" ? (
            <Favorite color={iconColor} style={{ marginRight: 10 }}/>
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }}/>
          )
          return (
            <MenuItem 
              key={not.createdAt} 
              onClick={this.handleClose}>
                {icon}
                <Typography 
                  component={Link}
                  color="default"
                  variant="body1"
                  to={`/users/${not.recipient}/scream/${not.screamId}`}>
                    {not.sender} {verb} your scream {time}
                </Typography>
            </MenuItem>

          ) 
        })
      ) : (
            <MenuItem onClick={this.handleClose}>
              You have no notifications yet.
            </MenuItem>
      )
    return (
      <Fragment>
        {notificationIcon}
        {/* <Tooltip placement="top" title="Notifications">
          <IconButton 
            area-owns={ anchorEl ? "simple-menu" : undefined }
            area-haspopup="true"
            onClick={this.handleOpen}>
              {notificationIcon}
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            onEntered={this.onMenuOpened}>
              {notificationMarkup}
          </Menu>
        </Tooltip> */}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: state.user.notifications
});

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);