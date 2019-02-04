#!/bin/bash

smoke=$(curl $1)

if [[ !($smoke =~ false) && $smoke =~ CANS ]];
then
    echo "smoketest passed"
else
    echo "smoketest failed"
fi