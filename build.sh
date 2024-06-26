#!/bin/bash

mkdir dist && chmod 777 dist
podman run -ti --rm \
    -v ./resume.yaml:/home/pptruser/resume.yaml:ro \
    -v ./dist:/home/pptruser/dist \
    -v ./builder:/home/pptruser/builder \
    -v ./theme:/home/pptruser/theme:ro \
    ghcr.io/puppeteer/puppeteer \
    node builder/builder.js "$@"
