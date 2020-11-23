import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  marginTop:'8px',
  marginBottom:'8px',
  marginRight:'8px'
  },

  comment: {
    marginLeft: "16px",
  },
}));

export default function Posts(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction='row' justify='space-between'>
        <Grid item>
          {
            props.source ?<img
            src={props.source}
            style={{ width: "100px", height: "80px" }}
            alt='image'
          />
          :
          <CircularProgress/>
          }
          
        </Grid>
        <Grid item xs className={classes.comment}>
          <Typography>{props.comment}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
