'use strict';

const { getQuery, errorHandler, toJSON } = require('../../lib/util');
const Repository = require('../Repository');
const { text } = require('../../../common');

module.exports = function empresasRepository (models, Sequelize) {
  const { usuarios, roles, personas, empresas } = models;
  const Op = Sequelize.Op;

  //METODO GET PARA LISTAR EMPRESAS
  async function findAll (params = {}) {
    let query = getQuery(params);
    query.attributes = [
      'id',
      'nombre',
      'descripcion',
      'sigla',
      'email',
      'telefonos',
      'direccion',
      'web',
      'nit',
      'estado'
    ]
    query.where = {};

    //Querys para filtrar
    if (params.nombre){
      query.where.nombre = {
        [Op.iLike] : `%${params.nombre}%`
      };
    }
    if (params.telefonos){
      query.where.telefonos = {
        [Op.iLike] : `%${params.telefonos}%`
      };
    }

    query.where.estado = 'ACTIVO'

    const result = await empresas.findAndCountAll(query);
    return toJSON(result);
  }

  //METODO GET PARA BUSCAR UNA EMPRESA POR ID
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
