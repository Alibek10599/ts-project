import { createServer, RequestListener } from "http";
import { getAll, getById } from "./controller";

const requestListener: RequestListener = async (req, res) => {
  switch (true) {
    case req.url === "/blog" && req.method === "GET":
      await getAll(res);
      break;
    case req.url.match(/\/blog/) && req.method === "POST":
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Created Blog Post" }));
      break;
    case req.url.match(/\/blog\/([0-9]+)/) && req.method === "GET":
      const id = req.url.split("/")[2];
      await getById(res, id);
      break;
    case req.url.match(/\/blog\/([0-9]+)/) && req.method === "PUT":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Updated Blog Post" }));
      break;
    case req.url.match(/\/blog\/([0-9]+)/) && req.method === "DELETE":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Deleted Blog Post" }));
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
