FROM node:16 as frontend_builder
# TODO: npm run build выдает невероятное количество сообщений об устаревшем и уязвимом софте
# стоит обновить всё, включая версию node (выше 16 сейчас не билдится)
# Ещё тут очень много шрифтов и картинок в Himorna_frontend/public/assets,
# стоит почистить.
WORKDIR /app/
COPY ./Himorna_frontend/package*.json .
RUN npm install
COPY ./Himorna_frontend/ .
RUN npm run build

FROM python:3.6.9
# TODO: Тут тоже всё очень старое, стоит обновить версии python и requirements.txt

RUN <<EOF
set -e
# Install dumb-init for proper signal handling
DUMB_INIT_VERSION=1.2.5
cd /tmp
wget --no-cookies --quiet https://github.com/Yelp/dumb-init/releases/download/v${DUMB_INIT_VERSION}/dumb-init_${DUMB_INIT_VERSION}_amd64.deb
dpkg -i dumb-init_${DUMB_INIT_VERSION}_*.deb
rm dumb-init_${DUMB_INIT_VERSION}_*.deb

# Install apache and stuff to build mod wsgi
apt-get update
apt-get install -y --no-install-recommends apache2 apache2-dev apache2-utils
rm -rf /var/lib/apt/lists/*

EOF

WORKDIR /app

COPY HimornaCodeBase/requirements.txt .

RUN <<EOF
set -e

# Installs mod-wsgi
pip install -r requirements.txt

# Configure apache modules and mod-wsgi
mod_wsgi-express module-config >/etc/apache2/mods-available/wsgi.load
a2enmod headers
a2enmod rewrite
a2enmod wsgi
EOF

COPY ./apache/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY ./apache/apache2.conf /etc/apache2/

COPY HimornaCodeBase/ .

# TODO: наверно это стоит монтировать как volume
COPY --chown=www-data:www-data ./files /app/files

# Copy frontend data at the last point to parallelize as much as possible
COPY --from=frontend_builder --chown=www-data:www-data /app/dist/ /var/www/html/

# Rewrites SIGTERM(15) to SIGWINCH(28) for apache to do graceful exit on container shutdown
ENTRYPOINT ["dumb-init", "--rewrite", "15:28", "--" ]
CMD [ "apache2ctl", "-D", "FOREGROUND" ]
