'use strict';

const { getQuery, errorHandler, toJSON } = require('../../lib/util');
const Repository = require('../Repository');
const { text } = require('../../../common');

module.exports = function empresasRepository (models, Sequelize) {
  const { usuarios, roles, personas, empresas } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    let query = getQuery(params);
    query.where = {};

    if (params.nombre){
      query.where.nombre = {
        [Op.iLike] : `%${params.nombre}%`
      };
    }
    query.where.estado = 'ACTIVO'

    const result = await empresas.findAndCountAll(query);
    return toJSON(result);
  }
  async function findById (id = null) {
    const result = await empresas.findByPk(id);
    return result;
  }
  return {
    findAll,
    findById,
    createOrUpdate: (item, t) => Repository.createOrUpdate(item, empresas, t),
    deleteItem: (id, t) => Repository.deleteItem(id, empresas, t)
  };
};
