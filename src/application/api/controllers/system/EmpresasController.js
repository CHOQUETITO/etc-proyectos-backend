'use strict';

const debug = require('debug')('app:controller:usuario');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupEmpresasController (services) {
  const { EmpresasService } = services;

  async function findAll (req, res, next){
    const  respuestaEmpresas = await EmpresasService.findAll(req.query);
    return res.status(200).send ({respuestaEmpresas});
    
  };

  async function findById (req, res, next){
    try {
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

  async function guardarEmpresa (req, res, next) {
    try {
      const respuesta = await EmpresasService.guardarEmpresa(req.body);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Se guardo correctamente', datos: respuesta
      });
    } catch (err) {
      return res.status(400).send ({
        finalizado : false, mensaje: err.message, datos: null
      });
    }
  }

  async function desactivarEmpresa (req, res, next) {
    try {
      const { id } = req.params;
      const respuesta = await EmpresasService.desactivarEmpresa(id);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Se guardo correctamente', datos: respuesta
      });
    } catch (err) {
      return res.status(400).send ({
        finalizado : false, mensaje: err.message, datos: null
      });
    }
  }

  return {
    findAll,
    findById,
    guardarEmpresa,
    desactivarEmpresa
  };
};
