import mongoose from "mongoose";

import PostMessage from "../model/postMessage.js";


const getPosts = async (req, res) =>{
  try {
    const postMessages = await PostMessage.find(); 

    res.status(200).json(postMessages);
  }catch( error ) {
    res.status(404).json({ message: error.message})
  }
}


const createPost = async (req, res) =>{
  try {
    const body = req.body;
    const newPost = await PostMessage.create(body);
    res.status(201).json(newPost);
  } catch( error) {
    res.status(409).json({ mesage: error.message });
  }
}


const updatePost = async(req, res) =>{
  try {
    const _id = req.params.id;
    const postData = req.body;
    
    if ( !mongoose.Types.ObjectId.isValid(_id) ) return res.status(404).send("No post with that id");
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, postData, { new: true });
    
    res.json(updatedPost);
  } catch(error) {
    res.status(409).json({ mesage: error.message });
  }
}


const deletePost = async(req, res) =>{
  try {
    const _id = req.params.id;

    if ( !mongoose.Types.ObjectId.isValid(_id) ) return res.status(404).send("No post with that id");

    await PostMessage.findByIdAndDelete(_id);

    res.json({ message: "Post deleted successfuly."});
  } catch( error ) {
    res.status(409).json({ mesage: error.message });
  }
}

const likePost = async( req, res ) =>{
  try {
    const _id = req.params.id;

    if ( !mongoose.Types.ObjectId.isValid(_id) ) return res.status(404).send("No post with that id");

    const post = await PostMessage.findById(_id).lean();
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount+1}, { new:true });

    res.json(updatedPost);
  } catch( error ) {
    res.status(409).json({ message: error.message });
  }
}

export { getPosts, createPost, updatePost, deletePost, likePost };