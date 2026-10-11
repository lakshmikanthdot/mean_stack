import http, { IncomingMessage, ServerResponse } from "node:http";

const PORT = 2001;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";

    // for eg
    // https://localhost:5001/users -> here req.url is /users
    // https://localhost:5001/users/1 -> here req.url is /users/1
    // const requestUrl = req.url;

    const requestUrl = new URL(req.url ?? "/", `http://${req.headers.host}`);
    // we are creating a new URL object to parse the incoming request url
    const pathName = requestUrl.pathname;

    res.setHeader("Content-Type", "text/plain");

    if (method === "GET" && pathName === "/health") {
      res.statusCode = 200;
      res.end("server is healthy");
      return;
    }

    if (method === "GET" && pathName === "/users") {
      res.statusCode = 200;
      res.end("List of users");
      return;
    }

    if (method === "POST" && pathName === "/users") {
      res.statusCode = 201;
      res.end("user created successfully!!!!!");
      return;
    }

    // not found
    res.statusCode = 404;
    res.end("not found");
  },
);

server.listen(PORT, () => {
  console.log("server is running on port: ", PORT);
});
