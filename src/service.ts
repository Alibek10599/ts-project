import { writeFile, readFile } from "fs/promises";
import { Blog } from "./interface";

export const getAllBlogs = async (): Promise<Blog[]> => {
  const blogs = await readFile("./blogs.json", { encoding: "utf8" });
  console.log({ "blogs are": blogs });
  return JSON.parse(blogs);
};
