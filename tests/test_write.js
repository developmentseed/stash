/**
 * @file
 * Do not execute directly but via test.sh.
 */
var common = require('./test_common.js');

// Initialize database.
var stash = require('../lib/stash')('test.db');

// Save sandwiches, assert.
stash.set('sandwiches', common.sandwiches);
common.compare(common.sandwiches, stash.get('sandwiches'));

// Save fruit, assert.
stash.set('fruit', common.fruit);
common.compare(common.fruit, stash.get('fruit'));

// Assert list of all entries.
var docs = stash.list();
common.compare(common.sandwiches, docs.sandwiches);
common.compare(common.fruit, docs.fruit);

// Remove sandwiches, assert, set them again as snacks.
stash.rm('sandwiches');
common.compare(undefined, stash.get('sandwiches'));
stash.set('snacks', common.sandwiches);
