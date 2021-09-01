import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filebase from "react-file-base64";

import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { createPost, updatePost } from "../../actions/posts";


const Form = ({ currentId, setCurrentId }) =>{

  const [ postData, setPostData ] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: ""
  });
  const dispatch = useDispatch();
  const post = useSelector(state => currentId? state.posts.find(post => post._id===currentId): null);
  const classes = useStyles();

  useEffect(() =>{
    if ( post ) {
      setPostData(post); 
    }
  }, [ post])

  const resetPostData = () =>{
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: ""
    });
    setCurrentId(null);
  }

  const handleSubmit = event =>{
    event.preventDefault();
    if ( currentId ) {
      dispatch(updatePost(currentId, postData))
    } else {
      dispatch(createPost(postData));
    }
    resetPostData();
  }

  const handleChangeData = event =>{
    const { name, value } = event.target;
    
    setPostData(prev => ({
      ...prev,
      [name] : name==="tags"? value.split(",") : value
    }));
  }

  const handleFileBase = ({ base64 }) =>{
    setPostData(prev =>({
      ...prev,
      selectedFile: base64
    }))
  }

  const handleFormReset = () =>{
    resetPostData();
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
        <Typography variant="h6">
          { currentId? "Editing" : "Creating" } a memories
        </Typography>
        <TextField variant="outlined" onChange={handleChangeData} fullWidth label="Creator" name="creator" value={postData.creator} />
        <TextField variant="outlined" onChange={handleChangeData} fullWidth label="Title" name="title" value={postData.title} />
        <TextField variant="outlined" onChange={handleChangeData} fullWidth label="Message" name="message" value={postData.message} />
        <TextField variant="outlined" onChange={handleChangeData} fullWidth label="Tags" name="tags" value={postData.tags} />
        <div className={classes.fileInput}>
          <Filebase type="file" multiple={false} onDone={handleFileBase} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={handleFormReset} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
}


export default Form;