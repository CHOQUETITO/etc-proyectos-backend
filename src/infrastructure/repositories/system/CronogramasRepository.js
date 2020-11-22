'use strict';

const { getQuery, errorHandler, toJSON } = require('../../lib/util');
const Repository = require('../Repository');
const { text } = require('../../../common');

module.exports = function cronogramasRepository (models, Sequelize) {
  const { usuarios, roles, personas, cronogramas, proyectos } = models;
  const Op = Sequelize.Op;

  //METODO GET PARA LISTAR CRONOGRAMAS
  async function findAll (params = {}) {
    let query = getQuery(params);
    query.attributes = [
      'id',
      'idProyecto',
      'nombre',
      'actividad',
      [ Sequelize.literal('fec_ini_cronograma::date'), 'fecIniCronograma' ],
      [ Sequelize.literal('fec_fin_cronograma::date'), 'fecFinCronograma' ],
      'estadoActividad',
      'observacion',
      'estado'
    ]
    query.where = {};
    query.include = [
      {
        model : proyectos,
        as : 'proyecto',
        attributes : ['id', 'nombre', 'descripcion', 'fechaInicio', 'fechaFinal']
      }
    ]
    // Querys para filtros
    if (params.nombre){
      query.where.nombre = {
        [Op.iLike] : `%${params.nombre}%`
      };
    }

    // Filtro para buscar por proyecto
    if (params.idProyecto && params.idProyecto != 'undefined'){
      query.where.idProyecto = params.idProyecto;
    }

    query.where.estado = 'ACTIVO'

    const result = await cronogramas.findAndCountAll(query);
    return toJSON(result);
  }

  //METODO GET PARA BUSCAR UN CRONOGRAMA POR ID
  async function findById (id = null) {
    const result = await cronogramas.findByPk(id);
    return result;
  }

  //METODO FINDONE
  async function findOne (id = null) {
    const query = {};
    query.where = {};
    query.where.id_proyecto = id;
    query.attributes = [
      'id',
      'nombre',
      'actividad',
      [ Sequelize.literal('fec_ini_cronograma::date'), 'fecIniCronograma' ],
      [ Sequelize.literal('fec_fin_cronograma::date'), 'fecFinCronograma' ],
      'estadoActividad',
      'observacion'
    ]
    query.include = [
      {
        model : proyectos,
        as : 'proyecto',
        attributes : ['id', 'nombre', 'descripcion', 'idComunidad','idCategoria', 'idPoa', 'idEmpresa',
        [ Sequelize.literal('fecha_inicio::date'), 'fechaInicio' ],
        [ Sequelize.literal('fecha_final::date'), 'fechaFinal' ],
        'estado']
      },
    ]
    //para filtrar
    //if (params.idProyecto && params.idProyecto != 'undefined'){
      //query.where.idProyecto = params.idProyecto;
    //}

    query.where.estado = 'ACTIVO'
    const result = await cronogramas.findOne(query);
    return result;
  }
  
  return {
    findAll,
    findById,
    findOne,
    createOrUpdate: (item, t) => Repository.createOrUpdate(item, cronogramas, t),
    deleteItem: (id, t) => Repository.deleteItem(id, cronogramas, t)
  };
};
