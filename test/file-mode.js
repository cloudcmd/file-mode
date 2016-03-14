'use strict';

let fs          = require('fs');
let test        = require('tape');
let sinon       = require('sinon');
let fileMode    = require('../src/file-mode');

test('arguments: no', (t) => {
    t.throws(fileMode, /path should be string!/, 'should throw when no path');
    t.end();
});

test('arguments: no mode', (t) => {
    let fn  = () => fileMode('..');;
   
    t.throws(fn, /mode should be a number!/, 'should throw when no mode');
    t.end();
});

test('arguments: condition not a function', (t) => {
    let fn  = () => fileMode('..', 0o600);
   
    t.throws(fn, /callback should be a function!/, 'should throw when callback not a function');
    t.end();
});

test('mode: "fs.chmod"', (t) => {
    const chmod = fs.chmode;
    let fn = sinon.stub();
    
    fs.chmode = sinon.spy();
    
    fs.stat('..', (error, stat) => {
        t.notOk(error, 'should be no error');
        let mode = stat.mode;
        
        fileMode('..', mode, fn);
        
        t.ok(fs.chmode.calledWith('..', mode, fn), 'fs.chmod should have been called with path and mode');
        fs.chmod = chmod;
        t.end();
    });
});
