'use strict';

const debug = require('debug')('app:controller:usuario');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupComunidadesController (services) {
  const { ComunidadesService } = services;

  //METODO GET PARA LISTAR COMUNIDADES
  async function findAll (req, res, next){
    const  respuestaComunidades = await ComunidadesService.findAll(req.query);
    console.log('--->', req.params, req.query);
    return res.status(200).send ({
      finalizado : true, mensaje: 'Se recupero correctamente', datos: respuestaComunidades
    });
    
  };

  //METODO GET PARA BUSCAR POR ID
  async function findById (req, res, next){
    try {
      console.log('--->', req.params, req.query);
      const {id} = req.params;
      const  respuestaComunidades = await ComunidadesService.findById(id);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Se recupero correctamente', datos: respuestaComunidades
      });
    } catch (error) {
      return res.status(400).send ({
        finalizado : false, mensaje: error.message, datos: null
      });
    }  
  };
  return {
    findAll,
    findById
  };
};
