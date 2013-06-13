module.exports.editor = function( req, res ) {
  res.render( 'editor.html', {
    csrf: req.session._csrf,
    personaEmail: req.session.email
  });
};
