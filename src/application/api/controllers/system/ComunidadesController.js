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
    return res.status(200).send ({respuestaComunidades});
    
  };
  return {
    findAll
  };
};
