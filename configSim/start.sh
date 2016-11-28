# on peut pas lancer les process comme ça en bash,
# moi je les lance séparement comme un gros nazbrouk


## il faut être sudo avant (casse-couillerie de ASKPASS etc. inside)
#!/bin/bash
# Read Password
clear
echo mot de passe pour ta mere : 
read -s password
clear
echo -n $password | sudo -S icecast -c icecast.xml &
sleep 1
./darkice/darkice -c darkice.cfg
