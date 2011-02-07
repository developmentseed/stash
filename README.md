
# Stash

Experimental in-process key / document store for node.js. Ideal for less than 1000
records.

Stash was designed with small datasets in mind. It saves key value pairs to
a single file per database, destroying existing data with the same key. This
allows for managing data in a VCS such as Git.

## Tutorial

// Create a database 'food'.
var stash = require('stash')('data/food.db');

// Save sandwiches, retrieve.
stash.set('sandwiches', ['veggie', 'pulled pork', 'blt'], function() {
    console.log(stash.get('sandwiches'));
});

// Save fruits, list all key / value pairs.
stash.set('fruits', ['pear', 'apple', 'banana'], function() {
    console.log(stash.list());
});

// Remove sandwiches.
stash.del('sandwiches', function() {
    console.log(stash.list());
});

## Todo

- Automatically reload file when it's changed (multi process...)
- Enforce consistency - what happens when DB file is backed up during a write?
- Support versioning.
