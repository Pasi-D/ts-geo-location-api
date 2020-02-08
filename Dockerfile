FROM node:12.2.0-alpine

# Metadata to the image
LABEL author="Pasindu Dilshan" \
      version="0.0.0" \
      description="Docker Image for node express"

COPY . /opt/app

WORKDIR /opt/app

RUN yarn

CMD yarn watch