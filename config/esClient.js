"use strict";

(function() {
  var Elasticsearch, client, es, esConfig;

  esConfig = require("./esConfig")[process.env.NODE_ENV];

  Elasticsearch = require("elasticsearch");

  es = require("debug")("es");

  es(esConfig);

  client = new Elasticsearch.Client(esConfig);

  client.indexName = esConfig.indexName;

  client.typeName = esConfig.typeName;

  module.exports = client;

}).call(this);
