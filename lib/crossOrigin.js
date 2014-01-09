module.exports = function() {
  return function( req, res, next ) {
    res.header( "Access-Control-Allow-Origin", "*" );
    next();
  };
};
