-- source /home/globi/apikon/sql/user.sql
-- source /root/apikon/sql/user.sql

drop table if exists users cascade;
CREATE TABLE IF NOT EXISTS users(
id MEDIUMINT NOT NULL AUTO_INCREMENT,
password VARCHAR (400) NOT NULL,
name varchar(255) NOT NULL,
brole text NOT NULL default 'non',
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
PRIMARY KEY (id),
UNIQUE (name)
);
