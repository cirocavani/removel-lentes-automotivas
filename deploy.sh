#!/usr/bin/env bash
set -eu

cd $(dirname "$0")

rm -rf out
yarn build
rsync -azP --delete out/ removellentesaut1@ftp.removellentesautomotivas.com.br:public_html
