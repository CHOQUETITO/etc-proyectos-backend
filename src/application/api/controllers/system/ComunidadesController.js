'use strict';

const debug = require('debug')('app:controller:usuario');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupComunidadesController (services) {
  const { ComunidadesService } = services;

  async function findAll (req, res, next){
    const  respuestaComunidades = await ComunidadesService.findAll();
    return res.status(200).send ({respuestaComunidades});
    
  };
  return {
    findAll
  };
};
