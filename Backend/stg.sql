-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: stg
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `applications` (
  `app_id` int(11) NOT NULL AUTO_INCREMENT,
  `date_created` date DEFAULT NULL,
  `app_status` varchar(45) DEFAULT NULL,
  `fk_profile_id` int(11) DEFAULT NULL,
  `fk_offer_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`app_id`),
  KEY `fk_offer_id_idx` (`fk_offer_id`),
  KEY `fk_profile_id_idx` (`fk_profile_id`),
  CONSTRAINT `fk_offer_id` FOREIGN KEY (`fk_offer_id`) REFERENCES `offers` (`offer_id`),
  CONSTRAINT `fk_profile_id` FOREIGN KEY (`fk_profile_id`) REFERENCES `profiles` (`profile_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,'2019-10-01','pending',1,1);
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `athletes`
--

DROP TABLE IF EXISTS `athletes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `athletes` (
  `athl_id` int(11) NOT NULL AUTO_INCREMENT,
  `athl_fname` varchar(45) NOT NULL,
  `athl_lname` varchar(45) NOT NULL,
  `athl_gender` varchar(30) NOT NULL,
  `athl_dob` date NOT NULL,
  `athl_addr` varchar(120) DEFAULT NULL,
  `athl_height` float DEFAULT NULL,
  `athl_weight` float DEFAULT NULL,
  `athl_email` varchar(45) NOT NULL,
  `athl_phone` varchar(45) DEFAULT NULL,
  `account` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`athl_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `athletes`
--

LOCK TABLES `athletes` WRITE;
/*!40000 ALTER TABLE `athletes` DISABLE KEYS */;
INSERT INTO `athletes` VALUES (1,'Maks','Chumock','M','1999-12-13','street',180,80,'asdf@asdf.net','778-123-1234','',''),(2,'Owen','Gan','M','1990-01-23','streetNum',192,85,'fda@asdf.com','778--321-4321','','');
/*!40000 ALTER TABLE `athletes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `career`
--

DROP TABLE IF EXISTS `career`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `career` (
  `career_id` int(11) NOT NULL AUTO_INCREMENT,
  `position` varchar(45) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `isCurrent` tinyint(4) DEFAULT NULL,
  `fk_sports_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`career_id`),
  KEY `fk_sports_id_idx` (`fk_sports_id`),
  CONSTRAINT `fk_sports_id` FOREIGN KEY (`fk_sports_id`) REFERENCES `sports` (`sports_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `career`
--

LOCK TABLES `career` WRITE;
/*!40000 ALTER TABLE `career` DISABLE KEYS */;
/*!40000 ALTER TABLE `career` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club_mgr`
--

DROP TABLE IF EXISTS `club_mgr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `club_mgr` (
  `mgr_id` int(11) NOT NULL AUTO_INCREMENT,
  `mgr_fname` varchar(45) DEFAULT NULL,
  `mgr_lname` varchar(45) DEFAULT NULL,
  `mgr_email` varchar(45) DEFAULT NULL,
  `mgr_phone` varchar(45) DEFAULT NULL,
  `fk_clubs_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`mgr_id`),
  KEY `fk_clubs_id_idx` (`fk_clubs_id`),
  CONSTRAINT `fk_clubs_id` FOREIGN KEY (`fk_clubs_id`) REFERENCES `clubs` (`club_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club_mgr`
--

LOCK TABLES `club_mgr` WRITE;
/*!40000 ALTER TABLE `club_mgr` DISABLE KEYS */;
INSERT INTO `club_mgr` VALUES (1,'Jason','Huang','test@test.com','238-232-1232',1);
/*!40000 ALTER TABLE `club_mgr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clubs`
--

DROP TABLE IF EXISTS `clubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `clubs` (
  `club_id` int(11) NOT NULL,
  `club_name` varchar(45) DEFAULT NULL,
  `club_location` varchar(120) DEFAULT NULL,
  `club_size` varchar(45) DEFAULT NULL,
  `club_status` varchar(45) DEFAULT NULL,
  `club_url` varchar(45) DEFAULT NULL,
  `club_contact` varchar(45) DEFAULT NULL,
  `fk_sports_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`club_id`),
  KEY `fk_clubs_sports_id_idx` (`fk_sports_id`),
  CONSTRAINT `fk_clubs_sports_id` FOREIGN KEY (`fk_sports_id`) REFERENCES `sports` (`sports_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clubs`
--

LOCK TABLES `clubs` WRITE;
/*!40000 ALTER TABLE `clubs` DISABLE KEYS */;
INSERT INTO `clubs` VALUES (1,'QuintonFC','Vancouver','test','test','test','123-123-1234',1);
/*!40000 ALTER TABLE `clubs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offers`
--

DROP TABLE IF EXISTS `offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `offers` (
  `offer_id` int(11) NOT NULL AUTO_INCREMENT,
  `offer_position` varchar(45) DEFAULT NULL,
  `offer_amount` varchar(45) DEFAULT NULL,
  `offer_desc` varchar(400) DEFAULT NULL,
  `offer_photo` varchar(45) DEFAULT NULL,
  `offer_types` varchar(45) DEFAULT NULL,
  `offer_length` varchar(45) DEFAULT NULL,
  `fk_club_id` int(11) DEFAULT NULL,
  `offer_title` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`offer_id`),
  KEY `fk_clubs_id_idx` (`fk_club_id`),
  CONSTRAINT `fk_club_id` FOREIGN KEY (`fk_club_id`) REFERENCES `clubs` (`club_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers`
--

LOCK TABLES `offers` WRITE;
/*!40000 ALTER TABLE `offers` DISABLE KEYS */;
INSERT INTO `offers` VALUES (1,'GK','1000000','Goal Keeper for 6 years','test','test','6',1,'Goal Keeper Contract');
/*!40000 ALTER TABLE `offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `profiles` (
  `profile_id` int(11) NOT NULL,
  `position` varchar(45) DEFAULT NULL,
  `coaches` varchar(45) DEFAULT NULL,
  `profile_video` varchar(45) DEFAULT NULL,
  `profile_photo` varchar(45) DEFAULT NULL,
  `medical_info` varchar(200) DEFAULT NULL,
  `organization` varchar(45) DEFAULT NULL,
  `biography` varchar(400) DEFAULT NULL,
  `fk_sports_id` int(11) DEFAULT NULL,
  `fk_athl_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`profile_id`),
  KEY `fk_sports_id_profiles_idx` (`fk_sports_id`),
  KEY `fk_athletes_id_idx` (`fk_athl_id`),
  CONSTRAINT `fk_athletes_id` FOREIGN KEY (`fk_athl_id`) REFERENCES `athletes` (`athl_id`),
  CONSTRAINT `fk_sports_id_profiles` FOREIGN KEY (`fk_sports_id`) REFERENCES `sports` (`sports_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'GK','Samuel L. Jackson','test','test','weNeedTable','test','Hello World',1,1);
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sports`
--

DROP TABLE IF EXISTS `sports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sports` (
  `sports_id` int(11) NOT NULL AUTO_INCREMENT,
  `sports_name` varchar(45) DEFAULT NULL,
  `sports_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`sports_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sports`
--

LOCK TABLES `sports` WRITE;
/*!40000 ALTER TABLE `sports` DISABLE KEYS */;
INSERT INTO `sports` VALUES (1,'soccer','0');
/*!40000 ALTER TABLE `sports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'stg'
--

--
-- Dumping routines for database 'stg'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-02 15:07:10
