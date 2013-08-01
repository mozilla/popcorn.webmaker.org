module.exports = function( req, res, next ) {
  var sanitizer = require( "../../lib/sanitizer" ),
      projectJSON = JSON.parse( res.locals.project.data, sanitizer.reconstituteHTMLinJSON );

  projectJSON.name = "Remix of " + res.locals.project.name;
  projectJSON.template = res.locals.project.template;
  projectJSON.remixedFrom = res.locals.project.id;
  projectJSON.makeid = res.locals.project.makeid;
  req.isRemix = true;
  req.projectJSON = projectJSON;

  next();
};
