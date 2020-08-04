'use strict';

const guard = require('express-jwt-permissions')();

module.exports = function setupCronogramas (api, controllers) {
  const { CronogramasController } = controllers;
  console.log(CronogramasController);

  api.get('', CronogramasController.findAll);
  api.get('/:id', CronogramasController.findById);
  api.post('', CronogramasController.guardarCronograma);
  api.put('', CronogramasController.guardarCronograma);
  api.delete('/:id', CronogramasController.desactivarCronograma);

  return api;
};
