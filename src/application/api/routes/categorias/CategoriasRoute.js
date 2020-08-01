'use strict';

const guard = require('express-jwt-permissions')();

module.exports = function setupCategorias (api, controllers) {
  const { CategoriasController } = controllers;
  console.log(CategoriasController);

  api.get('', CategoriasController.findAll);
  api.get('/:id', CategoriasController.findById);
  
  return api;
};
