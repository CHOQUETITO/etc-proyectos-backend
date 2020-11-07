'use strict';

const debug = require('debug')('app:controller:usuario');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupProyectosController (services) {
  const {ProyectosService} = services;

  //METODO GET PARA LISTAR PROYECTOS
  async function findAll (req, res, next){
    const  respuestaProyectos = await ProyectosService.findAll(req.query);
    console.log('--->', req.params, req.query);
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

  //METODO DELETE PARA CANTIDAD DE PROYECTOS
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

  return {
    findAll,
    findById,
    guardarProyecto,
    desactivarProyecto,
    cantidadProyectos,
    generarReporte // pdf
  };
};
