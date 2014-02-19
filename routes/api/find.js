var utils = require( "../../lib/utilities" );

module.exports = function( req, res, next ) {
  var projectJSON = JSON.parse( res.locals.project.data );

  projectJSON.name = res.locals.project.name;
  projectJSON.projectID = res.locals.project.id;
  projectJSON.description = res.locals.project.description;
  projectJSON.template = res.locals.project.template;
  projectJSON.thumbnail = res.locals.project.thumbnail;
  projectJSON.publishUrl = utils.embedShellURL( req.session.user.username, res.locals.project.id );
  projectJSON.iframeUrl = utils.embedURL( req.session.user.username, res.locals.project.id );
  projectJSON.makeid = res.locals.project.makeid;
  projectJSON.background = res.locals.project.background;

  req.projectJSON = projectJSON;
  next();
};
