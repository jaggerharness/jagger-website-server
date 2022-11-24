var express = require("express");
var router = express.Router();
const axios = require("axios");
var sqlite3 = require("sqlite3").verbose();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const DBSOURCE = "db.sqlite";

/* GET home page. */
router.get("/", async function (req, res, next) {
  const db_data = await prisma.anime_quotes.findMany();
  console.log(db_data);
  const response = await axios.get("https://animechan.vercel.app/api/random");
  let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.log('here');
      console.error(err.message);
      throw err;
    } else {
      db.run(
        `INSERT INTO anime_quotes (title, character, quote)
            VALUES (${JSON.stringify(response.data.anime)}, ${JSON.stringify(response.data.character)}, ${JSON.stringify(response.data.quote)});`,
        (err) => {
          if (err) {
            // Log err
            console.log('here2');
            console.error(err.message);
          } else {
            // Table created
            console.log("Insert successful");
          }
        }
      );
    }
  });
});

module.exports = router;
