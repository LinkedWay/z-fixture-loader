"use strict";
let assert = require('assert');
let fx = require('../');

describe("When load fixture to elasticsearch", function(){
   it(" should load 5 business to es", function(done){
       fx.loadFixturesToElasticsearch(function(error){
           done(error);
           assert("done", "done with test");
       });
   });
});

