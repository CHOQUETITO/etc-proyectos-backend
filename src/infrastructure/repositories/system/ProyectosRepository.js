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
      'idComunidad',
      'idCategoria',
      'idPoa',
      'idEmpresa',
      [ Sequelize.literal('fecha_inicio::date'), 'fechaInicio' ],
      [ Sequelize.literal('fecha_final::date'), 'fechaFinal' ],
      'estadoProyecto',
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
        attributes : ['id', 'nombre', 'descripcion', 'monto']
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
        as : 'cronogramas',
        attributes : ['id', 'nombre', 'actividad', 'fecIniCronograma', 'fecFinCronograma', 'estadoActividad', 'observacion']
      }
    ]
    // Querys para filtros del crud-table
    if (params.nombre){
      query.where.nombre = {
        [Op.iLike] : `%${params.nombre}%`
      };
    }
    //if (params.fechaInicio != '' && params.fechaFinal != ''){
      //  [Op.between] : [params.fechaInicio, params.fechaFinal];
    //}
    // Filtro para buscar por comunidad
    if (params.idComunidad && params.idComunidad != 'undefined'){
      query.where.idComunidad = params.idComunidad;
    }
    // Filtro para buscar por categoria
    if (params.idCategoria && params.idCategoria != 'undefined'){
      query.where.idCategoria = params.idCategoria;
    }

    query.where.estado = 'ACTIVO'

    const result = await proyectos.findAndCountAll(query);
    return toJSON(result);
  }

  //METODO GET PARA BUSCAR UN PROYECTO POR ID
  async function findById (id = null) {
    let query = {};
    query.attributes = [
      'id',
      'nombre',
      'descripcion',
      'idComunidad',
      'idCategoria',
      'idPoa',
      'idEmpresa',
      [ Sequelize.literal('fecha_inicio::date'), 'fechaInicio' ],
      [ Sequelize.literal('fecha_final::date'), 'fechaFinal' ],
      'estadoProyecto',
      'estado'
    ]
    query.where = {};
    query.where.id = id;
    query.include = [
      {
        model : comunidades,
        as : 'comunidad',
        attributes : ['id', 'nombre']
      },
      {
        model : poas,
        as : 'poa',
        attributes : ['id', 'nombre', 'descripcion', 'monto']
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
        as : 'cronogramas',
        attributes : ['id', 'nombre', 'actividad', 'fecIniCronograma', 'fecFinCronograma', 'estadoActividad', 'observacion']
      }
    ]

    query.where.estado = 'ACTIVO'

    const result = await proyectos.findOne(query);
    return result;
  }
  
  //METODO GET PARA AGRUPAR PROYECTOS POR COMUNIDAD
  async function cantidadProyectos (params) {
    // aqui jugar con params 
    const query = `
      select c.nombre, count(*) cantidad
      from
      proyectos p
      inner join comunidades c on c.id = p.id_comunidad
      where p.estado = 'ACTIVO'
      group by c.nombre
    `;
    try {
      const resultado = await proyectos.options.sequelize.query(query);
      return resultado[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // METODO GET PARA AGRUPAR PROYECTOS POR CATEGORIAS
  async function cantidadProyectosCategorias (params) {
    // aqui jugar con params 
    const query = `
      select c.nombre, count(*) cantidad
      from proyectos p
      inner join categorias c on c.id=p.id_categoria
      where p.estado = 'ACTIVO'
      group by c.nombre;
    `;
    try {
      const resultado = await proyectos.options.sequelize.query(query);
      return resultado[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // METODOS GET PARA FILTROS POR COMUNIDAD, CATEGORIA Y ENTRE FECHAS
  async function fitroComunidad (idComunidad) {
    const query = {};
    query.where = {};
    query.where.idComunidad = idComunidad;
    query.attributes = [
      'id',
      'nombre',
      'descripcion',
      'idComunidad','idCategoria',
      'idPoa',
      'idEmpresa',
      [ Sequelize.literal('fecha_inicio::date'), 'fechaInicio' ],
      [ Sequelize.literal('fecha_final::date'), 'fechaFinal' ],
      'estadoProyecto',
      'estado'
    ]
    query.include = [
      {
        model : comunidades,
        as : 'comunidad',
        attributes : ['id', 'nombre']
      },
      {
        model : poas,
        as : 'poa',
        attributes : ['id', 'nombre', 'descripcion', 'monto']
      },
      {
        model : empresas,
        as : 'empresa',
        attributes : ['id', 'nombre', 'descripcion', 'sigla', 'nit']
      },
      {
        model : categorias,
        as : 'categoria',
        attributes : ['id', 'nombre']
      },
      {
        model : cronogramas,
        as : 'cronogramas',
        attributes : ['id', 'nombre', 'actividad', 'fecIniCronograma', 'fecFinCronograma', 'estadoActividad', 'observacion']
      }
    ]
    query.where.estado = 'ACTIVO';
    const result = await proyectos.findAndCountAll(query);
    return toJSON(result);
  }

  async function findOne (id = null) {
    const query = {};
    query.where = {};
    query.where.id = id;
    query.attributes = [
      'id',
      'nombre',
      'descripcion',
      'idComunidad',
      'idCategoria',
      'idPoa',
      'idEmpresa',
      [ Sequelize.literal('fecha_inicio::date'), 'fechaInicio' ],
      [ Sequelize.literal('fecha_final::date'), 'fechaFinal' ],
      'estadoProyecto',
      'estado'
    ]
    query.include = [
      {
        model : comunidades,
        as : 'comunidad',
        attributes : ['id', 'nombre']
      },
      {
        model : poas,
        as : 'poa',
        attributes : ['id', 'nombre', 'descripcion', 'monto']
      },
      {
        model : empresas,
        as : 'empresa',
        attributes : ['id', 'nombre', 'descripcion', 'sigla', 'nit', 'direccion', 'telefonos']
      },
      {
        model : categorias,
        as : 'categoria',
        attributes : ['id', 'nombre']
      },
      {
        model : cronogramas,
        as : 'cronogramas',
        attributes : ['id', 'nombre', 'actividad', 'fecIniCronograma', 'fecFinCronograma', 'estadoActividad', 'observacion']
      }
    ]
    query.where.estado = 'ACTIVO'
    const result = await proyectos.findOne(query);
    return result;
  }

  // METODO PARA GENERAR REPORTES DE PROYECTOS POR ESTADO
  async function generarReporteEstadoProyecto (dataProyecto) {
    const fechaDesde = dataProyecto.fechaDesde;
    const fechaHasta = dataProyecto.fechaHasta;
    const estadoProyecto = dataProyecto.estadoProyecto;
    //console.log('1', fechaDesde);
    //console.log('2', fechaHasta);
    //console.log('3', estadoProyecto);
    const query = {};
    query.where = {};
    query.where.fecha_inicio = {
      [Op.between] : [fechaDesde, fechaHasta]
    };
    query.where.estado_proyecto = estadoProyecto;
    query.attributes = [
      'id',
      'nombre',
      'descripcion',
      'idComunidad',
      'idCategoria',
      'idPoa',
      'idEmpresa',
      [ Sequelize.literal('fecha_inicio::date'), 'fechaInicio' ],
      [ Sequelize.literal('fecha_final::date'), 'fechaFinal' ],
      'estadoProyecto',
      'estado'
    ]
    query.include = [
      {
        model : comunidades,
        as : 'comunidad',
        attributes : ['id', 'nombre']
      },
      {
        model : poas,
        as : 'poa',
        attributes : ['id', 'nombre', 'descripcion', 'monto']
      },
      {
        model : empresas,
        as : 'empresa',
        attributes : ['id', 'nombre', 'descripcion', 'sigla', 'nit', 'direccion', 'telefonos']
      },
      {
        model : categorias,
        as : 'categoria',
        attributes : ['id', 'nombre']
      },
      {
        model : cronogramas,
        as : 'cronogramas',
        attributes : ['id', 'nombre', 'actividad', 'fecIniCronograma', 'fecFinCronograma', 'estadoActividad', 'observacion']
      }
    ]

    query.where.estado = 'ACTIVO'
    const result = await proyectos.findAndCountAll(query);
    return result;
  }

  // METODO PARA GENERAR REPORTES DE PROYECTOS POR COMUNIDAD
  async function generarReporteComunidadProyecto (dataProyecto) {
    const fechaDesde = dataProyecto.fechaDesde;
    const fechaHasta = dataProyecto.fechaHasta;
    const idComunidad = dataProyecto.idComunidad;
    console.log('1', fechaDesde);
    console.log('2', fechaHasta);
    console.log('3', idComunidad);
    const query = {};
    query.where = {};
    query.where.fecha_inicio = {
      [Op.between] : [fechaDesde, fechaHasta]
    };
    query.where.id_comunidad = idComunidad;
    query.attributes = [
      'id',
      'nombre',
      'descripcion',
      'idComunidad',
      'idCategoria',
      'idPoa',
      'idEmpresa',
      [ Sequelize.literal('fecha_inicio::date'), 'fechaInicio' ],
      [ Sequelize.literal('fecha_final::date'), 'fechaFinal' ],
      'estadoProyecto',
      'estado'
    ]
    query.include = [
      {
        model : comunidades,
        as : 'comunidad',
        attributes : ['id', 'nombre']
      },
      {
        model : poas,
        as : 'poa',
        attributes : ['id', 'nombre', 'descripcion', 'monto']
      },
      {
        model : empresas,
        as : 'empresa',
        attributes : ['id', 'nombre', 'descripcion', 'sigla', 'nit', 'direccion', 'telefonos']
      },
      {
        model : categorias,
        as : 'categoria',
        attributes : ['id', 'nombre']
      },
      {
        model : cronogramas,
        as : 'cronogramas',
        attributes : ['id', 'nombre', 'actividad', 'fecIniCronograma', 'fecFinCronograma', 'estadoActividad', 'observacion']
      }
    ]

    query.where.estado = 'ACTIVO'
    const result = await proyectos.findAndCountAll(query);
    return result;
  }

  return {
    findAll,
    findById,
    createOrUpdate: (item, t) => Repository.createOrUpdate(item, proyectos, t),
    deleteItem: (id, t) => Repository.deleteItem(id, proyectos, t),
    cantidadProyectos,
    cantidadProyectosCategorias,
    generarReporteEstadoProyecto, // pdf Proyecto Estado
    generarReporteComunidadProyecto, // pdf Proyecto Comunidad
    findOne,
    fitroComunidad
  };
};
