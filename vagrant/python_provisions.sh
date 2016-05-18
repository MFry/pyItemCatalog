#!/usr/bin/env bash

#Thanks to Dwayne. | Link: https://gist.github.com/dwayne/87f807f0d313b444bb37
set -e
echo 'Running Python Provisions'
sudo apt-get -qq install libpq-dev python-dev
apt-get -qq install python-virtualenv
apt-get -qq install libpq-dev libreadline-dev libsqlite3-dev libssl-dev
# python3-dev
apt-get -qq install build-essential checkinstall
cd /tmp
wget -O- -q https://www.python.org/ftp/python/3.5.1/Python-3.5.1.tgz | tar xz
cd Python-3.5.1
./configure
make -s
make -s altinstall
sudo -H pip3.5 install --upgrade pip
sudo -H pip3.5 install virtualenvwrapper
virtualenv --no-site-packages /vagrant/itemCatalog/virtualenv/

echo 'Clean up...'
cd && rm -rf /tmp/Python-3.5.1
