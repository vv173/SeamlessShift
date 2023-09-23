-- MySQL Script generated by MySQL Workbench
-- Mon Sep 18 20:41:35 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema shift_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `shift_db` DEFAULT CHARACTER SET utf8 ;
USE `shift_db` ;

-- -----------------------------------------------------
-- Table `shift_db`.`facility`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shift_db`.`facility` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shift_db`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shift_db`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shift_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shift_db`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(128) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(90) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `facility_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  `deleted` TINYINT(1) NOT NULL,
  `password_change_required` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE,
  INDEX `fk_user_facility_idx` (`facility_id` ASC) VISIBLE,
  INDEX `fk_user_role1_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_facility`
    FOREIGN KEY (`facility_id`)
    REFERENCES `shift_db`.`facility` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `shift_db`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- Inserting roles
INSERT INTO shift_db.role (id, name) VALUES (1, 'user'), (2, 'admin');

-- Inserting facilities (you can add more as needed)
INSERT INTO shift_db.facility (id, name) VALUES (1, 'Facility A'), (2, 'Facility B'), (3, 'Facility C');

-- Inserting users
INSERT INTO shift_db.user (id, password, name, surname, email, phone, facility_id, role_id, deleted, password_change_required)
VALUES
  (1, '$pbkdf2-sha256$29000$uvdeC.FcSwlBaO09B8CY0w$1jWZ4nV32W9fMdu6bQT4Darq3m3DKMixb7k63xrLmUs', 'admin', 'admin', 'admin@pollub.pl', '555-555-5551', 1, 2, 0, 1), -- Admin user
  (2, '$pbkdf2-sha256$29000$.V8LwXiPca61tvb.P0fIeQ$BtPjf.0tBC8vypK6cgrYzbQka3sLi918TtdyOHwrTVY', 'Jan', 'Kowalski', 'jan.kowalski@pollub.pl', '555-555-5552', 2, 1, 0, 1), -- Regular user
  (3, '$pbkdf2-sha256$29000$E6JUKmWstRYCgBCCkPIeow$2rAXUlPWfOGceJb4nXqwAYiq5tOH/.Kw5vF9X0y/uLw', 'student', 'student', 'student@pollub.pl', '555-555-5553', 3, 1, 0, 1); -- Regular user


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
