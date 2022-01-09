#!/bin/sh
# run with . ./setenv.sh
while read line; do export $line; done < .env

# set -a # automatically export all variables
# source .env
# set +a

# export $(xargs <.env)
# export $(xargs -L 1 <.env)

printenv | grep CV_REPO_TOKEN

# check https://stackoverflow.com/questions/43267413/shell-how-to-set-environment-variables-from-env-file
# and https://stackoverflow.com/questions/12351702/how-to-write-a-bash-script-to-set-global-environment-variable