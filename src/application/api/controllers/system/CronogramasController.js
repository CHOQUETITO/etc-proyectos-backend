'use strict';

const debug = require('debug')('app:controller:usuario');
const { userData, generateToken } = require('../../../lib/auth');
const moment = require('moment');

module.exports = function setupCronogramasController (services) {
  const {CronogramasService} = services;

  //METODO GET PARA LISTAR CRONOGRAMAS
  async function findAll (req, res, next){
    const  respuestaCronogramas = await CronogramasService.findAll(req.query);
    console.log('--->', req.params, req.query);
    return res.status(200).send ({
      finalizado : true, mensaje: 'Se recupero correctamente', datos: respuestaCronogramas
    });
    
  };

  //METODO GET PARA BUSCAR POR ID
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

  //METODO POST-PUT PARA GUARDAR Y MODIFICAR UN GRONOGRAMA
  async function guardarCronograma (req, res, next){
    if (req.params && req.params.id){
      req.body.id = req.params.id;
    }
    try {
      const respuesta = await CronogramasService.guardarCronograma(req.body);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Se guardo correctamente los datos:', datos: respuesta
      });
    } catch (error) {
      return res.status(400).send ({
        finalizado : false, mensaje: error.message, datos: null
      });
    }
  };

  //METODO DELETE PARA DESACTIVAR UN CRONOGRAMA
  async function desactivarCronograma (req, res, next) {
    try {
      const { id } = req.params;
      const respuesta = await CronogramasService.desactivarCronograma(id);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Se Elimino en la vista Correctamente', datos: respuesta
      });
    } catch (err) {
      return res.status(400).send ({
        finalizado : false, mensaje: err.message, datos: null
      });
    }
  }

  // METODO PARA GENERAR REPORTES DE CRONOGRAMAS
  async function generarReporteCronogramas (req, res) {
    try {
      const { id } = req.params;
      const respuesta = await CronogramasService.generarReporteCronogramas(id);
      return res.status(200).send ({
        finalizado : true, mensaje: 'Reporte recuperando correctamente', datos: respuesta
      });
    } catch (error) {
      return res.status(400).send ({
        finalizado : false, mensaje: error.message, datos: null
      });

    }
}

  //METODO GET PARA BUSCAR POR ID
  async function generarPrueba (req, res, next){
    try {
      console.log('--->', req.params, req.query);
      const {id} = req.params;
      const  respuestaCronograma = await CronogramasService.generarReporteCronogramas(id);
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
    findById,
    guardarCronograma,
    desactivarCronograma,
    generarReporteCronogramas,
    generarPrueba
  };
};
