#!/bin/sh
echo `date +"[%Y-%m-%d %H:%M:%S"]` "gzip dist"
npm run build:prod
rm -rf dist.tar.gz
tar -cf dist.tar ./dist
gzip dist.tar
