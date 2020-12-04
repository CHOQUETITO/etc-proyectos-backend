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

module.exports = function proyectosService (repositories, valueObjects, res) {

  const { ProyectosRepository } = repositories;
  const { app } = config;
  //METODO PARA LISTAR PROYECTOS
  async function findAll (params = {}) {
    debug('Lista de Proyectos|filtros');

   return ProyectosRepository.findAll(params);
  }

  //METODO PARA BUSCAR UN PROYECTO POR ID
  async function findById (id = null) {
    debug('Lista de Proyecto|filtros');
    try {
      let respuestaProyecto = await ProyectosRepository.findById(id);
      console.log('--->', respuestaProyecto);
      if (!respuestaProyecto){
        throw new Error ('No hay Valor');
      }
      if(respuestaProyecto.estado === 'INACTIVO') {
        throw new Error('El proyecto ya fue desactivado');
      }
      return respuestaProyecto;
    } catch (error) {
      throw new Error (error.message);
    }
  }
  
  //METODO POST-PUT PARA GUARDAR Y MODIFICAR UN PROYECTO
  async function guardarProyecto (dataProyecto) {
    console.log('dataProyecto-->', dataProyecto);
    try {
      // dataProyecto._user_created = 1;
      const respuesta = await ProyectosRepository.createOrUpdate(dataProyecto);
      if (!respuesta) {
        throw new Error('No se guardo exitosamente en la base de datos.');
      }
      return respuesta;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  //METODO DELETE PARA ELIMINAR UN PROYECTO DE LA VISTA 
  async function desactivarProyecto (id) {
    try {
      const respuesta = await ProyectosRepository.deleteItem(id);
      if (!respuesta) {
        throw new Error('No se Eliminio de la vista Correctamente');
      }
      return respuesta;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  //METODO PARA LISTAR CANTIDAD DE PROYECTOS POR COMUNIDAD 
  async function cantidadProyectos (params) {
    try {
      const respuesta = await ProyectosRepository.cantidadProyectos(params);
      if (!respuesta) {
        throw new Error('No se reporto ningun proyecto');
      }
      return respuesta;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //METODO PARA LISTAR CANTIDAD DE PROYECTOS POR CATEGORIA 
  async function cantidadProyectosCategorias (params) {
    try {
      const respuesta = await ProyectosRepository.cantidadProyectosCategorias(params);
      if (!respuesta) {
        throw new Error('No se reporto ningun proyecto');
      }
      return respuesta;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // METODOS PARA FILTROS POR COMUNIDAD, CATEGORIA Y ENTRE FECHAS 
  async function fitroComunidad (idComunidad) {
    debug('Lista de Proyecto por Comunidad|filtros');
    try {
      let respuestaComunidad = await ProyectosRepository.fitroComunidad(idComunidad);
      if (!respuestaComunidad){
        throw new Error ('No existe proyectos por Comunidad');
      }
      if(respuestaComunidad.estado === 'INACTIVO') {
        throw new Error('La Comunidad ya fue desactivado');
      }
      return respuestaComunidad;
    } catch (error) {
      throw new Error (error.message);
    }
  }

  // METODO PARA GENERAR REPORTES PROYECTO
  async function generarReporte (id) {
    try {
      const datosProyecto = await ProyectosRepository.findOne(id);
      const rootPath = app.host.path;
      console.log('root path', rootPath);
      const params = {
        host: app.host.server,
        datos: datosProyecto
      };
      const html = await ejs.renderFile(`${rootPath}../../views/proyecto.ejs`, params);
      const pathFile = `${rootPath}reportes/reporte-proyecto-${datosProyecto.id}.pdf`;
      await generatePDF(html, pathFile);
      const response = fs.readFileSync(pathFile, { encoding: 'base64' });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // METODO PARA GENERAR REPORTES DE PROYECTOS POR ESTADO
  async function generarReporteEstadoProyecto (dataProyecto) {
    console.log('dataProyectoTito', dataProyecto);
    try {
      const datosProyecto = await ProyectosRepository.generarReporteEstadoProyecto(dataProyecto);
      // console.log('----------', datosProyecto.rows);
      const rootPath = app.host.path;
       console.log('root path', rootPath);
      const params = {
        host: app.host.server,
        datos: datosProyecto.rows
      };
      const html = await ejs.renderFile(`${rootPath}../../views/proyectoEstado.ejs`, params);
      const pathFile = `${rootPath}reportes/reporte-proyecto-${datosProyecto}.pdf`;
      await generatePDF2(html, pathFile, dataProyecto);
      const response = fs.readFileSync(pathFile, { encoding: 'base64' });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // METODO PARA GENERAR REPORTES DE PROYECTOS POR COMUNIDAD
  async function generarReporteComunidadProyecto (dataProyecto) {
    console.log('dataProyectoTito', dataProyecto);
    try {
      const datosProyecto = await ProyectosRepository.generarReporteComunidadProyecto(dataProyecto);
      // console.log('----------', datosProyecto.rows);
      const rootPath = app.host.path;
       console.log('root path', rootPath);
      const params = {
        host: app.host.server,
        datos: datosProyecto.rows
      };
      const html = await ejs.renderFile(`${rootPath}../../views/proyectoComunidad.ejs`, params);
      const pathFile = `${rootPath}reportes/reporte-proyecto-${datosProyecto}.pdf`;
      await generatePDF2(html, pathFile, dataProyecto);
      const response = fs.readFileSync(pathFile, { encoding: 'base64' });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // GENERAR PDF PARA FICHA DE PROYECTO VERTICAL
  async function generatePDF (html, pathFile) {
    return new Promise((resolve, reject) => {
      try {
        const options = {
          format: 'Letter',
          border: {
            top: "0mm", // por defecto es 0, unidades: mm, cm, in, px
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
            default: '<div style="text-align: right;"> <span style="align-items: center; font-size:12px"> &copy; Catacora - La Paz - Bolivia </span> </div>'
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

  // GENERAR PDF PARA PROYECTO POR ESTADO HORIZONTAL
  async function generatePDF2 (html, pathFile, dataProyecto) {
    console.log('daaatttt', dataProyecto);
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
            header: {
              height: "10mm",
              contents: {             
              default: '<div style="text-align: right; font-size:10px;">'+'<br><br><br><br><span style="font-size:10px;">Desde:</span>' + dataProyecto.fechaDesde + '<br><span style="font-size:10px;">Hasta:</span>' + dataProyecto.fechaHasta+'</div>'
              },
            },
            footer: {
            height: "10mm",
            contents: {
            default: '<div style="text-align: right;"> <span style="font-size:10px;">{{page}}</span><span style="font-size:10px;">/</span><span style="font-size:10px;">{{pages}}</span> </div>',
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
    guardarProyecto,
    desactivarProyecto,
    cantidadProyectos,
    cantidadProyectosCategorias,
    generarReporte,
    generarReporteEstadoProyecto, // pdf proyectos por estado
    generarReporteComunidadProyecto, // pdf proyectos por Comunidad
    fitroComunidad
  };
};
