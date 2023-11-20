module.exports = (app) => {
  const forecasts = require("../controllers/forecast.controller.js");

  var router = require("express").Router();

  // Create a new Forecast
  router.post("/", forecasts.create);

  // Get Forecasts
  router.post("/getforecasts", forecasts.getForecasts);

  // Retrieve all Forecasts
  router.get("/", forecasts.findAll);

  // Delete all Saved Forecasts
  router.delete("/", forecasts.deleteAll);

  app.use("/api/forecasts", router);
};
