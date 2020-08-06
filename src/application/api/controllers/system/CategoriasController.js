'use strict';

const debug = require('debug')('app:controller:usuario');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupCategoriasController (services) {
  const {CategoriasService} = services;

  //METODO GET PARA LISTAR CATEGORIAS
  async function findAll (req, res, next){
    const  respuestaCategorias = await CategoriasService.findAll(req.query);
    console.log('--->', req.params, req.query);
    return res.status(200).send ({respuestaCategorias});
       
  };

  //METODO GET PARA BUSCAR POR ID
  async function findById (req, res, next){
    try {
      console.log('--->', req.params, req.query);
      const {id} = req.params;
      const  respuestaCategoria = await CategoriasService.findById(id);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Se recupero correctamente', datos: respuestaCategoria
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
