import http from "http";
import fs from "fs";
import path from "path";
const server = http.createServer((req, res) => {
  console.log(req.url);
  //status response
  // const data = { name: "betty", age: 26 };
  // res.writeHead(200, { "Content-Type": "text/plain" });
  // res.write(JSON.stringify(data));
  // res.end("Hello World");

  if (req.url === "/") {
    const htmlFile = fs.readFileSync(
      path.resolve(__dirname, "./public/index.html")
    );
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlFile);
    return;
  }

  if (req.url?.endsWith(".js")) {
    res.writeHead(200, { "Content-Type": "application/javascript" });
  } else if (req.url?.endsWith(".css")) {
    res.writeHead(200, { "Content-Type": "text/css" });
  }

  const response = fs.readFileSync(path.resolve(__dirname, `./public${req.url}`), "utf-8");
res.end(response);
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
