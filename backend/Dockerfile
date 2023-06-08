FROM python:3.10.12-alpine3.17

WORKDIR /app

COPY . .
RUN apk update && apk upgrade
RUN pip3 install -r requirements.txt


CMD ["gunicorn"]