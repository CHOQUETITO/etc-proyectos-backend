'use strict';

const guard = require('express-jwt-permissions')();

module.exports = function setupProyectos (api, controllers) {
  const { ProyectosController } = controllers;

  //PARA DASHBOARD
  api.get('/cantidad-proyectos', ProyectosController.cantidadProyectos);
  api.get('/cantidad-proyectos-categorias', ProyectosController.cantidadProyectosCategorias);
  //PARA FILTROS
  api.get('/filtro-comunidad/:idComunidad', ProyectosController.fitroComunidad);
  //PARA REPORTES
  api.post('/reporte/:id', ProyectosController.generarReporte);
    //PARA FORMULARIOS
  api.get('', ProyectosController.findAll);
  api.get('/:id', ProyectosController.findById);
  api.post('', ProyectosController.guardarProyecto);
  api.put('/:id', ProyectosController.guardarProyecto);
  api.delete('/:id', ProyectosController.desactivarProyecto);
  

  return api;
};
