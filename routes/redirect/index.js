module.exports = function (app) {

  var redirectMap = [{
    route: "/src/plugins/popup/popcorn.popup.css",
    paths: [
      "/templates/assets/plugins/popup/popcorn.popup.css"
    ]
  },
  {
    route: "/src/plugins/image/popcorn.image.css",
    paths: [
      "/templates/assets/plugins/image/popcorn.image.css"
    ]
  },
  {
    route: "/src/plugins/text/popcorn.text.css",
    paths: [
      "/templates/assets/plugins/text/popcorn.text.css"
    ]
  }];

  redirectMap.forEach( function ( redirect ) {
    redirect.paths.forEach( function ( legacyRoute ) {
      app.get( legacyRoute, function ( req, res ) {
        res.redirect( 301, redirect.route );
      });
    });
  });
};
