create table if not exists users (
	id integer primary key,
	email varchar(255) NOT NULL,
	first_name varchar(255) NOT NULL,
	last_name varchar(255) NULL,
	"password" varchar(255) NOT NULL,
	enabled NUMBER(1,0) default 0,
	failed_login_attempts integer,
	created_by varchar(255) NOT NULL,
	created_date timestamp NOT NULL,
	last_modified_by varchar(255),
	last_modified_date timestamp
);

create table if not exists "role" (
	id integer primary key,
	"name" varchar(255) NOT NULL,
	description varchar(255),
	created_by varchar(255) NOT NULL,
	created_date timestamp NOT NULL,
	last_modified_by varchar(255),
	last_modified_date timestamp
);

create table if not exists user_role (
	user_id integer NOT NULL,
	role_id integer NOT NULL,
	CONSTRAINT ur_role_id FOREIGN KEY (role_id) REFERENCES role(id),
	CONSTRAINT ur_role_id FOREIGN KEY (user_id) REFERENCES users(id)
);

create table if not exists privilege (
	id integer primary key,
	"name" varchar(255) NULL,
	created_by varchar(255) NOT NULL,
	created_date timestamp NOT NULL,
	last_modified_by varchar(255) NULL,
	last_modified_date timestamp NULL,	
);

create table if not exists role_privilege (
	role_id integer NOT NULL,
	privilege_id integer NOT NULL,
	CONSTRAINT rp_role_id FOREIGN KEY (privilege_id) REFERENCES privilege(id),
	CONSTRAINT rp_privilege_id FOREIGN KEY (role_id) REFERENCES role(id)
);

create table if not exists persistent_logins ( 
  username varchar(100) not null, 
  series varchar(64) primary key, 
  token varchar(64) not null, 
  last_used timestamp not null
);

commit;