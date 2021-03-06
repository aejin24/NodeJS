const express = require("express");
const app = express();

app.locals.pretty = true;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // post로 넘겨온 값을 받기 위해 body에 있는 json을 사용할 수 있도록 설정해야한다
app.use(express.json());

app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/views"); 
app.set("view engine", "html");

app.get("/", (req, res) => {
    res.send("Hello home page");
});

app.get("/dynamic", (req, res) => {
    var lis = "";
    for (var i = 0 ; i < 5 ; i++) {
        lis += "<li>coding</li>";
    }

    var time = Date();

    var output = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        Hello, Static
        <ul>
          ${lis}
        </ul>
        ${time}
      </body>
    </html>
    `;

    res.send(output);
});

app.get("/route", (req, res) => {
    res.send("Hello Router, <img src='/cat.png'>")
});

app.get("/login", (req, res) => {
    res.send("<h1>Login please</h1>");
});

app.get("/static", (req, res) => {
    res.render("static.html", {
        name: "aejin",
        age: "24"
    })
});

app.get("/topic", (req, res) => {
    var topics = ["Javascript Is...", "NodeJS Is...", "Express Is"];

    // queryString은 req.query로 받아온다
    var output = `
        <a href="/topic?id=0">JavaScript</a>
        <br>
        <a href="/topic?id=1">NodeJS</a>
        <br>
        <a href="/topic?id=2">Express</a>
        <br><br>
        <h1>${topics[req.query.id]}</h1>
    `

    res.send(output);
});


app.get("/param/:id/:mode", (req, res) => {
    var topics = ["Javascript Is...", "NodeJS Is...", "Express Is"];

    // 시멘틱 url의 param은 req.params로 받아온다
    var output = `
        <a href="/topic/0">JavaScript</a>
        <br>
        <a href="/topic/1">NodeJS</a>
        <br>
        <a href="/topic/2">Express</a>
        <br><br>
        <h1>${topics[req.params.id]}, ${req.params.mode}</h1>
    `

    res.send(output);
});

app.get("/form", (req, res) => {
    res.render("form.html")
});

app.get("/form_receiver", (req, res) => {
    var title = req.query.title;
    var description = req.query.description;

    res.send(title + ", " + description)
});

app.post("/form_receiver", (req, res) => {
    var title = req.body.title;
    var description = req.body.description;    

    res.send(title + ", " + description)
});

app.listen(3000, () => {
    console.log("Connected 3000 port");
});