'use strict';

const guard = require('express-jwt-permissions')();

module.exports = function setupPersonas (api, controllers) {
  const { PersonasController } = controllers;

  api.get('', PersonasController.findAll);
  api.get('/:id', PersonasController.findById);
  api.post('', PersonasController.guardarPersona);
  api.put('/:id', PersonasController.guardarPersona);
  api.delete('/:id', PersonasController.desactivarPersona);

  return api;
};

