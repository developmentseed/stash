#!/bin/sh
echo "Testing writes"
node test_write.js
echo "Testing reads by different process"
node test_read.js
rm test.db
