#!/bin/bash

set -e

cd "$(dirname "${BASH_SOURCE[0]}")"
./.deploy.sh 1>travis.log 2> travis.errors.log
