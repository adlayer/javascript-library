
/**
 * Module dependencies.
 */

var biscuit = require('biscuit')
  , should = require('should');

module.exports = {
  'test .version': function(){
    biscuit.version.should.match(/^\d+\.\d+\.\d+$/);
  }
};