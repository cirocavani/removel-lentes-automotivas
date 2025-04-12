#!/usr/bin/env bash
set -eu

cd $(dirname "$0")

rm -rf out
# yarnpkg generate-sitemap
yarnpkg build
rsync -azP --delete out/ removellentesaut1@ftp.removellentesautomotivas.com.br:public_html
