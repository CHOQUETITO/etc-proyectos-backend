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
    query.where = {};
    query.include = [
      {
        model : proyectos,
        as : 'proyecto',
        attributes : ['id', 'nombre', 'descripcion', 'fechaInicio', 'fechaFinal']
      }
    ]
    query.where.estado = 'ACTIVO'

    const result = await cronogramas.findAndCountAll(query);
    return toJSON(result);
  }

  //METODO GET PARA BUSCAR UN CRONOGRAMA POR ID
  async function findById (id = null) {
    const result = await cronogramas.findByPk(id);
    return result;
  }
  
  return {
    findAll,
    findById,
    createOrUpdate: (item, t) => Repository.createOrUpdate(item, cronogramas, t),
    deleteItem: (id, t) => Repository.deleteItem(id, cronogramas, t)
  };
};
