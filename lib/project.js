function defaultDBReadyFunction( err ) {
  if ( err ) {
    err = Array.isArray( err ) ? err[ 0 ] : err;
    console.warn( "lib/project.js: DB setup error\n", err.number ? err.number : err.code, err.message );
  }
}

module.exports = function( config, dbReadyFn ) {
  config = config || {};

  dbReadyFn = dbReadyFn || defaultDBReadyFunction;

  var username = config.username || "",
      password = config.password || "",
      Sequelize = require( "sequelize" ),
      sequelize;

  try {
    sequelize = new Sequelize( config.database, username, password, config.options );
  } catch (e) {
    dbReadyFn(e);
    return {
      isDBOnline: function isDBOnline() {
        return false;
      }
    };
  }

  var dbOnline = false,
      Project = sequelize.import( __dirname + "/models/project" ),
      butterVersion = require( "../package.json" ).version;

  sequelize.sync().complete(function( err ) {
    if ( !err ) {
      dbOnline = true;
    }

    dbReadyFn( err );
  });

  function forceRange( lower, upper, n ) {
    // Deal with n being undefined
    n = n|0;
    return n < lower ? lower : Math.min( n, upper );
  }

  // TODO: should strip out the null fields I'm not passing to attributes in results
  function getProjectsByDate( whichDate, limit, callback ) {
    Project.findAll({
      limit: forceRange( 1, 100, limit ),
      // createdAt or updatedAt
      order: whichDate + " DESC"
    }).complete( callback );
  }

  function getProjectsWhere( where, callback ) {
    Project.findAll( { where: where } ).complete( callback );
  }

  return {

    getSequelizeInstance: function(){
      return sequelize;
    },

    create: function( options, callback ) {
      options = options || {};
      var userid = options.userid,
          data = options.data;

      if ( !userid || !data ) {
        callback( "Expected userid and data on options object" );
        return;
      }

      var project = Project.build({
        data: JSON.stringify( data.data ),
        userid: userid,
        name: data.name,
        author: data.author || "",
        description: data.description,
        template: data.template,
        originalButterVersion: butterVersion,
        latestButterVersion: butterVersion,
        remixedFrom: data.remixedFrom,
        thumbnail: data.thumbnail,
        background: data.background
      });

      project.save().complete(function( err, doc ) {
        if ( err ) {
          return callback( err );
        }

        callback( null, doc );
      });
    },

    findAll: function( options, callback ) {
      options = options || {};
      var userid = options.userid;

      if ( !userid ) {
        callback( "Missing userid parameter" );
        return;
      }

      getProjectsWhere( { userid: userid }, callback );
    },

    find: function( options, callback ) {
      options = options || {};
      if ( !options.id ) {
        callback( "Missing Project ID" );
        return;
      }

      // We always have a project id, but only sometimes a userid.
      var where = options.userid ? { id: options.id, userid: options.userid } :
                                  { id: options.id };

      getProjectsWhere( where, function( err, results ) {
        if ( err ) {
          callback( err );
          return;
        }
        callback( null, results ? results[ 0 ] : null );
      });
    },

    findRecentlyCreated: function( options, callback ) {
      options = options || {};
      getProjectsByDate( "createdAt", options.limit, callback );
    },

    findRecentlyUpdated: function( options, callback ) {
      options = options || {};
      getProjectsByDate( "updatedAt", options.limit, callback );
    },

    findRecentlyRemixed: function( options, callback ) {
      options = options || {};
      Project.findAll({
        where: "NOT remixedFrom IS NULL",
        limit: forceRange( 1, 100, options.limit ),
        order: "createdAt DESC"
      }).complete( callback );
    },

    findRemixes: function( options, callback ) {
      options = options || {};
      getProjectsWhere( { remixedFrom: options.id }, callback );
    },

    isDBOnline: function isDBOnline() {
      return dbOnline;
    },

    update: function updateProject( options, callback ) {
      options = options || {};
      var userid = options.userid,
          pid = options.id,
          data = options.data;

      if ( !userid || !pid || !data ) {
        callback( "Expected userid, id, and data parameters to update" );
        return;
      }

      Project.find( { where: { userid: userid, id: pid } } )
      .success(function( project ) {
        if ( !project ) {
          callback( "project not found" );
          return;
        }

        var projectDataJSON = data.data,
            projectDataString = JSON.stringify( projectDataJSON );

        project.updateAttributes({
          data: projectDataString,
          userid: userid,
          name: data.name,
          author: data.author || "",
          description: data.description,
          template: data.template,
          latestButterVersion: butterVersion,
          remixedFrom: data.remixedFrom,
          thumbnail: data.thumbnail,
          background: data.background
        })
        .error( function( err ) {
          callback( err );
        })
        .success( function( project ) {
          callback( null, project );
        });
      })
      .error(function( error ) {
        callback( error );
      });
    }
  };
};
