FROM oven/bun

COPY bun.lockb .
COPY package.json .
COPY tsconfig.json .

RUN bun install

COPY src ./src
RUN mkdir -p ./db
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "prod" ]

LABEL org.opencontainers.image.source https://github.com/samwarnick/eeveelutions-tracker
