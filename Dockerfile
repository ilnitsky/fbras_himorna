FROM node:16 as frontend_builder
# TODO: npm run build выдает невероятное количество сообщений об устаревшем и уязвимом софте
# стоит обновить всё, включая версию node (выше 16 сейчас не билдится)
# Ещё тут очень много шрифтов и картинок в Himorna_frontend/public/assets,
# стоит почистить.
WORKDIR /app/
COPY ./Himorna_frontend/package*.json ./
RUN npm install
COPY ./Himorna_frontend/ .
RUN npm run build

FROM python:3.12-slim-bookworm
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUTF8=1

WORKDIR /app

COPY HimornaCodeBase/server-requirements.txt ./

RUN echo "[install]\ncompile = no\n\n[global]\nno-cache-dir = True\n" > /etc/pip.conf    &&\
    installPermanently="apache2 dumb-init"                                               &&\
    installTmp="apache2-dev apache2-utils"                                               &&\
    pkgsToKeep="$(apt-mark showmanual) $installPermanently"                              &&\
    apt-get update                                                                       &&\
    apt-get install -y --no-install-recommends $installPermanently $installTmp           &&\
    python3 -m pip install -r server-requirements.txt                                    &&\
    mod_wsgi-express module-config >/etc/apache2/mods-available/wsgi.load                &&\
    a2enmod headers                                                                      &&\
    a2enmod rewrite                                                                      &&\
    a2enmod wsgi                                                                         &&\
    apt-mark auto '.*' > /dev/null                                                       &&\
    apt-mark manual $pkgsToKeep                                                          &&\
    apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false         &&\
    rm -rf /var/lib/apt/lists/*

ENV POETRY_VIRTUALENVS_IN_PROJECT=true

COPY HimornaCodeBase/poetry.lock HimornaCodeBase/pyproject.toml ./

RUN poetry install --only main --no-directory                                            &&\
    echo "export PY_VENV=$(poetry env info --path)" >>/etc/apache2/envvars


COPY HimornaCodeBase .

COPY ./apache/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY ./apache/apache2.conf /etc/apache2/
COPY ./apache/launcher.py /

# TODO: наверно это стоит монтировать как volume
COPY --chown=www-data:www-data ./files /app/files

# Copy frontend data at the last point to parallelize as much as possible
COPY --from=frontend_builder --chown=www-data:www-data /app/dist/ /var/www/html/

# Rewrites SIGTERM(15) to SIGWINCH(28) for apache to do graceful exit on container shutdown
ENTRYPOINT ["dumb-init", "--rewrite", "15:28", "--" ]
CMD [ "python3", "/launcher.py" ]
