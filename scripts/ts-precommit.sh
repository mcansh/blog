#!/bin/bash
# You can make the script more generic by changing the matching pattern
SRC_PATTERN=".*\.(ts|tsx)$"
# needed bc env vars change when run inside a git hook
# https://stackoverflow.com/questions/3542854/calling-git-pull-from-a-git-post-update-hook
# https://serverfault.com/questions/107608/git-post-receive-hook-with-git-pull-failed-to-find-a-valid-git-directory
unset $(git rev-parse --local-env-vars)
if git diff --cached --name-only | grep --quiet -E "$SRC_PATTERN"
then
# This block executes only when there are staged files matching the pattern above
echo "type-checking typescript files"
  yarn type-check
exit $?
fi
