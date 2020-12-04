'use strict';

const guard = require('express-jwt-permissions')();
const middleware = require('../../../lib/middleware');

module.exports = function setupCronogramas (api, controllers) {
  const { CronogramasController } = controllers;

  //PARA REPORTES
  api.post('/reporteCronogramas/:id', CronogramasController.generarReporteCronogramas);
  api.get('/prueba/:id', CronogramasController.generarPrueba);
  //API CRUD
  api.get('', CronogramasController.findAll);
  api.get('/:id', CronogramasController.findById);
  api.post('', middleware(), CronogramasController.guardarCronograma);
  api.put('/:id', middleware(), CronogramasController.guardarCronograma);
  api.delete('/:id', middleware(), CronogramasController.desactivarCronograma);

  return api;
};
