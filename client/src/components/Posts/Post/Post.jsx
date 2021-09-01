import { useDispatch } from "react-redux";
import moment from "moment";

import useStyles from "./styles";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { deletePost, likePost } from "../../../actions/posts";


const Post = ({ post, setCurrentId }) =>{
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleEditPost = () =>{
    setCurrentId(post._id);
  }

  const decorateTags = () => post.tags.map(tag => `#${tag} `);

  const handleThumbsUp = () =>{
    dispatch(likePost(post._id));
  }

  const handleDeletePost =() =>{
    dispatch(deletePost(post._id));
  }

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6"> {post.creator} </Typography>
        <Typography variant="body2"> {moment(post.createdAt).fromNow()} </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{color: "white"}} size="small" onClick={handleEditPost}>
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary"> {decorateTags()} </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom> {post.title} </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p"> {post.message} </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={handleThumbsUp}>
          <ThumbUpAltIcon  fontSize="small"/>
          {`Like ${post.likeCount}`}
        </Button>
        <Button size="small" color="primary" onClick={handleDeletePost}>
          <DeleteIcon  fontSize="small"/>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}


export default Post;