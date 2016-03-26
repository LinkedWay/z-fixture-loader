"use strict";

var path = require('path');
global.appRoot = path.resolve(__dirname);

let loadFixtures = require('./lib/loadFixtures');
let loadFixturesToElasticsearch = require('./lib/loadFixturesToElasticsearch');

module.exports = {
  loadFixturesToElasticsearch: loadFixturesToElasticsearch,
  loadFixtures: loadFixtures
};
