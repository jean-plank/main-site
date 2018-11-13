#!/bin/bash

set -e

./.deploy.sh 1>travis.log 2> travis.errors.log
