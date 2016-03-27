"use strict";
let assert      = require('assert');
let esClient    = require('../config/esClient');
let fx          = require('../');

describe("When load fixture to elasticsearch", function(){
    let hits = undefined;
    before(function(done){
        fx.loadFixturesToElasticsearch(function(error){
            if(error)
                return done(error);
            esClient.search({
                body: {
                    "query": {
                        "match_all": {}
                    }
                }
            }).then(function (body) {
                hits = body.hits.hits;
            }).then(done, done);
        });
    });
    it(" should load 1 business to es", function(){
        assert.equal(hits.length, 1, "should load 1 business");
    });
});

