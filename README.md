Stash
-----
Experimental in-process key / document store for node.js. Ideal for few records
and use cases with low throughput.

Stash was designed with small datasets in mind. It saves documents to
individual JSON files in a specified directory. This allows for managing data
in a VCS such as Git.

### Tutorial

// Create a database at the 'data' directory.
var stash = require('stash')('data');

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

### Todo

- Automatically reload file when it's changed (multi process...)
- Enforce consistency - what happens when DB file is backed up during a write?
- Support versioning
