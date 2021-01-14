FROM timbru31/java-node:11-azul-alpine-jdk-fermium
MAINTAINER oscar.berg <oscar@oscarberg.com>

ENV PLANTUML_VERSION 1.2021.0
ENV LANG en_US.UTF-8
RUN apk add --no-cache graphviz ttf-droid ttf-droid-nonlatin curl \
    && mkdir /app \
    && curl -L https://sourceforge.net/projects/plantuml/files/plantuml.${PLANTUML_VERSION}.jar/download -o /app/plantuml.jar \
    && apk del curl

COPY package.json /
COPY index.js /
COPY docker-entrypoint.sh /

RUN npm install

ENTRYPOINT [ "/docker-entrypoint.sh" ]
