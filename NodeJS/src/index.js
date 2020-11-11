var express = require("express");
var app = express();
const db = require(__dirname + "/db_connect");
const cors = require("cors");
const router = express.Router();


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true,
}));
var jsonParser = bodyParser.json();



app.use(bodyParser.json());

app.use(express.static("public"));
app.use(cors());

const sellerRoutes = require(__dirname+'/routes/sellerRoutes')
app.use('/seller',sellerRoutes)



  app.use((req, res) => {
    res.type("text/plain");
    res.status(404);
    res.send("404 - 找不到網頁");
  });
  app.listen(3000, function () {
    console.log("啟動 server 偵聽埠號 3000");
  });
  