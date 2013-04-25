module.exports = function( view, makeURL, personaSSO ) {
  return function( req, res ) {
    res.render( view + ".html", { page: view, makeEndpoint: makeURL, personaSSO: personaSSO } );
  };
};
