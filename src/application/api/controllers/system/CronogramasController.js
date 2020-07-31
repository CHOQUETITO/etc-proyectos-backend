'use strict';

const debug = require('debug')('app:controller:usuario');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupCronogramasController (services) {
  const {CronogramasService} = services;

  async function findAll (req, res, next){
    const  respuestaCronogramas = await CronogramasService.findAll();
    return res.status(200).send ({respuestaCronogramas});
    
  };
  return {
    findAll
  };
};
