'use strict';

const guard = require('express-jwt-permissions')();
const middleware = require('../../../lib/middleware');

module.exports = function setupProyectos (api, controllers) {
  const { ProyectosController } = controllers;

  //PARA DASHBOARD
  api.get('/cantidad-proyectos', ProyectosController.cantidadProyectos);
  api.get('/cantidad-proyectos-categorias', ProyectosController.cantidadProyectosCategorias);
  //PARA FILTROS
  api.get('/filtro-comunidad/:idComunidad', ProyectosController.fitroComunidad);
  //PARA REPORTES
  api.post('/reporte/:id', ProyectosController.generarReporte);
  api.post('/reporteEstadoProyecto', ProyectosController.generarReporteEstadoProyecto);
  api.post('/reporteComunidadProyecto', ProyectosController.generarReporteComunidadProyecto);
    //PARA FORMULARIOS
  api.get('', ProyectosController.findAll);
  api.get('/:id', ProyectosController.findById);
  api.post('', middleware(), ProyectosController.guardarProyecto);
  api.put('/:id', middleware(), ProyectosController.guardarProyecto);
  api.delete('/:id', middleware(), ProyectosController.desactivarProyecto);
  

  return api;
};
