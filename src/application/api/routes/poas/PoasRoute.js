'use strict';

const guard = require('express-jwt-permissions')();
const middleware = require('../../../lib/middleware');

module.exports = function setupPoas (api, controllers) {
  const { PoasController } = controllers;

  api.get('', PoasController.findAll);
  api.get('/:id', PoasController.findById);
  api.post('', middleware(), PoasController.guardarPoa);
  api.put('/:id', middleware(), PoasController.guardarPoa);
  api.delete('/:id', middleware(), PoasController.desactivarPoa);

  return api;
};
