# see http://www.ruanyifeng.com/blog/2015/03/build-website-with-make.html
# for more info on Makefile
PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

.PHONY: lint 

lint:
	eslint -c .eslintrc.json src
