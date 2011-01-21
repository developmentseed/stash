/**
 * @file
 * Do not execute directly but via test.sh.
 */
var common = require('./test_common.js');

// Initialize database.
var stash = require('../lib/stash')('test.db');

// Assert snacks.
common.compare(common.sandwiches, stash.get('snacks'));

// Assert fruit.
common.compare(common.fruit, stash.get('fruit'));

// Assert list of all entries.
var docs = stash.list();
common.compare(common.sandwiches, docs.snacks);
common.compare(common.fruit, docs.fruit);
