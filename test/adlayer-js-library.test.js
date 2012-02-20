
/**
 * Module dependencies.
 */

var adlayer-js-library = require('adlayer-js-library')
  , should = require('should');

module.exports = {
  'test .version': function(){
    adlayer-js-library.version.should.match(/^\d+\.\d+\.\d+$/);
  }
};