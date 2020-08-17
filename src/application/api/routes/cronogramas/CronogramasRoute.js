'use strict';

const guard = require('express-jwt-permissions')();

module.exports = function setupCronogramas (api, controllers) {
  const { CronogramasController } = controllers;

  api.get('', CronogramasController.findAll);
  api.get('/:id', CronogramasController.findById);
  api.post('', CronogramasController.guardarCronograma);
  api.put('/:id', CronogramasController.guardarCronograma);
  api.delete('/:id', CronogramasController.desactivarCronograma);

  return api;
};
