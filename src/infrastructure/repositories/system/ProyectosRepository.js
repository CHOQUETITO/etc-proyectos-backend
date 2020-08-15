'use strict';

const { getQuery, errorHandler, toJSON } = require('../../lib/util');
const Repository = require('../Repository');
const { text } = require('../../../common');

module.exports = function proyectosRepository (models, Sequelize) {
  const { usuarios, roles, personas, proyectos, poas, empresas, comunidades, categorias, cronogramas } = models;
  const Op = Sequelize.Op;

  //METODO GET PARA LISTAR PROYECTOS
  async function findAll (params = {}) {
    let query = getQuery(params);
    query.attributes = [
      'id',
      'nombre',
      'descripcion',
      'idComunidad','idCategoria',
      'idPoa',
      'idEmpresa',
      [ Sequelize.literal('fecha_inicio::date'), 'fechaInicio' ],
      [ Sequelize.literal('fecha_final::date'), 'fechaFinal' ],
      'estado'
    ]
    query.where = {};
    query.include = [
      {
        model : comunidades,
        as : 'comunidad',
        attributes : ['id', 'nombre']
      },
      {
        model : poas,
        as : 'poa',
        attributes : ['id', 'nombre', 'descripcion']
      },
      {
        model : empresas,
        as : 'empresa',
        attributes : ['id', 'nombre', 'descripcion', 'sigla']
      },
      {
        model : categorias,
        as : 'categoria',
        attributes : ['id', 'nombre']
      },
      {
        model : cronogramas,
        as : 'cronograma',
        attributes : ['id', 'nombre']
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
