import React, { Component } from 'react'
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// icons
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { connect } from "react-redux";
import MyButton from '../../util/MyButton';

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    position: "relative",
    "& .small": {
      padding: 10,
    },
  },
  image: {
    minWidth: 200,
  },
  imageSm: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    alignSelf: "center",
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};
class Scream extends Component {
  render() {
    dayjs.extend(relativeTime);
    const { 
      classes, 
      scream: { 
        body, 
        createdAt, 
        userImage, 
        userHandle, 
        screamId, 
        likeCount, 
        commentCount },
      user: {
        authenticated,
        credentials: { handle }
      } 
    } = this.props;

    const deleteButton = authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null
    return (
      <Card
        className={
          (classes.card)
        }
      >
        <CardMedia
          image={userImage}
          title="Profile image"
          className={
            (classes.image, window.innerWidth < 600 ? classes.imageSm : null)
          }
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            color="primary"
            to={`/users/${userHandle}`}
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId}/>
          <span>
            {likeCount > 1 ? `${likeCount} Likes` : `${likeCount} Like`}
          </span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>
            {commentCount > 1
              ? `${commentCount} Comments`
              : `${commentCount} Comment`}
          </span>
          {deleteButton}
          <ScreamDialog
            screamId={screamId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = state => ({
  user: state.user
})



export default connect(
  mapStateToProps,
)(withStyles(styles)(Scream));