var fs = require('fs'),
    path = require('path'),
    sys = require('sys'),
    EventEmitter = require('events').EventEmitter,
    stashes = {};

var Stash = function(path) {
    this._docs = {};
    this._path = path;
    this._load();
};

/**
 * Saves an existing key.
 */
Stash.prototype.set = function(key, val, callback) {
    this._docs[this._key(key)] = val;
    this._flush(callback);
};

/**
 * Retrieve document at given key.
 */
Stash.prototype.get = function(key) {
    return this._docs[this._key(key)];
};

/**
 * List all documents.
 */
Stash.prototype.list = function() {
    return this._docs;
};

/**
 * Remove a document.
 */
Stash.prototype.rm = function(key, callback) {
    delete this._docs[this._key(key)];
    this._flush(callback);
};

/**
 * Sanitize and prettify key for filesystem. Replaces filesystem-unsafe
 * characters with '.' and removes cruft from the front of the key.
 */
Stash.prototype._key = function(key) {
    return key.replace(/^\W/g, '').replace(/\W/g, '.');
};

/**
 * Flush database to disk.
 */
Stash.prototype._flush = function(callback) {
    var that = this,
        queue = 0,
        trigger = new EventEmitter(),
        dequeue = function() {
            queue--;
            !queue && trigger.emit('complete');
        };

    callback && trigger.on('complete', callback);

    fs.readdir(that._path, function(err, files) {
        if (err) throw err;

        // Remove files that are no longer in the database.
        for (var i = 0; i < files.length; i++) {
            var key = files[i].replace(/.json$/, '');
            if (that._docs[key]) continue;

            queue++;
            fs.unlink(
                path.join(that._path, files[i]),
                dequeue
            );
        }
        // Write files from database.
        for (var key in that._docs) {
            queue++;
            fs.writeFile(
                path.join(that._path, key + '.json'),
                JSON.stringify(that._docs[key], null, 4),
                'utf8',
                dequeue
            );
        }
    });
};

/**
 * Load database from file system. Blocking - expected to be called at
 * application 'start time'.
 */
Stash.prototype._load = function() {
    try { fs.mkdirSync(this._path, 0755); } catch(e) {};

    var files = fs.readdirSync(this._path);
    for (var i = 0; i < files.length; i++) {
        var key = files[i].replace(/.json$/, ''),
            data = fs.readFileSync(path.join(this._path, files[i]), 'utf8');
        this._docs[key] = JSON.parse(data);
    }
};

module.exports = function(path) {
    !stashes[path] && (stashes[path] = new Stash(path));
    return stashes[path];
};

