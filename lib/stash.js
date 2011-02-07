
var fs = require('fs'),
    sys = require('sys');

var Stash = exports.Stash = function(path, callback) {
  if (!(this instanceof Stash)) return new Stash(path, callback);

  this._docs = {};
  this._path = path;
  this._load(callback);
};

Stash.Stash = Stash;
module.exports = Stash;

/**
 * Saves an existing key.
 */
Stash.prototype.set = function(key, val, callback) {
    this._docs[key] = val;
    this._flush(callback);
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
Stash.prototype.rm = function(key, callback) {
    delete this._docs[key];
    this._flush(callback);
}

/**
 * Flush database to disk.
 */
Stash.prototype._flush = function(callback) {
    fs.writeFile(this._path, JSON.stringify(this._docs, null, 4), 'utf8', callback);
}

/**
 * Load database from file system.
 */
Stash.prototype._load = function(callback) {
    try {
        var stash = this, docs = fs.readFile(this._path, 'utf8', function() {
	          stash._docs = JSON.parse(docs);
            callback();
        });
    }
    catch (e) {
        // Escalate exception only if permission denied.
        if (e.errno == 13) {
            throw e;
        }
        console.log("Stash._load() - " + e.message);
    }
}
