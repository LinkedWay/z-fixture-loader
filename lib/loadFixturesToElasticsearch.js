"use strict";
let setupIndex      = require("./setUpESIndex")
let esClient        = require("../config/esClient");
let loadFixtures    = require('./loadFixtures');
let esConfig        = require('../config/esConfig')[process.env.NODE_ENV];

module.exports = function(callback) {
    setupIndex(function(error){
        if(error)
            return callback(error);
        let fixtures = loadFixtures();
        fixtures = Object.keys(fixtures).map(function (key) {return fixtures[key]});
        if (fixtures) {
            _loadIndex(fixtures, callback);
        }
    });

};

function _loadIndex (fixtures, callback) {
    _createBulkObject(fixtures, function(error, bulkObject) {
        var params;
        params = {
            index: esConfig.indexName,
            type: esConfig.typeName,
            refresh: true,
            body: bulkObject
        };        
        esClient.bulk(params, callback);
    });
};

function _createBulkObject (fixtures, callback) {
    let  bulkObject, i, len;
    bulkObject = [];
    for (i = 0, len = fixtures.length; i < len; i++) {
        let fixture = fixtures[i];
        bulkObject.push({
            index: {
                _id: fixture.id
            }
        });
        bulkObject.push(fixture);
    }
    return callback(null, bulkObject);
};
