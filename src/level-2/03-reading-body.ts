import http, { IncomingMessage, ServerResponse } from "node:http";

const PORT = 2002;

type CreateUserBody = {
  name?: string;
  email?: string;
};

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";
    const requestUrl = new URL(req.url ?? "/", `http://${req.headers.host}`);
    const pathName = requestUrl.pathname;
    res.setHeader("Content-Type", "text/plain");

    if (method === "POST" && pathName === "/users") {
      // post means it was expected some kind of json request body
      // from ui side we need to read in the backend side
      const chunks: Buffer[] = [];

      // data event is going to run every time node receives a new body chunk
      // on listener
      req.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      });

      // once received the full request body
      // combine all the chunks into a single buffer and convert it to string
      req.on("end", () => {
        try {
          const rawBody = Buffer.concat(chunks).toString("utf8");
          if (!rawBody) {
            res.statusCode = 400;
            res.end("req body is required");
            return;
          }
          const body = JSON.parse(rawBody) as CreateUserBody;
          if (!body.name || !body.email) {
            res.statusCode = 400;
            res.end("both name and email are required");
            return;
          }
          res.statusCode = 201;
          res.end(
            `user created successfully with name: ${body.name} and email: ${body.email}`,
          );
          return;
        } catch (error) {
          res.statusCode = 400;
          const message =
            error instanceof Error
              ? error.message
              : "Error while parsing request body";
          res.end("invalid json body" + message);
          return;
        }
      });

      req.on("error", () => {
        res.statusCode = 500;
        res.end("failed to read request body");
      });
      return;
    }
    res.statusCode = 404;
    res.end("route not found");
  },
);

server.listen(PORT, () => {
  console.log("server is running on port: ", PORT);
});
