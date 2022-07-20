import { ServerResponse } from "http";
import { Blog } from "interface";
import * as blogService from "./service";

export const getAll = async (res: ServerResponse) => {
  const blogs = await blogService.getAllBlogs();
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(JSON.stringify(blogs));
};

export const getById = async (res: ServerResponse, id: string) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  const blog = await blogService.getBlogById(id);
  blog && res.end(JSON.stringify(blog));
  !blog &&
    res.writeHead(404, { "Content-Type": "text/plain" }) &&
    res.end("Sorry\nCould not found blog with such id");
};
