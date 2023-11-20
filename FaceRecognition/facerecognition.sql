-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 17, 2020 at 09:41 PM
-- Server version: 5.7.28-0ubuntu0.18.04.4
-- PHP Version: 7.2.24-0ubuntu0.18.04.1
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;
--
-- Database: `facerecognition`
--

-- --------------------------------------------------------
--
-- Table structure for table `User`
--
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `UID` int primary key NOT NULL,
  `name` varchar(20),
  `email` varchar(30),
  `password` varchar(20) NOT NULL,
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
LOCK TABLES `Student` WRITE;
/*!40000 ALTER TABLE `Student` DISABLE KEYS */
;
INSERT INTO `Student`
VALUES (1, "JACK", NOW(), '2021-01-20');
/*!40000 ALTER TABLE `Student` ENABLE KEYS */
;
UNLOCK TABLES;
Create TABLE 'Course' (
  `courseID` int primary key NOT NULL AUTO_INCREMENT,
  `course_name` varchar(50),
  `classroom` varchar(10),
  `startTime` varchar(10),
  `endTime` varchar(10),
  `day` varchar(3),
  `zoomLink` varchar(300),
  `teacher_name` varchar(20),
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
Create TABLE 'Study' (
  `UID` int,
  `courseID` int,
  primary key (`UID`, `courseID`),
  foreign key (`UID`) references `User` (`UID`),
  foreign key (`courseID`) references `Course` (`courseID`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
Create TABLE `Course_note` (
  `courseID` int,
  `note` varchar(300),
  foreign key (`courseID`) references `Course` (`courseID`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
Create TABLE `Course_message` (
  `courseID` int,
  `message` varchar(300),
  foreign key (`courseID`) references `Course` (`courseID`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
Create TABLE `Time` (
  `UID` int,
  `login_time` varchar(10),
  `logout_time` varchar(10),
  `date` varchar(10),
  foreign key (`UID`) references `User` (`UID`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;