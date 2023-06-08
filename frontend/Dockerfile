FROM node as builder
WORKDIR /build
COPY . .
RUN npm i && \
node_modules/.bin/ng build

FROM nginx
RUN rm /etc/nginx/conf.d/default.conf

COPY --from=builder /build/nginx.conf /etc/nginx/conf.d
COPY --from=builder /build/dist/frontend /usr/share/nginx/html
