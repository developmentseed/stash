
var fs = require('fs'),
    sys = require('sys');

var Stash = exports.Stash = function(path) {
  if (!(this instanceof Stash)) return new Stash(path);

  this._docs = {};
  this._path = path;
  this._load();
};

Stash.Stash = Stash;
module.exports = Stash;

/**
 * Saves an existing key.
 */
Stash.prototype.set = function(key, val) {
    this._docs[key] = val;
    this._flush();
}

/**
 * Retrieve document at given key.
 */
Stash.prototype.get = function(key) {
    return this._docs[key];
}

/**
 * List all documents.
 */
Stash.prototype.list = function() {
    return this._docs;
}

/**
 * Remove a document.
 */
Stash.prototype.rm = function(key) {
    delete this._docs[key];
}

/**
 * @todo Log writes to database with timestamps, support rolling back to
 * previous versions.
 */
Stash.prototype.undo = function(key) {
}

/**
 * Flush database to disk.
 */
Stash.prototype._flush() {
    // TODO.
}

/**
 * Load database from disk.
 */
Stash.prototype._load() {
    
}
