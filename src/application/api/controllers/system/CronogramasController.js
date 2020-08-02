'use strict';

const debug = require('debug')('app:controller:usuario');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupCronogramasController (services) {
  const {CronogramasService} = services;

  async function findAll (req, res, next){
    const  respuestaCronogramas = await CronogramasService.findAll(req.query);
    console.log('--->', req.params, req.query);
    return res.status(200).send ({respuestaCronogramas});
    
  };

  async function findById (req, res, next){
    try {
      console.log('--->', req.params, req.query);
      const {id} = req.params;
      const  respuestaCronograma = await CronogramasService.findById(id);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Se recupero correctamente', datos: respuestaCronograma
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
