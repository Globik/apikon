# apikon
Random chat-roulette based on nodejs

# Demo

[https://rouletka.ru](https://rouletka.ru)


```
 
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs
git clone https://github.com/Globik/apikon
cd apikon
npm install
https://losst.pro/ustanovka-mariadb-v-ubuntu-18-04
sudo apt -y install mariadb-server mariadb-client
sudo systemctl status mariadb
sudo mysql_secure_installation
sudo mysql -u root -p
CREATE DATABASE roulet;
CREATE USER 'roulet' IDENTIFIED BY 'roulet';
GRANT ALL ON *.* TO 'roulet'@localhost IDENTIFIED BY 'roulet';
SHOW DATABASES;
use roulet;
\q
sudo systemctl status nginx 
sudo systemctl stop nginx 
node app
docker container ls -a
docker stop my_container
screen [ENTER]
node app
or
npm install pm2 -g
cd apikon
pm2 start app.js
or
pm2 restart app.js


docker stop mariadb
mariadb
root@irclfyscdg:~# docker stop app-rouletws-1 
app-rouletws-1
root@irclfyscdg:~# docker stop app-rouletauth-1

```

## Coturn configuration

```
listening-port=3478
 tls-listening-port=5349
 listening-ip=45.12.18.172
 relay-ip=45.12.18.172
 fingerprint
 lt-cred-mech
 user=alik:1234
 realm=rouletka,ru
 cert=/etc/letsencrypt/live/rouletka.ru/fullchain.pem
 pkey=/etc/letsencrypt/live/rouletka.ru/privkey.pem
 no-stdout-log
 cli-password=qwerty

```


