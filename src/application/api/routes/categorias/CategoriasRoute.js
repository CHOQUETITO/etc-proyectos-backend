'use strict';

const guard = require('express-jwt-permissions')();

module.exports = function setupCategorias (api, controllers) {
  const { CategoriasController } = controllers;
  console.log(CategoriasController);

  api.get('', CategoriasController.findAll);
  
  return api;
};
