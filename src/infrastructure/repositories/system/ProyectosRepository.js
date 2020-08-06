'use strict';

const { getQuery, errorHandler, toJSON } = require('../../lib/util');
const Repository = require('../Repository');
const { text } = require('../../../common');

module.exports = function proyectosRepository (models, Sequelize) {
  const { usuarios, roles, personas, proyectos, poas, empresas } = models;
  const Op = Sequelize.Op;

  //METODO GET PARA LISTAR PROYECTOS
  async function findAll (params = {}) {
    let query = getQuery(params);
    query.where = {};
    query.include = [
      {
        model : empresas,
        as : 'empresa',
        attributes : ['id', 'nombre', 'descripcion', 'sigla']
      },
      {
        model : poas,
        as : 'poa',
        attributes : ['id', 'nombre', 'descripcion']
      }
    ]
    if (params.nombre){
      query.where.nombre = {
        [Op.iLike] : `%${params.nombre}%`
      };
    }
    query.where.estado = 'ACTIVO'

    const result = await proyectos.findAndCountAll(query);
    return toJSON(result);
  }

  //METODO GET PARA BUSCAR UN PROYECTO POR ID
  async function findById (id = null) {
    const result = await proyectos.findByPk(id);
    return result;
  }


  return {
    findAll,
    findById,
    createOrUpdate: (item, t) => Repository.createOrUpdate(item, proyectos, t),
    deleteItem: (id, t) => Repository.deleteItem(id, proyectos, t)
  };
};
