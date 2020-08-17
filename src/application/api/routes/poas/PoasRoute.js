'use strict';

const guard = require('express-jwt-permissions')();

module.exports = function setupPoas (api, controllers) {
  const { PoasController } = controllers;

  api.get('', PoasController.findAll);
  api.get('/:id', PoasController.findById);
  api.post('', PoasController.guardarPoa);
  api.put('/:id', PoasController.guardarPoa);
  api.delete('/:id', PoasController.desactivarPoa);

  return api;
};
