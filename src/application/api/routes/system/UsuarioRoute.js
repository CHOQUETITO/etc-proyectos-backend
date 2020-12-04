'use strict';

const guard = require('express-jwt-permissions')();
const middleware = require('../../../lib/middleware');

module.exports = function setupUsuario (api, controllers) {
  const { UsuarioController } = controllers;
  
  api.get('/usuario', UsuarioController.findAll);
  api.get('/usuario/:id', UsuarioController.findById);
  api.post('/usuario', middleware(), UsuarioController.guardarUsuario);
  api.put('/usuario/:id', middleware(), UsuarioController.actualizarUsuario);
  api.put('/usuario-actualizar/:id', middleware(), UsuarioController.actualizarCuenta);
  api.delete('/usuario/:id', middleware(), UsuarioController.desactivarUsuario);
  
  
  // api.put('/:id', UsuarioController.actualizar);
  // api.delete('/:id', UsuarioController.desactivar);
  api.get('/persona-segip/:ci', guard.check(['personas:read']), UsuarioController.personaSegip);
  api.patch('/cambiar_pass', guard.check(['usuarios:update']), UsuarioController.cambiarPass);
  api.patch('/desactivar_cuenta', guard.check(['usuarios:update']), UsuarioController.desactivarCuenta);
  api.get('/menu', guard.check(['modulos:read']), UsuarioController.obtenerMenu);
  api.get('/regenerar_password/:id', guard.check(['usuarios:read']), UsuarioController.regenerarPassword);
  

  return api;
};
