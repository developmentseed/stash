
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
    this._flush();
}

/**
 * Flush database to disk.
 */
Stash.prototype._flush = function() {
    fs.writeFileSync(this._path, JSON.stringify(this._docs, null, 4), 'utf8');
}

/**
 * Load database from file system.
 */
Stash.prototype._load = function() {
    try {
        var docs = fs.readFileSync(this._path, 'utf8');
        this._docs = JSON.parse(docs);
    }
    catch (e) {
        // Escalate exception only if permission denied.
        if (e.errno == 13) {
            throw e;
        }
        console.log("Stash._load() - " + e.message);
    }
}
