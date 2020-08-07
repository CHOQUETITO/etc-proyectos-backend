'use strict';

const debug = require('debug')('app:controller:usuario');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupPoasController (services) {
  const { PoasService } = services;

  //METODO GET PARA LISTAR POAS
  async function findAll (req, res, next){
    const  respuestaPoas = await PoasService.findAll(req.query);
    console.log('--->', req.params, req.query);
    return res.status(200).send ({respuestaPoas});
    
  };

  //METODO GET PARA BUSCAR UN POA POR ID
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

  //METODO POST PARA GUARDAR Y MODIFICAR UN POA
  async function guardarPoa (req, res, next){
    try {
      const respuesta = await PoasService.guardarPoa(req.body);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Se guardo correctamente los datos:', datos: respuesta
      });
    } catch (error) {
      return res.status(400).send ({
        finalizado : false, mensaje: error.message, datos: null
      });
    }
  };

  //METODO DELETE PARA DESACTIVAR UN POA
  async function desactivarPoa (req, res, next) {
    try {
      const { id } = req.params;
      const respuesta = await PoasService.desactivarPoa(id);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Se Elimino en la vista Correctamente', datos: respuesta
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
    guardarPoa,
    desactivarPoa
  };
};
