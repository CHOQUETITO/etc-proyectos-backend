'use strict';

const debug = require('debug')('app:controller:usuario');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupEmpresasController (services) {
  const { EmpresasService } = services;

  async function findAll (req, res, next){
    const  respuestaEmpresas = await EmpresasService.findAll(req.query);
    console.log('--->', req.params, req.query);
    return res.status(200).send ({respuestaEmpresas});
    
  };

  async function findById (req, res, next){
    try {
      console.log('--->', req.params, req.query);
      const {id} = req.params;
      const  respuestaEmpresa = await EmpresasService.findById(id);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Se recupero correctamente', datos: respuestaEmpresa
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
