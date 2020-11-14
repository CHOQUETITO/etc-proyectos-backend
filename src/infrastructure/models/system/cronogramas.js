'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    idProyecto: {
      type: DataTypes.INTEGER,
      xlabel: lang.t('fields.idProyecto'),
      field: 'id_proyecto'
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
      xlabel: lang.t('fields.nombre')
    },
    actividad: {
      type: DataTypes.STRING(250),
      allowNull: false,
      xlabel: lang.t('fields.actividad')
    },
    fecIniCronograma: {
      type: DataTypes.DATE,
      allowNull: false,
      xlabel: lang.t('fields.fecIniCronograma'),
      field: 'fec_ini_cronograma'
    },
    fecFinCronograma: {
      type: DataTypes.DATE,
      allowNull: false,
      xlabel: lang.t('fields.fecFinCronograma'),
      field: 'fec_fin_cronograma'
    },
    estadoActividad: {
      type: DataTypes.ENUM,
      values: ['PENDIENTE', 'DESARROLLO', 'CONCLUIDO'],
      defaultValue: 'PENDIENTE',
      allowNull: false,
      xlabel: lang.t('fields.estadoActividad'),
      field: 'estado_actividad'
    },
    observacion: {
      type: DataTypes.STRING(250),
      allowNull: false,
      xlabel: lang.t('fields.observacion')
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

    let Cronogramas = sequelize.define('cronogramas', fields, {
      timestamps: false,
      tableName: 'cronogramas'
    });

  return Cronogramas;
};
