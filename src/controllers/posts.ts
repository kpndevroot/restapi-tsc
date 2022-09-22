import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";

interface Post {
  userId: Number;
  id: Number;
  title: String;
  body: String;
}
interface Posts {
  title: String;
  body: String;
}
// get all post

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let result: AxiosResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts`
    );
    let posts: [Post] = result.data;
    return res.status(200).json({ message: posts });
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

// get single post

const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let id: string = req.params.id;
    let doc: AxiosResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    let post: Post = doc.data;
    return res.status(200).json({ msg: post });
  } catch (error) {
    next(error);
  }
};

// updating post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  const id: String = req.params.id;
  let doc: Posts = {
    title: req.body.title ?? null,
    body: req.body.body ?? null,
  };

  let response: AxiosResponse = await axios.put(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    { ...doc }
  );
  // return res.status(200).json({ msg: doc });
  return res.status(200).json({ message: response.data });
};

// add new post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let doc: Posts = {
      title: req.body.title ?? null,
      body: req.body.body ?? null,
    };
    let response: AxiosResponse = await axios.post(
      `https://jsonplaceholder.typicode.com/posts`,
      { ...doc }
    );
    return res.status(200).json({ msg: response.data });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

// delete

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let id: string = req.params.id;
    let response: AxiosResponse = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return res.status(200).json({ msg: "post deleted " });
  } catch (error) {
    res.status(200).json({ error: error });
  }
};
export default { getPosts, getPost, updatePost, addPost, deletePost };
