#!/bin/bash

set -euo pipefail

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

(cd "$DIR" && NODE_ENV=production npm run build)

GH_PAGES_DIR=$DIR/../k-armed-bandit-gh-pages

cd "$GH_PAGES_DIR"

git checkout gh-pages
git rm -r "$GH_PAGES_DIR/*"
cp -R "$DIR/build/" .
git add -A
git commit -m "Deploy to gh-pages branch"
git push
