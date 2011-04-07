#!/usr/bin/env node

// Unit tests for stash. Requires creationix step v0.0.4.
var assert = require('assert'),
    fs = require('fs'),
    Step = require('step');

// Setup.
try { fs.mkdirSync(__dirname + '/content', 0755); } catch(e) {};
try { fs.unlinkSync(__dirname + '/content/fruit.json'); } catch(e) {};
try { fs.unlinkSync(__dirname + '/content/snacks.json'); } catch(e) {};
try { fs.unlinkSync(__dirname + '/content/sandwiches.json'); } catch(e) {};

var stash = require('../stash')(__dirname + '/content'),
    docs = {
        fruit: ['pear', 'apple', 'banana'],
        sandwiches: ['veggie', 'pulled pork', 'blt']
    };

Step(
    function(e) {
        if (e) throw e;
        assert.equal(undefined, stash.get('fruit'), 'fruit is not set');
        assert.equal(undefined, stash.get('sandwiches'), 'sandwiches is not set');
        this();
    },
    function(e) {
        if (e) throw e;
        stash.set('fruit', docs.fruit, this.parallel());
        stash.set('sandwiches', docs.sandwiches, this.parallel());
    },
    function(e) {
        if (e) throw e;
        assert.deepEqual(docs.fruit, stash.get('fruit'), 'fruit is set');
        assert.deepEqual(docs.sandwiches, stash.get('sandwiches'), 'sandwiches is set');
        this();
    },
    function(e) {
        if (e) throw e;
        stash.rm('fruit', this);
    },
    function(e) {
        if (e) throw e;
        assert.equal(undefined, stash.get('fruit'), 'fruit is not set');
        assert.deepEqual(docs.sandwiches, stash.get('sandwiches'), 'sandwiches is set');
        this();
    },
    // Teardown.
    function(e) {
        if (e) throw e;
        try { fs.unlinkSync(__dirname + '/content/fruit.json'); } catch(e) {};
        try { fs.unlinkSync(__dirname + '/content/snacks.json'); } catch(e) {};
        try { fs.unlinkSync(__dirname + '/content/sandwiches.json'); } catch(e) {};
        try { fs.rmdirSync(__dirname + '/content'); } catch(e) {};
        this();
    },
    function(e) {
        if (e) throw e;
        console.log('ok');
    }
);
