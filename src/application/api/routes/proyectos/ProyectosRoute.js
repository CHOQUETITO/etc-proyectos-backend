'use strict';

const guard = require('express-jwt-permissions')();

module.exports = function setupProyectos (api, controllers) {
  const { ProyectosController } = controllers;
  console.log(ProyectosController);

  api.get('', ProyectosController.findAll);
  api.get('/:id', ProyectosController.findById);
  
  return api;
};
