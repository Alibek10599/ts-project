import { rejects } from "assert";
import { createServer, IncomingMessage, RequestListener } from "http";
import { Blog } from "interface";
import {
  getAllController,
  getByIdController,
  createController,
  updateController,
  deleteController
} from "./controller";

const getRequestBlog = async (req: IncomingMessage): Promise<Blog> =>
  new Promise((resolve, reject) => {
    let buffers = "";

    try {
      req.on("data", (chunk) => (buffers += chunk.toString()));

      req.on("end", () => {
        resolve(JSON.parse(buffers) as Blog);
      });
    } catch (error) {
      reject(error);
    }
  });

const requestListener: RequestListener = async (req, res) => {
  switch (true) {
    case req.url === "/blog" && req.method === "GET":
      await getAllController(res);
      break;
    case req.url.match(/\/blog/) && req.method === "POST":
      {
        const requestBlog = await getRequestBlog(req);
        await createController(res, requestBlog);
      }
      break;
    case req.url.match(/\/blog\/([0-9]+)/) && req.method === "GET":
      {
        const id = req.url.split("/")[2];
        await getByIdController(res, id);
      }
      break;
    case req.url.match(/\/blog\/([0-9]+)/) && req.method === "PUT":
      {
        const requestBlog = await getRequestBlog(req);
        await updateController(res, requestBlog);
      }
      break;
    case req.url.match(/\/blog\/([0-9]+)/) && req.method === "DELETE":
      {
        const id = req.url.split("/")[2];
        await deleteController(res, id);
      }
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not found\nGulyai Vasya");
      break;
  }

  res.on("error", (err) => {
    console.error(err);
  });
};
console.log("Server running at http://localhost:8080/");
createServer(requestListener).listen(8080);
