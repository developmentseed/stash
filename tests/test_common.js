/**
 * @file
 * Common functionality for stash tests.
 */

exports.sandwiches = [
    'veggie',
    'pulled pork',
    'blt'
];

exports.fruit = [
    'pear',
    'apple',
    'banana'
];

/**
 * Non-recursively compare two objects.
 */
exports.compare = function(original, copy) {
    var error = false;
    if (original instanceof Object) {
        for (var i; i < original.length; i++) {
            if (original[i] != copy[i]) {
                error = true;
            }
        }
    }
    else {
        error = (original != copy);
    }
    error ? console.error('Mismatch') : console.log('Match');
}
