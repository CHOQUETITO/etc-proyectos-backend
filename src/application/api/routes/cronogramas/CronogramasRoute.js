'use strict';

const guard = require('express-jwt-permissions')();

module.exports = function setupCronogramas (api, controllers) {
  const { CronogramasController } = controllers;
  console.log(CronogramasController);

  api.get('', CronogramasController.findAll);
  
  return api;
};
