import http, { IncomingMessage, ServerResponse } from "node:http";

const PORT = 2003;

type User = {
  id: number;
  name: string;
  email: string;
};

// this what we are sending back to the client as a response
type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};

const createdUsers: User[] = [
  { id: 1, name: "lucky", email: "lucky@gmail.com" },
  { id: 2, name: "jhon", email: "jhon@gmail.com" },
];

function sendJsonResponse<T>(
  res: ServerResponse,
  statuscode: number,
  body: ApiResponse<T>,
): void {
  res.statusCode = statuscode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

// helper function

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";
    const requestUrl = new URL(req.url ?? "/", `http://${req.headers.host}`);
    const pathName = requestUrl.pathname;

    if (method === "GET" && pathName === "/") {
      sendJsonResponse(res, 200, {
        success: true,
        message: "server is running",
        data: {
          routes: ["GET/users"],
        },
      });
      return;
    }

    if (method === "GET" && pathName === "/users") {
      sendJsonResponse(res, 200, {
        success: true,
        message: "user fetched successfully",
        data: createdUsers,
      });
      return;
    }
    sendJsonResponse<null>(res, 404, {
      success: false,
      message: "route not found",
      error: `this ${method} and this ${pathName} route is not found on the server`,
    });
  },
);

server.listen(PORT, () => {
  console.log("server is running on port: ", PORT);
});
