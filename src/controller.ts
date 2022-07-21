import { ServerResponse } from "http";
import * as blogService from "./service";
import { Blog } from "./interface";

export const getAllController = async (res: ServerResponse) => {
  const blogs = await blogService.getAllBlogs();
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });
  res.end(JSON.stringify(blogs));
};

export const getByIdController = async (res: ServerResponse, id: string) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  const blog = await blogService.getBlogById(id);
  blog && res.end(JSON.stringify(blog));
  !blog &&
    res.writeHead(404, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }) &&
    res.end("Sorry\nCould not found blog with such id");
};

export const createController = async (res: ServerResponse, blog: Blog) => {
  res.writeHead(201, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });
  const newBlog = await blogService.createBlog(blog);
  res.end(JSON.stringify(newBlog));
};

export const updateController = async (res: ServerResponse, blog: Blog) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });
  const updatedBlog = await blogService.updateBlog(blog);
  res.end(JSON.stringify(updatedBlog));
};

export const deleteController = async (res: ServerResponse, id: string) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });
  const deletedBlog = await blogService.deleteBlog(id);
  res.end(JSON.stringify(deletedBlog));
};
