#!/bin/bash

# testing before publish
npm run lint
npm run build
npm run test

# purge dist
rm -fr dist

# babel transform es6 into es5
babel src --out-dir dist/npm/src --copy-files
babel libs --out-dir dist/npm/libs --copy-files
babel build/npm/index.js --out-file dist/npm/index.js

# copy vendor into npm
cp -fr vendor dist/npm

# aslo keep es6 for next gen
cp build/npm/next.js next.js
