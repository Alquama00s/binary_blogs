#!/bin/bash
docker run -d -p4200:80 alquama00s/binary_blogs_frontend:0.1
docker run -d -p8000:8000 --env-file env.list alquama00s/binary_blogs_backend:0.1