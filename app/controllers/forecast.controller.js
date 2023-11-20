const db = require("../models");
const axios = require("axios");
const Forecast = db.forecasts;

//Get the forecasts
exports.getForecasts = (req, res) => {
  // Validate request
  if (!req.body.location) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  let data = "";
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url:
      "http://api.weatherapi.com/v1/forecast.json?key=f41f135319ba4a90882160504232011&q=" +
      req.body.location +
      "&days=3",
    headers: {},
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      res.send(JSON.stringify(response.data));
    })
    .catch((error) => {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    });
};

// Create and Save a new Forecast
exports.create = (req, res) => {
  // Create a Forecast
  const forecast = {
    location: req.body.location,
    date: req.body.date,
    avgtemp: req.body.avgtemp,
  };

  console.log("forecast:", forecast);

  // Save Forecast in the database
  Forecast.create(forecast)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Forecast.",
      });
    });
};

// Retrieve all Forecasts from the database.
exports.findAll = (req, res) => {
  Forecast.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving forecasts.",
      });
    });
};

// Delete all Forecasts from the database.
exports.deleteAll = (req, res) => {
  Forecast.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Forecasts were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all forecasts.",
      });
    });
};
