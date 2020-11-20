'use strict';

const debug = require('debug')('app:service:usuario');
const moment = require('moment');
const crypto = require('crypto');
const { generateToken } = require('../../../application/lib/auth');
const Service = require('../Service');
const { text } = require('../../../common');
module.exports = function userService (repositories, valueObjects) {
  const ModuloService = require('./ModuloService')(repositories, valueObjects);
  const { transaction, Iop, UsuarioRepository, PersonasRepository, Parametro, Log } = repositories;
  const {
    UsuarioUsuario,
    UsuarioContrasena,
    UsuarioEmail,
    UsuarioCargo,
    UsuarioEstado,
    PersonaNombres,
    PersonaPrimerApellido,
    PersonaSegundoApellido,
    PersonaNombreCompleto,
    PersonaTipoDocumento,
    PersonaTipoDocumentoOtro,
    PersonaNroDocumento,
    PersonaFechaNacimiento,
    PersonaMovil,
    PersonaNacionalidad,
    PersonaPaisNacimiento,
    PersonaGenero,
    PersonaTelefono,
    PersonaEstado
  } = valueObjects;

  //Metodo para listar todos los usuarios
  async function findAll (params = {}, rol, idEntidad) {
    debug('Lista de usuarios|filtros');

   /*  switch (rol) { */
      // case 'ADMIN':
      //   params.id_entidad = idEntidad;
      //   params.roles = ['ADMIN', 'USUARIO'];
      //   break;
      // case 'USUARIO':
      //   params.id_entidad = idEntidad;
      //   params.roles = ['USUARIO'];
      //   break;
    /* } */
    return UsuarioRepository.findAll();
  }
  //METODO GET PARA BUSCAR UN USUARIO POR ID
  async function findById (id = null) {
    debug('Lista de Usuarios|filtros');
    try {
      let respuestaUsuario = await UsuarioRepository.findById(id);
      if (!respuestaUsuario){
        throw new Error ('No hay Valor');
      }
      if(respuestaUsuario.estado === 'INACTIVO') {
        throw new Error('El Usuario ya fue desactivada');
      }
      return respuestaUsuario;
    } catch (error) {
      throw new Error (error.message);
    }
  }
  //async function findById (id) {
    //debug('Buscando usuario por ID');

    //return Service.findById(id, UsuarioRepository, res, 'Usuario');
  //}
  
  async function createOrUpdate (data, rol = null, idEntidad = null) {
    debug('Crear o actualizar usuario', data);

    let user;
    let { persona } = data;
    console.log('dataaaaaa', data);
    try {
      if (persona.id) { // Actualizando persona
        persona._user_updated = data._user_updated;
        persona._updated_at = data._updated_at;
        if (data.estado_persona !== undefined) persona.estado = new PersonaEstado(data.estado_persona).value;
      } else {
        persona.estado = 'ACTIVO';
        persona._user_created = 1;
      }
      persona = await PersonasRepository.createOrUpdate(persona);
      console.log('----persona-----', persona);
      let usuario = {
        id: data.id,
        // Armando Usuario ---------tito-------
        id_rol: data.idRol,
        id_persona: persona.id,
        usuario: persona.nro_documento,
        contrasena: persona.nro_documento,
        email: data.email, 
        // cargo: data.cargo,
        estado: data.estado

      };
      console.log('----usuario-----', usuario);
      if (data.id) {
        // delete usuario.contrasena;
        // delete usuario.usuario;
        usuario._user_updated = data._user_updated;
        usuario._updated_at = data._updated_at;
      } else {
        usuario._user_created = 1;
        usuario.contrasena = persona.nro_documento;
      }

      user = await UsuarioRepository.createOrUpdate(usuario);
      if (!user) {
        throw new Error(`El usuario no pudo ser creado`);
      }
    } catch (e) {
      console.log(e)
      return e;
    }


    return user;
  }

  // METODO PARA CAMBIAR USUARIO Y CONTRASEÑA DE UN USUARIO
  async function createOrUpdateCuenta (data, rol = null, idEntidad = null) {
    debug('Crear o actualizar usuario', data);

    let user;
    let { persona } = data;
    console.log('dataaaaaa', data);
    try {
      if (persona.id) { // Actualizando persona
        persona._user_updated = data._user_updated;
        persona._updated_at = data._updated_at;
        if (data.estado_persona !== undefined) persona.estado = new PersonaEstado(data.estado_persona).value;
      } else {
        persona.estado = 'ACTIVO';
        persona._user_created = 1;
      }
      persona = await PersonasRepository.createOrUpdate(persona);
      console.log('----persona-----', persona);
      let usuario = {
        id: data.id,
        // Armando Usuario ---------tito-------
        id_rol: data.idRol,
        id_persona: persona.id,
        usuario: data.usuario,
        contrasena: data.contrasena,
        email: data.email, 
        // cargo: data.cargo,
        estado: data.estado

      };
      console.log('----usuario-----', usuario);
      if (data.id) {
        // delete usuario.contrasena;
        // delete usuario.usuario;
        usuario._user_updated = data._user_updated;
        usuario._updated_at = data._updated_at;
      } else {
        usuario._user_created = 1;
        usuario.contrasena = persona.nro_documento;
      }

      user = await UsuarioRepository.createOrUpdate(usuario);
      if (!user) {
        throw new Error(`El usuario no pudo ser creado`);
      }
    } catch (e) {
      console.log(e)
      return e;
    }


    return user;
  }
  // FIN DEL METODO

  async function update (data) {
    debug('Actualizar usuario');

    if (!data.id) {
      throw new Error(`Se necesita el ID del usuario para actualizar el registro`);
    }

    let user;
    try {
      validateUser(data);
      user = await UsuarioRepository.createOrUpdate(data);
    } catch (e) {
      return e;
    }

    if (!user) {
      return new Error(`El usuario no pudo ser actualizado`);
    }

    return user;
  }

  async function deleteItem (id) {
    debug('Eliminando usuario');

    return Service.deleteItem(id, UsuarioRepository, res, 'Usuario');
  }

  async function userExist (usuario, contrasena) {
    debug(`Comprobando si el usuario ${usuario} existe`);

    let result;
    let t;
    try {
      result = await UsuarioRepository.findByUsername(usuario);
      if (!result) {
        return new Error(`No existe el usuario ${usuario}`);
      }
      if (result) {
        if (result.id_usuario) {
          result = await UsuarioRepository.findById(result.id_usuario);
        } else {
          result = await UsuarioRepository.findByUsername(result.usuario);
        }
      }
      console.log('constrasennaaa', contrasena, text.encrypt(contrasena))
      if (result.contrasena !== text.encrypt(contrasena)) {
         throw new Error(`La contraseña del usuario ${usuario} es incorrecta`);
      }

      if (result.estado === 'INACTIVO') {
        throw new Error(`El usuario ${usuario} se encuentra deshabilitado. Consulte con el administrador del sistema.`);
      }
      return result;
    } catch (e) {
      console.log(e);
      if (t) {
        await transaction.rollback(t);
      }
      throw e;
    }
  }

  async function getUser (usuario, include = true) {
    debug('Buscando usuario por nombre de usuario');

    let user;
    try {
      user = await UsuarioRepository.findByUsername(usuario, include);
    } catch (e) {
      return res.error(e);
    }

    if (!user) {
      return res.warning(new Error(`Usuario ${usuario} not found`));
    }

    return res.success(user);
  }

  async function verifySIN (usuario, contrasena, nit) {
    try {
      const loginSIN = await Iop.sin.login(nit, usuario, contrasena);
      if (loginSIN.data.Estado === 'ACTIVO HABILITADO') {
        return loginSIN;
      }
      throw new Error('El NIT se encuentra INACTIVO en la Plataforma del Sistema de Impuestos Nacionales.');
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async function getResponse (user, info = {}) {
    let respuesta;
    try {
      const usuario = user.usuario;
      // Actualizando el último login
      const now = moment().format('YYYY-MM-DD HH:mm:ss');
      await update({
        id: user.id,
        ultimo_login: now
      });
      let text = '';
      if (info.location) {
        text += `Location: ${info.location.country} -- ${info.location.city} <br />`;
      }
      if (info.navigator) {
        text += `Navigator: ${info.navigator}`;
      }
      Log.info(`El usuario: ${usuario} ingresó al sistema a las ${now}`, 'LOGIN', text, usuario, info.ip);

      // Obteniendo menu
      let menu = await ModuloService.getMenu(user.id_rol);
      let permissions = menu.permissions;
      menu = menu.menu;

      // Generando token
      let token = await generateToken(Parametro, usuario, permissions);

      // Formateando permisos
      let permisos = {};
      permissions.map(item => (permisos[item] = true));

      respuesta = {
        menu,
        token,
        permisos,
        usuario: {
          'usuario': user.usuario,
          'nombres': user.persona.nombres,
          'primer_apellido': user.persona.primer_apellido,
          'segundo_apellido': user.persona.segundo_apellido,
          'email': user.email,
          'rol': user.rol.nombre,
          'lang': 'es'
        },
        redirect: user.rol.path
      };
      return respuesta;
    } catch (e) {
      console.error('aaaaaaaaaaaaaaa', e);
      throw new Error(e.message);
    }
  }

  async function regenerar (id, idUsuario) {
    debug('Regenerar contraseña');
    try {
      let datos = await UsuarioRepository.findById(id);

      if (!datos && !datos.id) {
        return res.warning(new Error('El usuario no esta registrado'));
      }
      if (!datos.email) {
        return res.warning(new Error('El usuario no cuenta con un email registrado'));
      }
      const contrasena = crypto.randomBytes(4).toString('hex');
      const data = {
        id,
        contrasena,
        _user_updated: idUsuario
      };
      await UsuarioRepository.createOrUpdate(data);

      // let pne = await Iop.findByCode('PNE-01');
      // let cli = new ClienteNotificaciones(pne.token, pne.url);
      const email = {
        para: [datos.email],
        asunto: 'Nueva contraseña - APP',
        contenido: `<br> Nueva contraseña: <strong>${contrasena}</strong>`
      };
      let correo = await cli.correo(email);
      debug('Respuesta envio correo', correo);
      if (correo && !correo.finalizado) {
        return res.error(new Error('No se pudo enviar el correo'));
      }
      return res.success(correo);
    } catch (e) {
      return res.error(e);
    }
  }

  function validatePerson (data) {
    Service.validate(data, {
      nombres: PersonaNombres,
      primer_apellido: PersonaPrimerApellido,
      segundo_apellido: PersonaSegundoApellido,
      nombre_completo: PersonaNombreCompleto,
      tipo_documento: PersonaTipoDocumento,
      tipo_documento_otro: PersonaTipoDocumentoOtro,
      nro_documento: PersonaNroDocumento,
      fecha_nacimiento: PersonaFechaNacimiento,
      movil: PersonaMovil,
      nacionalidad: PersonaNacionalidad,
      pais_nacimiento: PersonaPaisNacimiento,
      genero: PersonaGenero,
      telefono: PersonaTelefono
    });
  }

  function validateUser (data) {
    Service.validate(data, {
      usuario: UsuarioUsuario,
      contrasena: UsuarioContrasena,
      email: UsuarioEmail,
      cargo: UsuarioCargo,
      estado: UsuarioEstado
    });
  }

  //METODO DELETE PARA DESACTIVAR UN USUARIO
  async function desactivarUsuario (id) {
    try {
      const respuesta = await UsuarioRepository.deleteItem(id);
      if (!respuesta) {
        throw new Error('No se desactivo exitosamente en la base de datos.');
      }
      return respuesta;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return {
    findAll,
    findById,
    createOrUpdate,
    createOrUpdateCuenta,
    deleteItem,
    userExist,
    getUser,
    update,
    getResponse,
    regenerar,
    desactivarUsuario
  };
};
