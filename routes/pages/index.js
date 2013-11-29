var config = require( "../../lib/config" );

module.exports.editor = function( req, res ) {
  res.render( "editor.html", {
    csrf: req.csrfToken(),
    personaEmail: req.session.email,
    togetherjs: config.TOGETHERJS,
    togetherjsEnabled: config.TOGETHERJS_ENABLED
  });
};
