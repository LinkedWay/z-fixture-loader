"use strict";

const   fs = require('fs');
const   path = require('path');

module.exports = function(options) {
    let fixtures = {},
        fpath = _findPath(options);

    if ( !fpath ) throw new Error('fixtures path not found');

    let files = fs.readdirSync(fpath);

    files.forEach( function (file) {
        let isJSON = _endsWith(file, '.json'),
            isJS = _endsWith(file, '.js')
        let fname = (isJSON) ? _trunc(file, 5) :
            (isJS) ? _trunc(file, 3) : null;
        if (fname) {
            fixtures[fname] = JSON.parse( fs.readFileSync( path.join(fpath, file), 'utf8') );
        }
    });

    return fixtures;
}

/**
 * Find the path where the fixtures are located
 *
 * @return {String}
 * @api private
 */
function _findPath (options) {
    // Remove the startup filename

    let dirpath = undefined;
    if(appRoot)
        dirpath = appRoot;
    else
        dirpath = path.join( module.parent.filename, '..');

    let dirname = path.basename(dirpath),
        fpath;

    if (fs.existsSync(path.join(dirpath, 'test'))) {
        dirpath = path.join(dirpath, 'test');
        dirname = 'test';
    } else {
        // TODO exit strategy can be improved.
        while( dirname !== 'test' && dirname !=='' ) {
            dirpath = path.join( dirpath, '..');
            dirname = path.basename(dirpath);
        }
    }

    if(options && options.subPath){
        dirpath = path.join(dirpath, options.subPath);
    }

    if ( dirname === 'test' ) {
        fpath = path.join( dirpath, 'fixtures');
        if ( fs.existsSync( fpath ) ) {
            return fpath;
        }
    }
};

/**
 * Truncate the end of given string by N
 *
 * @param {String} str the string to truncate
 * @param {String} n number of chars to remove
 * @return {String} result
 * @api private
 */
function _trunc(str, n) {
    return str.substr(0, str.length - n);
}

/**
 * Check whether the string ends with a given sub-string
 *
 * @param {String} str the string to check
 * @param {String} a the sub-string to find
 * @return {Boolean} true/false
 * @api private
 */
function _endsWith(str, a) {
    if (a.constructor.name === "RegExp") {
        a = escape(a);
        str = escape(str);
    } else {
        a = a.toString().replace(/(^\/)|(\/$)/g, "");
    }
    return eval("/" + a + "$/.test(str)");
}