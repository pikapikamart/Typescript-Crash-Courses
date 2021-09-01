import { useSelector } from "react-redux";
import { Grid, CircularProgress} from "@material-ui/core";

import Post from "./Post/Post";
import useStyles from "./styles";


const Posts = ({ setCurrentId }) =>{
  const classes = useStyles();
  const posts = useSelector(state => state.posts);

  const displayPost = () =>{
    return posts.map(post =>(
      <Grid key={post._id} item xs={12} sm={6}>
        <Post setCurrentId={setCurrentId} post={post} />
      </Grid>
    ))
  }

  return (
    !posts.length ? <CircularProgress /> : 
        <Grid className={classes.container} container  alignItems="stretch" spacing={3}> 
          {displayPost()}
        </Grid>
  );
}


export default Posts;