-- source /home/globi/apikon/sql/processTest.sql
-- source /root/apikon/sql/processTest.sql

CREATE TABLE IF NOT EXISTS processTest(
id MEDIUMINT NOT NULL AUTO_INCREMENT,
from_id MEDIUMINT NOT NULL,
from_nick varchar(30) NOT NULL,
to_id MEDIUMINT NOT NULL,
to_nick varchar(30) NOT NULL,
wieviel int, 
wann TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id));
 -- insert into processTest(from_id,from_nick,to_id,to_nick,wieviel) values('1','suka','2','dima',4);
