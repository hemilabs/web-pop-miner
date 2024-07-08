# Build stage (node:20.15.0-alpine3.19)
FROM node@sha256:1bdec9c67503d33348be6e73a8e5e94aad679b32da15e4fd3956e5e48f87f623 as build

WORKDIR /build/web-pop-miner

# Install node dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci

# Build static files
COPY . .
RUN npm run build

# Run stage (nginx:1.27.0-alpine3.19-slim)
FROM nginx@sha256:66943ac4a1ca7f111097d3c656939dfe8ae2bc8314bb45d6d80419c5fb25e304

# Build metadata
ARG VERSION
ARG VCS_REF
ARG BUILD_DATE
LABEL org.opencontainers.image.created=$BUILD_DATE \
      org.opencontainers.image.authors="Hemi Labs" \
      org.opencontainers.image.url="https://github.com/hemilabs/web-pop-miner" \
      org.opencontainers.image.source="https://github.com/hemilabs/web-pop-miner" \
      org.opencontainers.image.version=$VERSION \
      org.opencontainers.image.revision=$VCS_REF \
      org.opencontainers.image.vendor="Hemi Labs" \
#      org.opencontainers.image.licenses="MIT" \
      org.opencontainers.image.title="PoP Miner web application" \
      org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.name="PoP Miner web application" \
      org.label-schema.url="https://github.com/hemilabs/web-pop-miner" \
      org.label-schema.vcs-url="https://github.com/hemilabs/web-pop-miner" \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.vendor="Hemi Labs" \
      org.label-schema.version=$VERSION \
      org.label-schema.schema-version="1.0"

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /build/web-pop-miner/dist /var/www/html/

EXPOSE 8080
