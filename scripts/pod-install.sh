#!/bin/bash

# We only want to run this if we are on MacOS.

OS=$(uname)
if [[ $OS = 'Darwin' ]]; then # Darwin is the system name for MacOS
  cd ios
  pod install
  cd ..
fi
