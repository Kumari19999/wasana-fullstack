var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', async function(req, res) {
  try {
    let characters = [];

    for (let page = 1; page <= 5; page++) {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      characters = characters.concat(response.data.results);
    }

    characters = characters.slice(0, 100);

    res.render('characters', { characters });
  } catch (err) {
    console.log(err);
    res.send("Error retrieving characters");
  }
});

module.exports = router;