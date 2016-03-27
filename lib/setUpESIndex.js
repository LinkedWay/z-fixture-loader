"use strict";
let esClient = require("../config/esClient");
let index = process.env.ES_INDEX || "local-test";

let setupIndex = function(callback) {
    return esClient.ping(function(error, connected) {
        if (connected) {
            return esClient.indices["delete"]({
                index: index,
                ignore: 404
            }, function(error) {
                var options;
                if (error) {
                    callback(error);
                    return;
                }
                options = {
                    index: index
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