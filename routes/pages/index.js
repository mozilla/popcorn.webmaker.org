module.exports.editor = function( req, res ) {
  res.render( 'editor.html', {
    csrf: req.session._csrf,
    personaEmail: req.session.email
  });
};

module.exports.landing = function( req, res ) {
  res.render( 'landing.html' );
};
