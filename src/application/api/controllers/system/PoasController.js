'use strict';

const debug = require('debug')('app:controller:usuario');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupPoasController (services) {
  const { PoasService } = services;

  async function findAll (req, res, next){
    const  respuestaPoas = await PoasService.findAll();
    return res.status(200).send ({respuestaPoas});
    
  };
  return {
    findAll
  };
};
