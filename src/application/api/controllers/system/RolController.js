'use strict';

const debug = require('debug')('app:controller:usuario');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupRolController (services) {
  const { RolService} = services;

  async function findAll (req, res, next){
    try {
      console.log('--->', req.params, req.query);
      const  roles = await RolService.findAll();
      return res.status(200).send ({
        finalizado : true, mensaje: 'Se recupero correctamente', datos: roles
      });
    } catch (error) {
      console.error(error)
      return res.status(400).send ({
        finalizado : false, mensaje: error.message, datos: null
      });
    }  
  };


  return {
    findAll,
  };
};
