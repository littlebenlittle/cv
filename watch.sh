#!/bin/bash

while inotifywait -r -e modify,create ./theme
    do ./build.sh "$@"
done
