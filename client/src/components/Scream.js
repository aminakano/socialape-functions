import React, { Component } from 'react'
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DeleteScream from "../components/DeleteScream";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
// Redux
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";
import MyButton from '../util/MyButton';

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    position: "relative"
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
  
}
class Scream extends Component {
  likedScream = () => {
    const likes = this.props.user.likes;
    if (likes && likes.find(
        like => like.screamId === this.props.scream.screamId
      )) return true; 
    return false;
  }
  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId);
    console.log('liked')
  }
  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId);
    console.log("unliked");
  }

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
    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.likedScream() ? (
      <MyButton tip="Unlike" onClick={this.unlikeScream}>
        <Favorite color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeScream}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    const deleteButton = authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
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
          {likeButton}
          <span>
            {likeCount > 1
              ? `${likeCount} Likes`
              : `${likeCount} Like`}
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
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user
})

const mapActionsToProps = {
  likeScream,
  unlikeScream
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));