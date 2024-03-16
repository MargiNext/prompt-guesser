#!/bin/bash

current_process=$(lsof -i:3000|sed -n 2P|awk -F " " '{print $2}')
if [ -n "$current_process" ]; then
        echo "kill $current_process"
        kill $current_process
else
        echo "no process"
fi

source .env

if [[ -z "${AWS_ACCESS_KEY_ID}" ]]; then
  echo "AWS_ACCESS_KEY_ID is not set"
  exit 1
fi

if [[ -z "${AWS_SECRET_ACCESS_KEY}" ]]; then
  echo "AWS_SECRET_ACCESS_KEY is not set"
  exit 1
fi

if [[ -z "${STABILITY_API_KEY}" ]]; then
  echo "STABILITY_API_KEY is not set"
  exit 1
fi

if [[ -z "${NEXT_PUBLIC_GA_ID}" ]]; then
  echo "NEXT_PUBLIC_GA_ID is not set"
  exit 1
fi

if [[ -z "${QUESTION_MIN_VALUE}" ]]; then
  echo "QUESTION_MIN_VALUE is not set"
  exit 1
fi

if [[ -z "${QUESTION_MAX_VALUE}" ]]; then
  echo "QUESTION_MAX_VALUE is not set"
  exit 1
fi

npm run build
nohup npm run start > ~/nohup_app.log &
