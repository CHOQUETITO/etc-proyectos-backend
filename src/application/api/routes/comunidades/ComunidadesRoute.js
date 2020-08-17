'use strict';

const guard = require('express-jwt-permissions')();

module.exports = function setupComunidades (api, controllers) {
  const { ComunidadesController } = controllers;

  api.get('', ComunidadesController.findAll);

  return api;
};
