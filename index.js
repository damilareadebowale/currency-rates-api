const express = require('express');
const axios = require('axios');
const app = express();

let port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send(`<p>For the currency exchange rates API <a href="https://young-ocean-86160.herokuapp.com/api/rates/">Click here!</a></p>`);
});
 
app.get('/api/rates', (req, res) => {
  axios.get('https://api.exchangeratesapi.io/latest?base=CZK&symbols=EUR,GBP,USD')
    .then(response => {
      const info = response.data;
      let results = {};
      results.base = info.base;
      results.date = info.date;
      results.rates = info.rates;

      res.status(200).json({results: results})
    })
    .catch(err => console.log(err));
}) 

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})