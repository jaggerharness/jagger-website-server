var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/fetchProjects", function (req, res, next) {
  const project = {
    project_title: "Anime Quote Feed",
    project_description:
      `The following project recieves data from an anime quote API. The data is fetched at random time intervals on the server and stored in a database for display here.
      I was able to practice many basic REST concepts during the creation of this project.`,
    project_link: "/anime-feed",
  };

  let projects = [project];

  res.send(JSON.stringify({ projects: projects }));
});

module.exports = router;
