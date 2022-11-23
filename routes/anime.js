var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
    const response = await fetch("https://animechan.vercel.app/api/random");
    const quote = await response.json();
    console.log(quote);
});

module.exports = router;
