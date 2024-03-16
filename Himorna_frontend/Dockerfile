FROM node:16
# TODO: npm run build выдает невероятное количество сообщений об устаревшем и уязвимом софте
# стоит обновить всё, включая версию node (выше 16 сейчас не билдится)
# Ещё тут очень много шрифтов и картинок в Himorna_frontend/public/assets,
# стоит почистить.
WORKDIR /app/
COPY ./package*.json .
RUN npm install
RUN npm install -g npm-check-updates
COPY ./ .
RUN npm run build

ENTRYPOINT [ "/bin/bash" ]