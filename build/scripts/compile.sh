#!/bin/bash

# testing before publish
npm run lint
npm run build
npm run test

# purge dist
rm -fr dist

# babel transform es6 into es5
babel src --out-dir dist/npm/src
babel libs --out-dir dist/npm/libs
babel build/npm/index.js --out-file dist/npm/index.js

# aslo keep es6 for next gen
cp build/npm/next.js dist/npm/next.js
