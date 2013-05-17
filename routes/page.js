module.exports = function( view, makeURL, personaSSO, loginAPI ) {
  return function( req, res ) {
    res.render( view + ".html", {
      page: view,
      makeEndpoint: makeURL,
      personaSSO: personaSSO,
      loginAPI: loginAPI,
      email: req.session.email || ''
    } );
  };
};
