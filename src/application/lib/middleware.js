const jwt = require('jsonwebtoken');
const { config } = require('../../common');
module.exports = () => async (req, res, next) => {
    try {
      let decoded = null;
        const { authorization } = req.headers;
        if (!authorization) {
          throw new Error('No autorizado.');
        }
        const token = authorization.split('Bearer ');
        if (!token[1]) {
          throw new Error('No authorizado.');
        }
        decoded = await jwt.verify(token[1], config.auth.secret);
        req.idUsuario = decoded.idUsuario;
        // console.log('decode----', decoded);
      next();
    } catch (error) {
      res.status(401).json({
        finalizado : false,
        mensaje    : error.message,
        data       : null
      });
    }
}