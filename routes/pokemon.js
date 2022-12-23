var express = require("express");
var router = express.Router();
const axios = require("axios");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//Populate database with Pokemon info - Needs refactor
router.get("/refreshPokemonData", async function (req, res, next) {
  try {
    let response = await axios.get("https://pokeapi.co/api/v2/pokemon", {
      headers: {
        "Accept-Encoding": "*",
      },
    });

    //Iterate until there are no more "next" url to call
    while (response.data.next) {
      response.data.results.forEach(async (element) => {
        let pokemon_info = await axios.get(element.url, {
          headers: {
            "Accept-Encoding": "*",
          },
        });

        let [pokemon_id, pokemon_name, pokemon_image_path] = [
          pokemon_info.data.id,
          pokemon_info.data.name,
          pokemon_info.data.sprites.front_default,
        ];

        const existing_pokemon = await prisma.pokemon.findFirst({
          where: { pokemon_id: pokemon_id },
        });

        if (existing_pokemon) {
          //This is throwing error for some reason - Needs attention
          const updatePokemon = await prisma.pokemon.update({
            where: {
              pokemon_id: pokemon_id,
            },
            data: {
              name: pokemon_name,
              image_path: pokemon_image_path
            },
          });
        } else {
          let create = await prisma.pokemon.create({
            data: {
              pokemon_id: pokemon_id,
              name: pokemon_name,
              image_path: pokemon_image_path,
            },
          });
        }
      });

      response = await axios.get(response.data.next, {
        headers: {
          "Accept-Encoding": "*",
        },
      });

      //This is the last page of data - Needs refactor
      if (!response.data.next) {
        response.data.results.forEach(async (element) => {
          let pokemon_info = await axios.get(element.url, {
            headers: {
              "Accept-Encoding": "*",
            },
          });

          let [pokemon_id, pokemon_name, pokemon_image_path] = [
            pokemon_info.data.id,
            pokemon_info.data.name,
            pokemon_info.data.sprites.front_default,
          ];

          const existing_pokemon = await prisma.pokemon.findFirst({
            where: { pokemon_id: pokemon_id },
          });

          if (existing_pokemon) {
            let update = await prisma.pokemon.update({
              data: {
                name: pokemon_name,
                image_path: pokemon_image_path,
              },
              where: { pokemon_id: pokemon_id },
            });
          } else {
            let create = await prisma.pokemon.create({
              data: {
                pokemon_id: pokemon_id,
                name: pokemon_name,
                image_path: pokemon_image_path,
              },
            });
          }
        });
      }
    }

    res.sendStatus(200);
  } catch (error) {
    res.render("error", { message: "Error encountered", error: error });
  }
});

module.exports = router;
