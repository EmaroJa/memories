import mongoose from "mongoose";
import PostMessage from "../models/postsMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }    
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params; // rename to _id
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post found with that Id!");
    const { title, message, creator, selectedFile, tags } = req.body;
    try {    
        const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
        await PostMessage.findByIdAndUpdate(id, updatedPost, {new: true});
        res.json(updatedPost);
    } catch (error) {
        console.log(error);
    }
}