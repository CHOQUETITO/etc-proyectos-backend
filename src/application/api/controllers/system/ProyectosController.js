'use strict';

const debug = require('debug')('app:controller:usuario');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupProyectosController (services) {
  const {ProyectosService} = services;

  //METODO GET PARA LISTAR PROYECTOS
  async function findAll (req, res, next){
    console.log('--->', req.params, req.query);
    const  respuestaProyectos = await ProyectosService.findAll(req.query);
    return res.status(200).send ({
      finalizado : true, mensaje: 'Se recupero correctamente', datos: respuestaProyectos
    });
    
  };

  //METODO GET PARA BUSCAR UNA PROYECTO POR ID
  async function findById (req, res, next){
    try {
      console.log('--->', req.params, req.query);
      const {id} = req.params;
      const  respuestaProyecto = await ProyectosService.findById(id);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Se recupero correctamente', datos: respuestaProyecto
      });
    } catch (error) {
      return res.status(400).send ({
        finalizado : false, mensaje: error.message, datos: null
      });
    }  
  };

  //METODO POST PARA GUARDAR Y MODIFICAR UN PROYECTO
  async function guardarProyecto (req, res, next){
    try { 
      if (req.params && req.params.id){
        req.body.id = req.params.id;
        req.body._user_updated = req.idUsuario;
      }else {
      req.body._user_created = req.idUsuario;
      }
      const respuesta = await ProyectosService.guardarProyecto(req.body);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Se guardo correctamente los datos:', datos: respuesta
      });
    } catch (error) {
      return res.status(400).send ({
        finalizado : false, mensaje: error.message, datos: null
      });
    }
  };

  //METODO DELETE PARA DESACTIVAR UN PROYECTO
  async function desactivarProyecto (req, res, next) {
    try {
      const { id } = req.params;
      console.log('ff', id);
      const respuesta = await ProyectosService.desactivarProyecto(id);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Se Elimino en la vista Correctamente', datos: respuesta
      });
    } catch (err) {
      return res.status(400).send ({
        finalizado : false, mensaje: err.message, datos: null
      });
    }
  }

  //METODO GET PARA LISTAR CANTIDAD DE PROYECTOS POR COMUNIDAD
  async function cantidadProyectos (req, res, next) {
    try {
      const params = req.query;
      const respuesta = await ProyectosService.cantidadProyectos(params);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Reporte recuperando correctamente', datos: respuesta
      });
    } catch (err) {
      return res.status(400).send ({
        finalizado : false, mensaje: err.message, datos: null
      });
    }
  }

  //METODO GET PARA LISTAR CANTIDAD DE PROYECTOS POR CATEGORIA
  async function cantidadProyectosCategorias (req, res, next) {
    try {
      const params = req.query;
      const respuesta = await ProyectosService.cantidadProyectosCategorias(params);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Reporte recuperando correctamente', datos: respuesta
      });
    } catch (err) {
      return res.status(400).send ({
        finalizado : false, mensaje: err.message, datos: null
      });
    }
  }

  // METODOS PARA FILTROS POR COMUNIDAD, CATEGORIA Y ENTRE FECHAS
  async function fitroComunidad (req, res, next){
    console.log('--->', req.params, req.query);
    try {
      const {idComunidad} = req.params;
      const  respuestaComunidad = await ProyectosService.fitroComunidad(idComunidad);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Se recupero correctamente', datos: respuestaComunidad
      });
    } catch (error) {
      return res.status(400).send ({
        finalizado : false, mensaje: error.message, datos: null
      });
    }  
  };

  // METODO PARA GENERAR REPORTES
  async function generarReporte (req, res) {
      try {
        const { id } = req.params;
        const respuesta = await ProyectosService.generarReporte(id);
        return res.status(200).send ({
          finalizado : true, mensaje: 'Reporte recuperando correctamente', datos: respuesta
        });
      } catch (error) {
        return res.status(400).send ({
          finalizado : false, mensaje: error.message, datos: null
        });

      }
  }

  // METODO PARA GENERAR REPORTES DE PROYECTOS POR ESTADO
  async function generarReporteEstadoProyecto (req, res) {
    try {
      //const { fechaDesde } = req.params;
      console.log('Fecha desde%%%', req.body);
      const respuesta = await ProyectosService.generarReporteEstadoProyecto(req.body);
      //console.log('-------', respuesta);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Reporte recuperando correctamente', datos: respuesta
      });
    } catch (error) {
      return res.status(400).send ({
        finalizado : false, mensaje: error.message, datos: null
      });

    }
  }

  // METODO PARA GENERAR REPORTES DE PROYECTOS POR COMUNIDAD
  async function generarReporteComunidadProyecto (req, res) {
    try {
      //const { fechaDesde } = req.params;
      console.log('Fecha desde%%%', req.body);
      const respuesta = await ProyectosService.generarReporteComunidadProyecto(req.body);
      //console.log('-------', respuesta);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Reporte recuperando correctamente', datos: respuesta
      });
    } catch (error) {
      return res.status(400).send ({
        finalizado : false, mensaje: error.message, datos: null
      });

    }
  }

  return {
    findAll,
    findById,
    guardarProyecto,
    desactivarProyecto,
    cantidadProyectos,
    cantidadProyectosCategorias,
    generarReporte, // pdf
    generarReporteEstadoProyecto, // pdf Proyectos por estado
    generarReporteComunidadProyecto, // pdf Proyectos por comunidad
    fitroComunidad  // filtro por comunidad
  };
};
