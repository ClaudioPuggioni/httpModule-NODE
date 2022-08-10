const http = require("http");
const fs = require("fs");

// console.log(http.STATUS_CODES); // show status codes
let counter = 0;
const server = http.createServer((request, response) => {
  //   console.log("Request Incoming", request.headers); // show headers of request
  //   console.log("METHOD IS:", response.method); // type of request (i.e., "GET", "POST")
  console.log("URL IS:", request.url);
  //   if (request.url === "/end") {
  //     server.close(() => {
  //       console.log("Server closed");
  //     });
  //   }
  //   response.end();
  const path = "./views/"; //"./views/index.html"
  let filePath = "";
  let encode = "";

  switch (request.url) {
    case "/":
      counter++;
      encode = "utf8";
      filePath = path + "index.html";
      console.log("filePath is", filePath);
      response.setHeader("Content-Type", "text/html");
      break;
    case "/styles.css":
      encode = "utf8";
      filePath = path + "styles.css";
      console.log("filePath is", filePath);
      response.setHeader("Content-Type", "text/css");
      break;
    case "/favicon.ico":
      encode = "";
      filePath = path + "favicon.ico";
      console.log("filePath is", filePath);
      response.setHeader("Content-Type", "image/x-icon");
      break;
    case "/product":
      counter++;
      encode = "utf8";
      filePath = path + "product.html";
      console.log("filePath is", filePath);
      response.setHeader("Content-Type", "text/html");
      break;
    case "/contact":
      counter++;
      encode = "utf8";
      filePath = path + "contact.html";
      console.log("filePath is", filePath);
      response.setHeader("Content-Type", "text/html");
      break;
    default:
      break;
  }

  fs.readFile(filePath, encode, (err, data) => {
    if (err) {
      response.write("Readfile Error:", err.message);
      response.end();
    }
    console.log(counter);
    if (data.includes("{{counter}}")) data = data.replaceAll("{{counter}}", counter);
    // console.log("log", data);
    response.write(data);
    response.end();
  });

  //   response.write("<html>\n<h1>Header</h1>\n<p>This is the paragraph.</p>\n</html>");
  //   response.end();
});

server.on("error", (err) => {
  console.log("SERVER ERROR!!!:", err.message);
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log("SERVER is running on http://localhost:" + PORT);
}); // listen for requests on this port
