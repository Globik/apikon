 -- source /home/globi/apikon/sql/banip.sql
-- source /root/apikon/sql/banip.sql
-- sudo mysql -u root -p
-- use roulet

drop table if exists banip cascade;
CREATE TABLE IF NOT EXISTS banip(
ip varchar(50) not null
);
