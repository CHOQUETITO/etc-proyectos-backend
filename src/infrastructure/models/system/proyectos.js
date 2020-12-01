'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    nombre: {
      type: DataTypes.STRING(250),
      allowNull: false,
      xlabel: lang.t('fields.nombre')
    },
    descripcion: {
      type: DataTypes.TEXT,
      xlabel: lang.t('fields.descripcion')
    },
    idComunidad: {
      type: DataTypes.INTEGER,
      xlabel: lang.t('fields.idComunidad'),
      field: 'id_comunidad'
    },
    idPoa: {
      type: DataTypes.INTEGER,
      xlabel: lang.t('fields.idPoa'),
      field: 'id_poa'
    },
    idEmpresa: {
      type: DataTypes.INTEGER,
      xlabel: lang.t('fields.idEmpresa'),
      field: 'id_empresa'
    },
    idCategoria: {
      type: DataTypes.INTEGER,
      xlabel: lang.t('fields.idCategoria'),
      field: 'id_categoria'
    },
    fechaInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      xlabel: lang.t('fields.fechaInicio'),
      field: 'fecha_inicio'
    },
    fechaFinal: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      xlabel: lang.t('fields.fechaFinal'),
      field: 'fecha_final'
    },
    estadoProyecto: {
      type: DataTypes.ENUM,
      values: ['EJECUCION', 'CONCLUIDO'],
      defaultValue: 'EJECUCION',
      allowNull: false,
      xlabel: lang.t('fields.estadoProyecto'),
      field: 'estado_proyecto'
    },
    estado: {
      type: DataTypes.ENUM,
      values: ['ACTIVO', 'INACTIVO'],
      defaultValue: 'ACTIVO',
      allowNull: false,
      xlabel: lang.t('fields.estado')
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let Proyectos = sequelize.define('proyectos', fields, {
    timestamps: false,
    tableName: 'proyectos'
  });
  return Proyectos;
};
