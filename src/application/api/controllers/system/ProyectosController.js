'use strict';

const debug = require('debug')('app:controller:usuario');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupProyectosController (services) {
  const {ProyectosService} = services;

  async function findAll (req, res, next){
    const  respuestaProyectos = await ProyectosService.findAll(req.query);
    console.log('--->', req.params, req.query);
    return res.status(200).send ({respuestaProyectos});
    
  };

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

  async function guardarProyecto (req, res, next){
    try {
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

  return {
    findAll,
    findById,
    guardarProyecto,
    desactivarProyecto
  };
};
