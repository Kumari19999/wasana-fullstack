
var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', async function(req, res) {
  try {
    const firstResponse = await axios.get(
      'https://rickandmortyapi.com/api/location'
    );

    let locations = [...firstResponse.data.results];

    const totalPages = firstResponse.data.info.pages;

    const pageNumbers = Array.from(
      { length: totalPages - 1 },
      (_, i) => i + 2
    );

    const responses = await Promise.all(
      pageNumbers.map(page =>
        axios.get(`https://rickandmortyapi.com/api/location?page=${page}`)
      )
    );

    responses.forEach(response => {
      locations.push(...response.data.results);
    });

    const locationTypes = {};

    locations.forEach(location => {
      const type = location.type || 'Unknown';

      if (!locationTypes[type]) {
        locationTypes[type] = [];
      }

      locationTypes[type].push(location.name);
    });

    const groupedLocations = Object.entries(locationTypes).map(
      ([type, names]) => ({
        type: type,
        count: names.length,
        names: names
      })
    );

    res.render('locations', {
      groupedLocations: groupedLocations
    });

  } catch (err) {
    console.log(err);
    res.send('Error retrieving locations');
  }
});

module.exports = router;