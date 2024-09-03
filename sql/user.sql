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
/*
update users set brole='admin' where name='suka1';
alter table users drop column theart;
alter table users add column theart int not null default 0;
alter table users add column heart int not null default 0;
alter table users add constraint theartRestriction check(theart > -1);
alter table users add constraint heartRestriction check(heart > -1);
ERROR 4025 (23000): CONSTRAINT `heartRestriction` failed for `roulet`.`users`
alter table users add column prem varchar(1) not null default 'n';
alter table users add column mon bigint;
alter table users add column entr int not null default 0;
*/
