var express = require("express");
var router = express.Router();
const axios = require("axios");
var sqlite3 = require("sqlite3").verbose();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const DBSOURCE = "db.sqlite";

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const response = await axios.get(
      "https://animechan.vercel.app/api/random",
      {
        headers: {
          "Accept-Encoding": "*",
        },
      }
    );
    let db = new sqlite3.Database(DBSOURCE, async (err) => {
      if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
      } else {
        try {
          await prisma.anime_quotes.create({
            data: {
              title: response.data.anime,
              character: response.data.character,
              quote: response.data.quote,
            }
          });
          const feed_data = await prisma.anime_quotes.findMany();
          console.log(feed_data);
        } catch (e) {
          console.log(e.message);
        }
        // db.run(
        //   `INSERT INTO anime_quotes (title, character, quote)
        //     VALUES (${JSON.stringify(response.data.anime)}, ${JSON.stringify(
        //     response.data.character
        //   )}, ${JSON.stringify(response.data.quote)});`,
        //   (err) => {
        //     if (err) {
        //       // Log err
        //       console.error(err.message);
        //     } else {
        //       // Table created
        //       console.log("Insert successful");
        //     }
        //   }
        // );
      }
    });
  } catch (error) {
    res.render("error", { message: "Error encountered", error: error });
  }
});

module.exports = router;
