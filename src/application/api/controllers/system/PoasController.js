'use strict';

const debug = require('debug')('app:controller:usuario');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupPoasController (services) {
  const { PoasService } = services;

  async function findAll (req, res, next){
    const  respuestaPoas = await PoasService.findAll(req.query);
    console.log('--->', req.params, req.query);
    return res.status(200).send ({respuestaPoas});
    
  };

  async function findById (req, res, next){
    try {
      console.log('--->', req.params, req.query);
      const {id} = req.params;
      const  respuestaPoa = await PoasService.findById(id);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Se recupero correctamente', datos: respuestaPoa
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
