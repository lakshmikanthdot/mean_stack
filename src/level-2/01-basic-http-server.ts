import http, { IncomingMessage, ServerResponse } from "node:http";
// console.log(http); // http object

const PORT = 2000;

// for create the server we need to use http.createServer() method
// it will create low level http server and we can use it to listen the request and send the response
// callback ((res,res)=>{}) is going to run for every incoming http req

// request
// request object contents the information about the incoming request
// req.method - get, post, put, options, delete, patch
// req.url - is requested path i.e is /user (request path)
// req.headers - nothing but actual meta data sent by the client to the server
// req.body - data sent by the client (put or post)

// response
// response object is used by our server to send the response back to the client
// res.statusCode - status code of the response
// res.headers - meta data sent by the server to the client
// res.body - data sent by the server to the client
// res.setHeader() - set the header of the response
// res.write() - write the data to the response body
// res.end() - end the response

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method;

    // if get means -> read data
    // if post means -> create data
    // if put means -> replace data
    // if patch means -> update partial data
    // if delete means -> delete data

    const url = req.url;
    // in which path the client is requesting the data from the server

    const userAgentHeader = req.headers["user-agent"];
    // headers are nothing but meta data
    // extra information that we sent along with request information
    // browser type, content type (json or text etc..), authrization token

    res.statusCode = 200;
    // set the http status code
    // 200 -> req is successfully
    // 201, 400, 400, 429, 401, 500, 502

    res.setHeader("Content-Type", "text/html");
    // we are telling the client that we are sending the html data in the response
    // json fornat -> application/json
    // plain text format -> text/plain
    // if we dont also broswe will try to guess the content type and render the data accordingly

    // to finish the response we need to use res.end() method
    res.end(`basic http node server: ${method}: ${url}: ${userAgentHeader}`);
  },
);

// when we will start any request and we are get any response back
// in that case we need to listen the server on some port
//server.listen it will start the actual server

server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
