import http from "http";
import fs from "fs";

function requestReceived(req, res) {
    // this is called when the server receives a request
    console.log("Request received");
    console.log(req.url);

    if (req.url === "/") {
        // load index.html from public if empty request
        res.writeHead(200, {"Content-Type": "text/html"});
        let indexHtml = fs.readFileSync("./public/index.html");
        res.end(indexHtml);
    }

    // send an html file
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello World!");
}

let server = http.createServer(requestReceived);

// start the server
server.listen(3000);