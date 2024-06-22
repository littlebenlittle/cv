#!/bin/bash

mkdir dist && chmod 777 dist
podman run -ti --rm \
    -v ./resume.yaml:/home/pptruser/resume.yaml:ro \
    -v ./dist:/home/pptruser/dist \
    -v ./builder:/builder \
    ghcr.io/puppeteer/puppeteer \
    node /builder/builder.js
