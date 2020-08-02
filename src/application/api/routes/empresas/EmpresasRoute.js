'use strict';

const guard = require('express-jwt-permissions')();

module.exports = function setupEmpresas (api, controllers) {
  const { EmpresasController } = controllers;
  console.log(EmpresasController);

  api.get('', EmpresasController.findAll);
  api.get('/:id', EmpresasController.findById);

  return api;
};
