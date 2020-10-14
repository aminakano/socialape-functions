import React, { Fragment } from "react";
import NoImg from "../images/no-img.png";
import PropTypes from "prop-types";

// MUI
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  ...theme.formTheme,
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7,
  },
});

const ScreamSkelton = props => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={NoImg}/>
      <CardContent className={classes.cardContent}>
        <div className={classes.handle}></div>
        <div className={classes.date}></div>
        <div className={classes.fullLine}></div>
        <div className={classes.fullLine}></div>
        <div className={classes.halfLine}></div>
      </CardContent>
    </Card>
  ))
  return <Fragment>{content}</Fragment>
}

ScreamSkelton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ScreamSkelton);