#!/bin/bash

mkdir -p deploy
rsync -a dist/ deploy/

# Remove remove old files
if [[ $1 == '-d' ]]; then
	rsync -avh dist/ deploy/ --delete
fi