module.exports = (sequelize, Sequelize) => {
  const Forecast = sequelize.define("forecast", {
    location: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.STRING,
    },
    avgtemp: {
      type: Sequelize.STRING,
    },
  });

  return Forecast;
};
