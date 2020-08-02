'use strict';

const guard = require('express-jwt-permissions')();

module.exports = function setupPoas (api, controllers) {
  const { PoasController } = controllers;
  console.log(PoasController);

  api.get('', PoasController.findAll);
  api.get('/:id', PoasController.findById);

  return api;
};
