# on peut pas lancer les process comme ça en bash,
# moi je les lance séparement comme un gros nazbrouk


## il faut être sudo avant (casse-couillerie de ASKPASS etc. inside)
#!/bin/bash
# Read Password
## start processes
# emacs &
# qjackctl&



## balance le servure

clear
echo mot de passe pour ta mere : 
read -s password

# tue tout
sh ../kill.sh

echo $password | sudo -S icecast -c icecast.xml &
clear
sleep 1
./darkice/darkice -c darkice.cfg&
sleep 1

cd ../SC
#sclang -D -u 57120 -l SC/conf.yaml server.scd  &
./startSC.sh &

## launch internet
cd ..
sleep 1
nodemon &

## stream with listening with vlc
sleep 2
vlc http://localhost:8001/test 

# on y retourne dans le killage parce qu'on est des oufs
./kill.sh

