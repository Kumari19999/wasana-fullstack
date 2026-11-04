var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', async function(req, res) {
  try {
    const response = await axios.get(
  "https://restcountries.com/v3.1/all?fields=name,capital",
  {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  }
);

console.log(response.data);

console.log(response.data);
console.log(Array.isArray(response.data));

    const countries = response.data
      .sort((a, b) => a.name.common.localeCompare(b.name.common))
      .map(country => ({
        name: country.name.common,
        capital: country.capital ? country.capital[0] : "N/A"
      }));

    res.json(countries);

  } catch (err) {
  console.log(err.response ? err.response.data : err);
  res.status(500).send("Error retrieving countries");
}
  
});

module.exports = router;