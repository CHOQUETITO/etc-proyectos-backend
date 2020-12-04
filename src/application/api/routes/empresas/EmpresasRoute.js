'use strict';

const guard = require('express-jwt-permissions')();
const middleware = require('../../../lib/middleware');

module.exports = function setupEmpresas (api, controllers) {
  const { EmpresasController } = controllers;

  api.get('', EmpresasController.findAll);
  api.get('/:id', EmpresasController.findById);
  api.post('', middleware(), EmpresasController.guardarEmpresa);
  api.put('/:id', middleware(), EmpresasController.guardarEmpresa);
  api.delete('/:id', middleware(), EmpresasController.desactivarEmpresa);

  return api;
};

