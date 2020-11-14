'use strict';

const debug = require('debug')('app:controller:personas');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupPersonasController (services) {
  const { PersonasService } = services;

  //METODO GET PARA LISTAR PERSONAS
  async function findAll (req, res, next){
    const  respuestaPersonas = await PersonasService.findAll(req.query);
    return res.status(200).send ({
      finalizado : true, mensaje: 'Se recupero correctamente', datos: respuestaPersonas
    });
    
  };

  //METODO GET PARA BUSCAR UNA PERSONA POR ID
  async function findById (req, res, next){
    try {
      const {id} = req.params;
      const  respuestaPersona = await PersonasService.findById(id);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Se recupero correctamente', datos: respuestaPersona
      });
    } catch (error) {
      return res.status(400).send ({
        finalizado : false, mensaje: error.message, datos: null
      });
    }  
  };

  //METODO POST-PUT PARA GUARDAR Y MODIFICAR UNA PERSONA
  async function guardarPersona (req, res, next) {
    if (req.params && req.params.id){
      req.body.id = req.params.id;
    }
    try {
      const respuesta = await PersonasService.guardarPersona(req.body);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Se guardo correctamente', datos: respuesta
      });
    } catch (err) {
      return res.status(400).send ({
        finalizado : false, mensaje: err.message, datos: null
      });
    }
  }

  //METODO DELETE PARA DESACTIVAR UNA PERSONA
  async function desactivarPersona (req, res, next) {
    try {
      const { id } = req.params;
      const respuesta = await PersonasService.desactivarPersona(id);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Se desactivo correctamente', datos: respuesta
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
    guardarPersona,
    desactivarPersona
  };
};
