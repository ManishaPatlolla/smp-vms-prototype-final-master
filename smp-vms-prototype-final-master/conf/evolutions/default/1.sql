# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table access_right (
  id                        bigint auto_increment not null,
  access_right              varchar(255),
  constraint pk_access_right primary key (id))
;

create table camera (
  id                        bigint auto_increment not null,
  friendly_name             varchar(255),
  node_name                 varchar(255),
  camera                    integer,
  name                      varchar(255),
  location_name             varchar(255),
  latitude                  double,
  longitude                 double,
  quality                   integer,
  camera_cluster_id         bigint,
  created_on                datetime,
  constraint pk_camera primary key (id))
;

create table camera_access_profile (
  id                        bigint auto_increment not null,
  camera_cluster_id         bigint,
  user_group_id             bigint,
  constraint pk_camera_access_profile primary key (id))
;

create table camera_cluster (
  id                        bigint auto_increment not null,
  name                      varchar(255),
  constraint pk_camera_cluster primary key (id))
;

create table user (
  id                        bigint auto_increment not null,
  email                     varchar(255),
  user_name                 varchar(255),
  first_name                varchar(255),
  last_name                 varchar(255),
  last_login                datetime,
  creation_date             datetime,
  active                    tinyint(1) default 0,
  password                  varchar(255),
  phone                     integer,
  user_group_id             bigint,
  user_type_id              bigint,
  constraint pk_user primary key (id))
;

create table user_group (
  id                        bigint auto_increment not null,
  name                      varchar(255),
  constraint pk_user_group primary key (id))
;

create table user_type (
  id                        bigint auto_increment not null,
  user_type                 integer,
  constraint ck_user_type_user_type check (user_type in (0,1)),
  constraint pk_user_type primary key (id))
;


create table camera_access_profile_access_right (
  camera_access_profile_id       bigint not null,
  access_right_id                bigint not null,
  constraint pk_camera_access_profile_access_right primary key (camera_access_profile_id, access_right_id))
;

create table user_camera (
  user_id                        bigint not null,
  camera_id                      bigint not null,
  constraint pk_user_camera primary key (user_id, camera_id))
;
alter table camera add constraint fk_camera_cameraCluster_1 foreign key (camera_cluster_id) references camera_cluster (id) on delete restrict on update restrict;
create index ix_camera_cameraCluster_1 on camera (camera_cluster_id);
alter table camera_access_profile add constraint fk_camera_access_profile_cameraCluster_2 foreign key (camera_cluster_id) references camera_cluster (id) on delete restrict on update restrict;
create index ix_camera_access_profile_cameraCluster_2 on camera_access_profile (camera_cluster_id);
alter table camera_access_profile add constraint fk_camera_access_profile_userGroup_3 foreign key (user_group_id) references user_group (id) on delete restrict on update restrict;
create index ix_camera_access_profile_userGroup_3 on camera_access_profile (user_group_id);
alter table user add constraint fk_user_userGroup_4 foreign key (user_group_id) references user_group (id) on delete restrict on update restrict;
create index ix_user_userGroup_4 on user (user_group_id);
alter table user add constraint fk_user_userType_5 foreign key (user_type_id) references user_type (id) on delete restrict on update restrict;
create index ix_user_userType_5 on user (user_type_id);



alter table camera_access_profile_access_right add constraint fk_camera_access_profile_access_right_camera_access_profile_01 foreign key (camera_access_profile_id) references camera_access_profile (id) on delete restrict on update restrict;

alter table camera_access_profile_access_right add constraint fk_camera_access_profile_access_right_access_right_02 foreign key (access_right_id) references access_right (id) on delete restrict on update restrict;

alter table user_camera add constraint fk_user_camera_user_01 foreign key (user_id) references user (id) on delete restrict on update restrict;

alter table user_camera add constraint fk_user_camera_camera_02 foreign key (camera_id) references camera (id) on delete restrict on update restrict;

# --- !Downs

SET FOREIGN_KEY_CHECKS=0;

drop table access_right;

drop table camera_access_profile_access_right;

drop table camera;

drop table user_camera;

drop table camera_access_profile;

drop table camera_cluster;

drop table user;

drop table user_group;

drop table user_type;

SET FOREIGN_KEY_CHECKS=1;

