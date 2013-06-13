'use strict';

module.exports = function routesCtor( Project, stores, makeapiConfig ) {
  return {
    api: require( "./api" )( Project, stores, makeapiConfig ),
    pages: require( "./pages" ),
    firehose: require( "./firehose" )( Project )
  };
};
