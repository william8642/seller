var express = require("express");
var app = express();
const db = require("../db_connect");
const cors = require("cors");
const router = express.Router();


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true,
}));
var jsonParser = bodyParser.json();


router.use(bodyParser.json());

router.use(express.static("public"));
router.use(cors());

router.get("/sellerClass-db",jsonParser, (req, res) => {
    db.query("SELECT * FROM Class").then(([results]) => {
      // console.log(results)
      res.json(results);
    });
  });
  
  router.get("/get-db",jsonParser, (req, res) => {
      db.query("SELECT * FROM commodity").then(([results]) => {
        // console.log(results)
        res.json(results);
      });
    });
  
  
  
    router.get('/get-db/:sid',jsonParser, async (req, res)=>{
      const sql = "SELECT * FROM commodity WHERE sid=?";
  
      const [results] = await db.query(sql, [req.params.sid]);
          
          res.json(results)
          console.log(req.body)
  })
  
  router.post('/edit/:sid', async (req, res)=>{
    const data = {...req.body};
    // console.log(123123123);
    // console.log(req.body);
    const sql = "UPDATE `commodity` SET ? WHERE sid=?";
    const [{affectedRows, changedRows}] = await db.query(sql, [ data, parseInt(req.params.sid) ]);
    // {"fieldCount":0,"affectedRows":1,"insertId":0,"info":"Rows matched: 1  Changed: 0  Warnings: 0","serverStatus":2,"warningStatus":0,"changedRows":0}
    res.json({
        success: !!changedRows,
        affectedRows,
        changedRows,
    });
  });

  router.delete("/del/:sid", async (req, res) => {
    const sql = "DELETE FROM `commodity` WHERE sid=?";
    console.log(req.params.sid);
    const [results] = await db.query(sql, [req.params.sid]);
    res.json([results]);
  });
  
  router.get("/get-db", jsonParser, async (req, res) => {
    let orderBy = "";
    let sql = "";
    switch (parseInt(req.body.Options)) {
      default:
      case 0:
        orderBy = " ORDER BY Status ";
        break;
      case 1:
        orderBy = " ORDER BY Status DESC ";
        break;
      case 2:
        orderBy = " ORDER BY Time  ";
        break;
      case 3:
        orderBy = " ORDER BY Time DESC ";
        break;
    }
    sql = "SELECT * FROM `product` " + orderBy;
    if (req.bodys.inputSearch) {
      sql =
        "SELECT * FROM `commodity` WHERE `Customer` LIKE " +
        `'%${req.bodys.inputSearch}%'`;
    }})
    
      // const [results] = await db.query(sql);
      // res.json(results);
      // console.log(req.body.Options);

      module.exports = router;
    