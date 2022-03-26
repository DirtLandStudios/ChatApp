#!/bin/bash
openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out "./ssl/wss/certificate.crt" -keyout "./ssl/wss/private.pem"