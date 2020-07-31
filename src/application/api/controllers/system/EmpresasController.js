'use strict';

const debug = require('debug')('app:controller:usuario');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupEmpresasController (services) {
  const { EmpresasService } = services;

  async function findAll (req, res, next){
    const  respuestaEmpresas = await EmpresasService.findAll();
    return res.status(200).send ({respuestaEmpresas});
    
  };
  return {
    findAll
  };
};
