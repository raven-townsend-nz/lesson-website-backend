# noinspection SqlNoDataSourceInspectionForFile

# MySQL scripts for dropping existing tables and recreating the database table structure


### DROP EVERYTHING ###
# Tables/views must be dropped in reverse order due to referential constraints (foreign keys).
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `lesson_allocations` ;
DROP TABLE IF EXISTS `lessons`;
DROP TABLE IF EXISTS `users` ;
DROP TABLE IF EXISTS `file_submissions` ;
DROP TABLE IF EXISTS `allocation_files` ;
DROP TABLE IF EXISTS `archived_files` ;
DROP TABLE IF EXISTS `state` ;
DROP TABLE IF EXISTS `allocated_instructors`;
DROP TABLE IF EXISTS `resources`;
SET FOREIGN_KEY_CHECKS = 1;

### TABLES ###
# Tables must be created in a particular order due to referential constraints i.e. foreign keys.

CREATE TABLE `users` (
    `id`          int(11)       NOT NULL AUTO_INCREMENT,
    `email`       varchar(128)  NOT NULL,
    `first_name`  varchar(64)   NOT NULL,
    `last_name`   varchar(64)   NOT NULL,
    `password`    varchar(256)  NOT NULL COMMENT 'Only store the hash here, not the actual password!',
    `slack_id`    varchar(256)  NOT NULL,
    `auth_token`  varchar(32),
    `token_date`  DATETIME DEFAULT NULL,
    `is_admin`    bool          NOT NULL DEFAULT FALSE,
    `reset_password_token`      varchar(32),
    `reset_password_timestamp`  DATETIME,

    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_key1` (`email`),
    UNIQUE KEY `unique_key2` (`slack_id`)
);


CREATE TABLE `lessons` (
    `id`                          int(11)       NOT NULL AUTO_INCREMENT,
    `code`                        VARCHAR(5)    NOT NULL,
    `year_level`                  int(11)       NOT NULL,
    `lesson_number`               int(11)       NOT NULL,
    `title`                       VARCHAR(128)  NOT NULL,
    `lesson_plan_required`        tinyint(1)    NOT NULL DEFAULT 0,
    `time`                        VARCHAR(128)  DEFAULT NULL,
    `when_to_teach`               VARCHAR(1024) DEFAULT NULL,
    `scope`                       VARCHAR(1024) DEFAULT NULL,
    `training_notes`              VARCHAR(1024) DEFAULT NULL,
    `instructor_notes`            VARCHAR(1024) DEFAULT NULL,
    `references`                  VARCHAR(1024) DEFAULT NULL,

    PRIMARY KEY (`id`),
    CHECK ( `year_level` >= 0 AND `year_level` < 6 ),
    CHECK( `lesson_number` >= 0 )
);

CREATE TABLE `state` (
    `id`               int(11)           NOT NULL AUTO_INCREMENT,
    `state`            varchar(128)     NOT NULL,

    UNIQUE (`state`),
    PRIMARY KEY (`id`)
);


CREATE TABLE `lesson_allocations` (
    `id`                   int(11)      NOT NULL AUTO_INCREMENT,
    `lesson_id`            int(11)      NOT NULL,
    `year_group`           varchar(100) NOT NULL,
    `period`               varchar(100) NOT NULL,
    `date`                 DATE         NOT NULL,
    `lesson_plan_due`      DATE         DEFAULT NULL,
    `state_id`             int(11)      NOT NULL,
    `lesson_plan_required` tinyint(1)   NOT NULL DEFAULT 1,
    `feedback`             varchar(1024) DEFAULT NULL,


    PRIMARY KEY (`id`),
    FOREIGN KEY (`lesson_id`)            REFERENCES `lessons` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`state_id`)                REFERENCES `state` (`id`)
);


CREATE TABLE `allocated_instructors` (
    `id`                   int(11) NOT NULL AUTO_INCREMENT,
    `allocation_id`        int(11) NOT NULL,
    `instructor_id`        int(11) NOT NULL,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`allocation_id`) REFERENCES `lesson_allocations` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`instructor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);


CREATE TABLE `file_submissions` (
    `id`         int(11)         NOT NULL AUTO_INCREMENT,
    `filename`   VARCHAR(255)    NOT NULL,
    `url`        VARCHAR(1024)   DEFAULT NULL,

    PRIMARY KEY (`id`)
);


CREATE TABLE `allocation_files` (
    `id`             int(11)         NOT NULL AUTO_INCREMENT,
    `allocation_id`  int(11)         NOT NULL,
    `file_id`        int(11)         NOT NULL,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`allocation_id`) REFERENCES `lesson_allocations` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`file_id`) REFERENCES `file_submissions` (`id`) ON DELETE CASCADE

);


CREATE TABLE `archived_files` (
    `id`         int(11)         NOT NULL AUTO_INCREMENT,
    `lesson_id`  int(11)    NOT NULL,
    `file_id`    int(11)    NOT NULL,
    `group`      VARCHAR(255)    NOT NULL, # in order to keep related files together (e.g. the lesson plan and the handout)

    PRIMARY KEY (`id`),
    FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`file_id`) REFERENCES `file_submissions` (`id`) ON DELETE CASCADE
);

CREATE TABLE `resources` (
    `id`         int(11)      NOT NULL AUTO_INCREMENT,
    `name`       VARCHAR(255) NOT NULL,
    `value`      VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`),
    UNIQUE (`name`)
);

INSERT INTO `state` (`state`) VALUES
    ('Not Submitted'),
    ('Pending Approval'),
    ('Approved'),
    ('Rejected');


INSERT INTO `resources` (`name`, `value`) VALUES
    ('spreadsheetUrl', 'https://docs.google.com/spreadsheets/d/1B6gNz3i2arZ2cPpq95vPNUo1_dpB7l9TFTvt2b_irjc/edit?usp=sharing'),
    ('embedSpreadsheetUrl', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRHGXH8KbTbwd83y9XmvLTCvJR46avplW5M2169RwRBdQTf__4h2TVV3Fc7dbKnVV9UaeS-6hz4PrYd/pubhtml');
