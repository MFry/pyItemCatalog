#!/usr/bin/env bash

apt-get -qq update


vagrantTip="The shared directory is located at /vagrant\nTo access your shared files: cd /vagrant"
echo -e $vagrantTip > /etc/motd

#Ref: https://gist.github.com/dwayne/87f807f0d313b444bb37
#Ref: http://tecadmin.net/install-python-3-4-on-ubuntu-and-linuxmint/#
#Ref: http://stackoverflow.com/questions/28253681/you-need-to-install-postgresql-server-dev-x-y-for-building-a-server-side-extensi
#Ref: https://iamzed.com/2009/05/07/a-primer-on-virtualenv/
#Ref: http://www.simononsoftware.com/virtualenv-tutorial-part-2/