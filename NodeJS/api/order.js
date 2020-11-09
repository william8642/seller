const express = require("express");
const router = express.Router();


const dbMysql2 = require("../db/database");
async function getListData() {
  const sql = "SELECT * FROM commodity BY sid DESC";

  const rs = await db.myExecSql(sql);

  rs.rows.forEach((el) => {
    el.Customer = moment(el.Customer).format("text");
  });
  return rs;
}