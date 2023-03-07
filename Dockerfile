# build front-end using node slim image version 16.13.2
FROM node:16.13.2-alpine3.15
# set cli workdir to /root
WORKDIR /collections-gallery
# install git to clone
EXPOSE 3000