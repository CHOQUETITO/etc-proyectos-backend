'use strict';

const debug = require('debug')('app:controller:usuario');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupProyectosController (services) {
  const {ProyectosService} = services;

  async function findAll (req, res, next){
    const  respuestaProyectos = await ProyectosService.findAll();
    return res.status(200).send ({respuestaProyectos});
    
  };
  return {
    findAll
  };
};
