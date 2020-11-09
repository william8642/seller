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

app.get("/get-db",jsonParser, (req, res) => {
    db.query("SELECT * FROM commodity").then(([results]) => {
      // console.log(results)
      res.json(results);
    });
  });



app.get('/get-db/:sid',jsonParser, async (req, res)=>{
    const sql = "SELECT * FROM commodity WHERE sid=?";

    const [results] = await db.query(sql, [req.params.sid]);
        
        res.json(results)
        console.log(req.body)
})

app.post('/edit/:sid', async (req, res)=>{
  const data = {...req.body};
  console.log(123123123);
  console.log(req.body);
  const sql = "UPDATE `commodity` SET ? WHERE sid=?";
  const [{affectedRows, changedRows}] = await db.query(sql, [ data, parseInt(req.params.sid) ]);
  // {"fieldCount":0,"affectedRows":1,"insertId":0,"info":"Rows matched: 1  Changed: 0  Warnings: 0","serverStatus":2,"warningStatus":0,"changedRows":0}
  res.json({
      success: !!changedRows,
      affectedRows,
      changedRows,
  });
});

  app.post("/get-db", jsonParser, async (req, res) => {
    let orderBy = "";
    let sql = "";
    switch (parseInt(req.body.Options)) {
      default:
      case 0:
        orderBy = " ORDER BY Time ";
        break;
      case 1:
        orderBy = " ORDER BY Time DESC ";
        break;
      case 2:
        orderBy = " ORDER BY Amount  ";
        break;
      case 3:
        orderBy = " ORDER BY Amount DESC ";
        break;
    }
    sql = "SELECT * FROM `product` " + orderBy;
  
    const [results] = await db.query(sql);
    res.json(results);
    console.log(req.body.Options);
  });

  app.use((req, res) => {
    res.type("text/plain");
    res.status(404);
    res.send("404 - 找不到網頁");
  });
  app.listen(3000, function () {
    console.log("啟動 server 偵聽埠號 3000");
  });
  