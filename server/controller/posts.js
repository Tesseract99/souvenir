import mongoose from "mongoose";
import PostMessage from "../model/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  // console.log("POST HIT", req);
  const post = req.body;
  const newPost = new PostMessage({ ...post, creatorId: req.userId });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params; //rename id to _id after destructuring
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.status(200).json(updatedPost);
};

export const deletePost = async (req, res) => {
  console.log("Delete Request");
  const { id } = req.params;
  const { creatorId } = req.body;
  // console.log(req.body);
  // console.log("id to be deleted: ", id);
  // console.log("Anti hacker", req.userId, creatorId);
  if (req.userId != creatorId) return res.status(404).send("Nice Try Hacker !");
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Post with that id");

  try {
    await PostMessage.findByIdAndRemove(id);
    res.status(200).json({ message: "post deleted" });
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

export const likePost = async (req, res) => {
  // console.log(req.params);
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Post with that id");

  try {
    const post = await PostMessage.findById(id);
    // console.log(req.userId);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    // console.log("index", index);
    //like
    if (index == -1) {
      post.likes.push(req.userId);
    } //dislike
    else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};
