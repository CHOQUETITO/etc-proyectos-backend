'use strict';

const guard = require('express-jwt-permissions')();

module.exports = function setupComunidades (api, controllers) {
  const { ComunidadesController } = controllers;
  console.log(ComunidadesController);

  api.get('', ComunidadesController.findAll);
  api.get('/:id', ComunidadesController.findById);

  return api;
};
