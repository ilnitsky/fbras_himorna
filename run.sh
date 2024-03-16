#!/bin/bash

socat TCP-LISTEN:17687,bind=172.17.0.1,fork,reuseaddr TCP4:127.0.0.1:7687 &
docker compose up --force-recreate --remove-orphans --build
