#!/bin/sh

( yarn prettify:check || yarn lint || true ) && yarn test yarn prod

if [ "$TRAVIS_BRANCH" = "master" ];
then
    
    git config --global user.email "travis@travis-ci.org"
    git config --global user.name "Travis CI"
    
    git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/sonarplanet/build-ci-test.git gh-pages > /dev/null
    
    cd gh-pages
    
    git rm -r .
    git add -A
    git commit -m "[CI] Clear branch"
    
    mv ../dist/* .
    
    git add -f .
    git commit -m "[CI]: publish master#$TRAVIS_COMMIT | Build $TRAVIS_BUILD_NUMBER | $(date '+%Y-%m-%d %H:%M:%S')"
    
    git push --quiet --set-upstream origin gh-pages > /dev/null
    
fi