'use strict';

const guard = require('express-jwt-permissions')();

module.exports = function setupProyectos (api, controllers) {
  const { ProyectosController } = controllers;

  api.get('/cantidad-proyectos', ProyectosController.cantidadProyectos);
  api.post('/reporte/:id', ProyectosController.generarReporte);
  api.get('', ProyectosController.findAll);
  api.get('/:id', ProyectosController.findById);
  api.post('', ProyectosController.guardarProyecto);
  api.put('/:id', ProyectosController.guardarProyecto);
  api.delete('/:id', ProyectosController.desactivarProyecto);
  //reportes

  return api;
};
