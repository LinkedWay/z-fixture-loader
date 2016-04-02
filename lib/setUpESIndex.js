"use strict";
let esClient = require("../config/esClient");
let esConfig        = require('../config/esConfig')[process.env.NODE_ENV];

let setupIndex = function(callback) {
    return esClient.ping(function(error, connected) {
        if (connected) {
            return esClient.indices["delete"]({
                index: esConfig.indexName,
                ignore: 404
            }, function(error) {
                var options;
                if (error) {
                    callback(error);
                    return;
                }
                options = {
                    index: esConfig.indexName
                };
                return esClient.indices.create(options, function(error) {
                    return callback(error);
                });
            });
        } else {
            return setTimeout(function() {
                return setupIndex(callback);
            }, 100);
        }
    });
};

module.exports = setupIndex;
