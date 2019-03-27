insert into users (email,first_name,last_name,display_name,"password",enabled,failed_login_attempts,created_by,created_date,last_modified_by,last_modified_date)
values ('admin@test.com','Admin','Admin','Test Admin','$2a$11$WEHF4d7WFzhS.V3Wmr4uC.fBRsd5rHDTFzmir9hx4dERoBDLoThxi',1,0,'system',current_timestamp,'system',current_timestamp), -- saadmin
	('user@test.com','User','User','Test User','$2a$11$xu6V2CpFka.EjZoRxpnt/.8TT3nlWaxGR4P5RRGvLyApDvlBs5daq',1,0,'system',current_timestamp,'system',current_timestamp); --sauser

insert into privilege ("name", created_by, created_date, last_modified_by, last_modified_date)
values ('READ_PRIVILEGE','system',current_timestamp,'system',current_timestamp),
	('WRITE_PRIVILEGE','system',current_timestamp,'system',current_timestamp);

insert into "role" ("name", created_by, created_date, last_modified_by, last_modified_date)
values ('ROLE_ADMIN','system',current_timestamp,'system',current_timestamp),
	('ROLE_USER','system',current_timestamp,'system',current_timestamp);
	
insert into role_privilege (role_id,privilege_id) values (1,1),(1,2),(2,1);

insert into user_role (user_id,role_id) values (1,1),(2,2);
