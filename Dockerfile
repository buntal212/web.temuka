FROM node:22-bookworm-slim

ARG TEMUKA_UID=1000
ARG TEMUKA_GID=1000

WORKDIR /app

RUN groupmod -g "${TEMUKA_GID}" node \
    && usermod -u "${TEMUKA_UID}" -g "${TEMUKA_GID}" node \
    && mkdir -p /app \
    && chown -R node:node /app

USER node

EXPOSE 9000

CMD ["./docker/entrypoint.sh", "npx", "quasar", "dev", "-m", "ssr", "-H", "0.0.0.0", "-p", "9000"]
