var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/fetchPokemonList", async function (req, res, next) {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon",
      {
        headers: {
          "Accept-Encoding": "*",
        },
      }
    );
    console.log(response.data);
    res.sendStatus(200);
  } catch (error) {
    res.render("error", { message: "Error encountered", error: error });
  }
});

module.exports = router;
