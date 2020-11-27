'use strict';

const debug = require('debug')('app:service:usuario');
const moment = require('moment');
const crypto = require('crypto');
const { text } = require('../../../common');
const { generateToken } = require('../../../application/lib/auth');
const Service = require('../Service');
const path = require('path');
const ejs = require('ejs');
const pdf = require('html-pdf');
const fs = require('fs');
const { config } = require('../../../common');

module.exports = function cronogramasService (repositories, valueObjects, res) {

  const {CronogramasRepository} = repositories;
  const { app } = config;
  //METODO GET PARA LISTAR CRONOGRAMAS
  async function findAll (params = {}) {
    debug('Lista de Cronogramas|filtros');

   return CronogramasRepository.findAll(params);
  }

  //METODO GET PARA BUSCAR UN CRONOGRAMA POR ID
  async function findById (id = null) {
    debug('Lista de Cronogramas|filtros');
    try {
      let respuestaCronograma = await CronogramasRepository.findById(id);
      console.log('--->', respuestaCronograma);
      if (!respuestaCronograma){
        throw new Error ('No hay Valor');
      }
      if(respuestaCronograma.estado === 'INACTIVO') {
        throw new Error('El Cronograma ya fue desactivado');
      }
      return respuestaCronograma;
    } catch (error) {
      throw new Error (error.message);
    }
  }

  //METODO POST-PUT PARA GUARDAR Y MODIFICAR UN CRONOGRAMA
  async function guardarCronograma (dataCronograma) {
    try {
      dataCronograma._user_created = 1;
      const respuesta = await CronogramasRepository.createOrUpdate(dataCronograma);
      if (!respuesta) {
        throw new Error('No se guardo exitosamente en la base de datos.');
      }
      return respuesta;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //METODO DELETE PARA ELIMINAR UN CRONOGRAMA DE LA VISTA 
  async function desactivarCronograma (id) {
    try {
      const respuesta = await CronogramasRepository.deleteItem(id);
      if (!respuesta) {
        throw new Error('No se Eliminio de la vista Correctamente');
      }
      return respuesta;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // METODO PARA GENERAR REPORTES DE CRONOGRAMAS
  async function generarReporteCronogramas (id) {
    try {
      const datosCronograma = await CronogramasRepository.generarReporteCronogramas(id);
      console.log('----------', datosCronograma.rows);
      const rootPath = app.host.path;
       console.log('root path', rootPath);
      const params = {
        host: app.host.server,
        datos: datosCronograma.rows
      };
      const html = await ejs.renderFile(`${rootPath}../../views/proyectoCronogramas.ejs`, params);
      const pathFile = `${rootPath}reportes/reporte-proyecto-${datosCronograma.id}.pdf`;
      await generatePDF(html, pathFile);
      const response = fs.readFileSync(pathFile, { encoding: 'base64' });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async function generatePDF (html, pathFile) {
    return new Promise((resolve, reject) => {
      try {
        const options = {
          format: 'Letter',
          orientation: "Landscape",
          border: {
            top: "10mm", // por defecto es 0, unidades: mm, cm, in, px
            right: "10mm",
            bottom: "10mm",
            left: "10mm"
            },
          header: { "height": "10mm" },
          footer: { "height": "10mm" },
          paginationOffset: 1, // Sobreescribe el número de paginación inicial
            footer: {
            height: "10mm",
            contents: {
            default: '<span style="font-size:10px;">{{page}}</span><span style="font-size:10px;">/</span><span style="font-size:10px;">{{pages}}</span>',
            },
          },
        };
        pdf.create(html, options).toFile(pathFile, (err, res) => {
          if (err) reject(err);
          resolve(res);
        });
      } catch (error) {
        reject(error.message);
      }
    });
  }

  return {
    findAll,
    findById,
    guardarCronograma,
    desactivarCronograma,
    generarReporteCronogramas
  };
};
