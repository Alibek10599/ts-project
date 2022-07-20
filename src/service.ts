import { writeFile, readFile } from "fs/promises";
import { Blog } from "./interface";

export const getAllBlogs = async (): Promise<Blog[]> => {
  const blogs = await readFile("./blogs.json", { encoding: "utf8" });
  console.log({ "blogs are": blogs });
  return JSON.parse(blogs);
};

export const getBlogById = async (id: string): Promise<Blog> => {
  const blogs = await readFile("./blogs.json", { encoding: "utf8" });
  const blog = JSON.parse(blogs).find((blog) => blog.id === id);
  return blog;
};

export const createBlog = async (blog: Blog): Promise<Blog> => {
  const blogs = await readFile("./blogs.json", { encoding: "utf8" });
  const blogsArray = JSON.parse(blogs);
  const newBlog = { ...blog, id: blogsArray.length + 1 };
  blogsArray.push(newBlog);
  await writeFile("./blogs.json", JSON.stringify(blogsArray));
  return newBlog;
};

export const updateBlog = async (blog: Blog): Promise<Blog> => {
  const blogs = await readFile("./blogs.json", { encoding: "utf8" });
  const blogsArray = JSON.parse(blogs);
  const updatedBlog = blogsArray.find((blog) => blog.id === blog.id);
  blogsArray.splice(blogsArray.indexOf(updatedBlog), 1, blog);
  await writeFile("./blogs.json", JSON.stringify(blogsArray));
  return blog;
};

export const deleteBlog = async (id: number): Promise<Blog> => {
  const blogs = await readFile("./blogs.json", { encoding: "utf8" });
  // const blogsArray = JSON.parse(blogs).filter((blog) => blog.id !== id); //in case we do not need display deleted blog
  const blogsArray = JSON.parse(blogs);
  const deletedBlog = blogsArray.find((blog) => blog.id === id);
  blogsArray.splice(blogsArray.indexOf(deletedBlog), 1);
  await writeFile("./blogs.json", JSON.stringify(blogsArray));
  return deletedBlog;
};
