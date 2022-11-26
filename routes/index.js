var express = require("express");
var router = express.Router();
const axios = require("axios");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/fetchProjects", function (req, res, next) {
  const project = {
    project_title: "Anime Quote Feed",
    project_description: `The following project recieves data from an anime quote API. The data is fetched at random time intervals on the server and stored in a database for display here.
      I was able to practice many basic REST concepts during the creation of this project.`,
    project_link: "/anime-feed",
  };

  let projects = [project];

  res.send(JSON.stringify({ projects: projects }));
});

router.get("/fetchFeed", async function (req, res, next) {
  const feed_data = await prisma.anime_quotes.findMany();
  res.send(JSON.stringify({ feed: feed_data }));
});

router.get("/fetchQuote", async function (req, res, next) {
  const quote = await axios.get(
    "https://techy-api.vercel.app/api/json",
    {
      headers: {
        "Accept-Encoding": "*",
      },
    }
  );
  res.send(JSON.stringify({ quote: quote.data }));
});



module.exports = router;
