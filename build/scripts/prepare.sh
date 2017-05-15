#!/bin/bash

# testing before publish
npm run lint && npm run build && npm run test && npm run typescript-test

if [ $? = 0 ]; then
  # purge dist
  rm -fr dist

  # babel transform es6 into es5
  babel src --out-dir dist/npm/es5/src --copy-files
  babel libs --out-dir dist/npm/es5/libs --copy-files
  babel build/npm/index.js --out-file dist/npm/es5/index.js

  # remove flowtypes
  flow-remove-types src -d dist/npm/es6/src
  flow-remove-types libs -d dist/npm/es6/libs

  # keep es6 for next.js
  cp build/npm/next.js next.js
else
  echo 'Code cant be verify, plz check ~'
fi
