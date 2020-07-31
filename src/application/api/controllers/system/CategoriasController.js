'use strict';

const debug = require('debug')('app:controller:usuario');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupCategoriasController (services) {
  const { CategoriaService} = services;

async function findAll (req, res, next){
  const  respuestaCategorias = await CategoriaService.findAll();
  return res.status(200).send ({respuestaCategorias});
  
};
  return {
    findAll
  };
};
