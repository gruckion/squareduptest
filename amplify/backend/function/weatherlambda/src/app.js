var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var axios = require('axios');
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

app.get('/weather', async function(req, res) {
  try {
    const response = await axios.get(`https://www.metaweather.com/api/location/${req.query.woeiud}/`);
    res.json({
      url: req.url,
      weather: response.data
    });
  } catch (exception) {
    console.error("Error fetching weather data");
    res.status(500);
  }
});

app.get('/location', async function(req, res) {
  try {
    const response = await axios.get(`https://www.metaweather.com/api/location/search/?query=${req.query.query}/`);
    res.json({
      url: req.url,
      locations: response.data
    });
  } catch (exception) {
    console.error("Error fetching location results");
    res.status(500);
  }
});


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
