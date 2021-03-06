'use strict';

const { getQuery, errorHandler, toJSON } = require('../../lib/util');
const Repository = require('../Repository');
const { text } = require('../../../common');

module.exports = function usuariosRepository (models, Sequelize) {
  const { usuarios, roles, personas, entidades } = models;
  const Op = Sequelize.Op;

  //Metodo para listar todos los Usuarios
  async function findAll (params = {}) {
    let query = getQuery(params);
    query.where = {};
    query.attributes = ['id', 'idRol', 'usuario', 'contrasena', 'email', 'estado'];
    query.include = [
      {
        attributes: ['id','nombre', 'path'],
        model: roles,
        as: 'rol'
      },
      {
        /*attributes: [
          'nombres',
          'primer_apellido',
          'segundo_apellido',
          'nombre_completo',
          'tipo_documento',
          'tipo_documento_otro',
          'nro_documento',
          'fecha_nacimiento',
          'telefono',
          'movil',
          'nacionalidad',
          'pais_nacimiento',
          'genero',
          'estado'
        ],*/
        attributes: [
          'id',
          'nombres',
          'primer_apellido',
          'segundo_apellido',
          'nro_documento',
          'documento_expedido',
          'fecha_nacimiento',
          'genero',
          'telefono',
          'email',
          'estado'
        ],
        model: personas,
        as: 'persona'
      }
    ];
    /* Comentado por cambio de columnas
    if (params.nombre_completo) {
      query.where[Op.or] = [
        {
          '$persona.nombres$': {
            [Op.iLike]: `%${params.nombre_completo}%`
          }
        },
        {
          '$persona.primer_apellido$': {
            [Op.iLike]: `%${params.nombre_completo}%`
          }
        },
        {
          '$persona.segundo_apellido$': {
            [Op.iLike]: `%${params.nombre_completo}%`
          }
        }
      ];
    } */
    if (params.telefono){
      query.where.telefono = {
        [Op.iLike] : `%${params.telefono}%`
      };
    }
    if (params.usuario) {
      query.where.usuario = {
        [Op.iLike]: `%${params.usuario}%`
      };
    }

    if (params.nombres) {
      query.where.nombres = {
        [Op.iLike]: `%${params.nombres}%`
      };
    }

    if (params.estado) {
      query.where.estado = params.estado;
    }

    if (params.estados) {
      query.where.estado = {
        [Op.in]: params.estados
      };
    }

    if (params.id_rol) {
      query.where.id_rol = params.id_rol;
    }

    if (params.id_entidad) {
      query.where.id_entidad = params.id_entidad;
    }

    if (params.id_persona) {
      query.where.id_persona = params.id_persona;
    }

    if (params.id_roles) {
      query.where.id_rol = {
        [Op.in]: params.id_roles
      };
    }

    if (params.roles) {
      query.where['$rol.nombre$'] = {
        [Op.in]: params.roles
      };
    }
    // Filtro para buscar por usuario
    if (params.id){
      query.where.id === params.id;
    }

    query.where.estado = 'ACTIVO'
    const result = await usuarios.findAndCountAll(query);
    return toJSON(result);
  }

  async function findById (id) {
    const result = await usuarios.findByPk(id, {
      include: [
        {
          attributes: ['nombre', 'path'],
          model: roles,
          as: 'rol'
        },
        //{
          //attributes: ['nombre'],
          //model: entidades,
          //as: 'entidad'
        //},
        {
          /*attributes: [
            'nombres',
            'primer_apellido',
            'segundo_apellido',
            'nombre_completo',
            'tipo_documento',
            'tipo_documento_otro',
            'nro_documento',
            'fecha_nacimiento',
            'telefono',
            'movil',
            'nacionalidad',
            'pais_nacimiento',
            'genero',
            'estado'
          ],*/
          attributes: [
            'id',
            'nombres',
            'primer_apellido',
            'segundo_apellido',
            'nro_documento',
            'documento_expedido',
            'fecha_nacimiento',
            'genero',
            'telefono',
            'email',
            'estado'
          ],
          model: personas,
          as: 'persona'
        }
      ]
    });

    if (result) {
      return result.toJSON();
    }
    return null;
  }
  // find user
  async function findByUsername (usuario, include = true) {
    let cond = {
      where: {
        usuario
      }
    };

    if (include) {
      cond.include = [
        {
          attributes: ['nombre', 'path'],
          model: roles,
          as: 'rol'
        },
        {
          /*attributes: [
            'nombres',
            'primer_apellido',
            'segundo_apellido',
            'nombre_completo',
            'tipo_documento',
            'tipo_documento_otro',
            'nro_documento',
            'fecha_nacimiento',
            'telefono',
            'movil',
            'nacionalidad',
            'pais_nacimiento',
            'genero',
            'estado'
          ],*/
          attributes: [
            'id',
            'nombres',
            'primer_apellido',
            'segundo_apellido',
            'nro_documento',
            'documento_expedido',
            'fecha_nacimiento',
            'genero',
            'telefono',
            'email',
            'estado'
          ],
          model: personas,
          as: 'persona'
        }
      ];
    } else {
      cond.include = [
        {
          attributes: ['nombre', 'path'],
          model: roles,
          as: 'rol'
        }
      ];
    }

    const result = await usuarios.findOne(cond);

    if (result) {
      return result.toJSON();
    }
    return null;
  }

  // find userByCi
  async function findByCi (persona) {
    let cond = {
      attributes: ['id', 'usuario'],
      include: [{
        attributes: ['id'],
        model: personas,
        as: 'persona',
        where: persona,
        require: true
      }]
    };

    const result = await usuarios.findOne(cond);
    if (result) {
      return result.toJSON();
    }
    return null;
  }

  async function createOrUpdate (usuario, t) {
    const cond = {
      where: {
        id: usuario.id || null
      }
    };

    const item = await usuarios.findOne(cond);

    if (item) {
      let updated;
      try {
        if (usuario.contrasena) {
          usuario.contrasena = text.encrypt(usuario.contrasena);
        }
        if (t) {
          cond.transaction = t;
        }
        updated = await usuarios.update(usuario, cond);
      } catch (e) {
        errorHandler(e);
      }
      const result = updated ? await usuarios.findOne(cond) : item;

      if (result) {
        return result.toJSON();
      }
      return null;
    }

    let result;
    try {
      if (usuario.contrasena) {
        usuario.contrasena = text.encrypt(usuario.contrasena);
      }
      result = await usuarios.create(usuario, t ? { transaction: t } : {});
    } catch (e) {
      errorHandler(e);
    }
    return result.toJSON();
  }

  return {
    findAll,
    findById,
    findByUsername,
    findByCi,
    createOrUpdate,
    deleteItem: (id, t) => Repository.deleteItem(id, usuarios, t)
  };
};
