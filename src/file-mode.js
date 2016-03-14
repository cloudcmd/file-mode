'use strict';

let fs = require('fs');

module.exports = (path, mode, callback) => {
    check(path, mode, callback);
    fs.chmode(path, mode, callback);
};

function check(path, mode, callback) {
    if (typeof path !== 'string')
        throw Error('path should be string!');
    
    if (typeof mode !== 'number')
        throw Error('mode should be a number!');
    
    if (typeof callback !== 'function')
        throw Error('callback should be a function!');
}
