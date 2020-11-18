'use strict';

const guard = require('express-jwt-permissions')();

module.exports = function setupRoles (api, controllers) {
  const { RolController } = controllers;

  api.get('', RolController.findAll);
  

  return api;
};
