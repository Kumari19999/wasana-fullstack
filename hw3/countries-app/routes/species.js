
var express = require('express');
var router = express.Router();
const axios = require('axios');

// Wait before making another request
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Retry if the API temporarily limits requests
async function getWithRetry(url) {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      return await axios.get(url);
    } catch (err) {
      if (err.response && err.response.status === 429 && attempt < 5) {
        const retryAfter = Number(err.response.headers['retry-after']);
        const delay = retryAfter
          ? retryAfter * 1000
          : attempt * 5000;

        console.log('API rate limit reached. Waiting before retrying...');
        await wait(delay);
      } else {
        throw err;
      }
    }
  }
}

router.get('/', async function(req, res) {
  try {
    // Get the first page
    const firstResponse = await getWithRetry(
      'https://rickandmortyapi.com/api/character?page=1'
    );

    let characters = [...firstResponse.data.results];

    // Find the total number of API pages
    const totalPages = firstResponse.data.info.pages;

    // Get all remaining pages
    for (let page = 2; page <= totalPages; page++) {
      await wait(1000);

      const response = await getWithRetry(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );

      characters = characters.concat(response.data.results);
    }

    // Group characters by species
    const speciesGroups = {};

    characters.forEach(character => {
      const species = character.species || 'Unknown';

      if (!speciesGroups[species]) {
        speciesGroups[species] = [];
      }

      speciesGroups[species].push(character.name);
    });

    // Create grouped species data
    const groupedSpecies = Object.entries(speciesGroups).map(
      ([species, names]) => ({
        species: species,
        count: names.length,
        names: names
      })
    );

    // Display the results
    res.render('species', {
      groupedSpecies: groupedSpecies
    });

  } catch (err) {
    console.log(err);
    res.send('Error retrieving species. Please try again later.');
  }
});

module.exports = router;


