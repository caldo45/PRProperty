-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: pr_properties
-- ------------------------------------------------------
-- Server version	5.7.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `client_types`
--

DROP TABLE IF EXISTS `client_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client_types` (
  `client_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`client_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_types`
--

LOCK TABLES `client_types` WRITE;
/*!40000 ALTER TABLE `client_types` DISABLE KEYS */;
INSERT INTO `client_types` VALUES (1,'Tenant'),(2,'Landlord');
/*!40000 ALTER TABLE `client_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients` (
  `client_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `image_path` varchar(200) DEFAULT NULL,
  `client_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`client_id`),
  KEY `client_type_ids_idx` (`client_type_id`),
  CONSTRAINT `client_type_ids` FOREIGN KEY (`client_type_id`) REFERENCES `client_types` (`client_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Larry','Logan','1990-01-01','077154125','lanrry@gmail.com','http:\\\\localhost:54183\\Uploads\\client\\1\\1.jpg',2),(2,'Leo','Lagan','1980-01-01','0772222','leo@gmail.com',NULL,2),(3,'Aoife','Morgan','2018-08-16','077652145','aoife@gmail.com','http:\\\\localhost:54183\\Uploads\\client\\3\\3.jpg',1),(4,'Chris','Montague','1950-01-01','077159753','chris@gmail.com','http:\\\\localhost:54183\\Uploads\\client\\4\\4.jpg',1),(31,'Jack','Duffin','1960-10-06','07751235132','jack@gmail.com',NULL,2),(34,'Charlie','McGrath',NULL,'7753366302','charlie.mcgrath45@gmail.com',NULL,2),(35,'Niamh','Deerly','1991-02-03','77154715','niamh@gmail.com','http:\\\\localhost:54183\\Uploads\\client\\35\\35.jpg',1),(36,'Dave','McGrath',NULL,'7753366302','charlie.mcgrath45@gmail.com',NULL,2),(37,'Robert','Glover','1920-01-10','07774515457879','bob@hotmail.com','http:\\\\localhost:54183\\Uploads\\client\\37\\37.jpg',1),(38,'Morgan','Trinity','1995-05-05','077655555','morgan@yahoo.com',NULL,2),(39,'Andrew','McDowell','1985-12-01','07753344695','andrew@qub.ac.uk',NULL,2),(40,'Morgan','Montague','2018-08-17','7753366302','morgan@gmail.com',NULL,2),(41,'John','McGrath','1983-12-01','4234234234','test@test.com',NULL,2);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_notification_type`
--

DROP TABLE IF EXISTS `contract_notification_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contract_notification_type` (
  `contract_notification_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `contract_notification_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`contract_notification_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_notification_type`
--

LOCK TABLES `contract_notification_type` WRITE;
/*!40000 ALTER TABLE `contract_notification_type` DISABLE KEYS */;
INSERT INTO `contract_notification_type` VALUES (1,'30 Days'),(2,'60 Days'),(3,'90 Days');
/*!40000 ALTER TABLE `contract_notification_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_notifications`
--

DROP TABLE IF EXISTS `contract_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contract_notifications` (
  `contract_notification_id` int(11) NOT NULL AUTO_INCREMENT,
  `contract_id` int(11) DEFAULT NULL,
  `marked_read` tinyint(4) DEFAULT NULL,
  `contract_notification_type_id` int(11) DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  `deleted` int(11) DEFAULT NULL,
  PRIMARY KEY (`contract_notification_id`),
  KEY `contract_notification_type_idx` (`contract_id`),
  KEY `contract_notification_type_idx1` (`contract_notification_type_id`),
  CONSTRAINT `contract_notification` FOREIGN KEY (`contract_id`) REFERENCES `contracts` (`contract_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `contract_notification_type` FOREIGN KEY (`contract_notification_type_id`) REFERENCES `contract_notification_type` (`contract_notification_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_notifications`
--

LOCK TABLES `contract_notifications` WRITE;
/*!40000 ALTER TABLE `contract_notifications` DISABLE KEYS */;
INSERT INTO `contract_notifications` VALUES (11,7,1,3,'2018-08-20 00:00:00',NULL),(12,2,1,2,'2018-08-20 00:00:00',NULL),(13,7,1,2,'2018-08-20 00:00:00',NULL),(14,2,1,1,'2018-08-20 00:00:00',NULL),(15,7,1,1,'2018-08-20 00:00:00',NULL),(16,2,1,3,'2018-08-20 00:00:00',NULL);
/*!40000 ALTER TABLE `contract_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contracts`
--

DROP TABLE IF EXISTS `contracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contracts` (
  `contract_id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) DEFAULT NULL,
  `tenant_id` int(11) DEFAULT NULL,
  `date_from` date DEFAULT NULL,
  `date_to` date DEFAULT NULL,
  `monthly_amount` int(11) DEFAULT NULL,
  `payment_date` int(11) DEFAULT NULL,
  `payment_type_id` int(11) DEFAULT NULL,
  `deposit_paid` tinyint(4) DEFAULT NULL,
  `contract_path` varchar(200) DEFAULT NULL,
  `payment_reference` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`contract_id`),
  KEY `contract_tenant_idx` (`tenant_id`),
  KEY `contract_room_idx` (`room_id`),
  KEY `contract_payment_idx` (`payment_type_id`),
  CONSTRAINT `contract_payment` FOREIGN KEY (`payment_type_id`) REFERENCES `payment_types` (`payment_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `contract_room` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `contract_tenant` FOREIGN KEY (`tenant_id`) REFERENCES `clients` (`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracts`
--

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;
INSERT INTO `contracts` VALUES (1,1,3,'2018-08-10','2019-01-01',400,2,1,1,NULL,'AAA1'),(2,2,4,'2017-01-01','2018-09-20',300,4,1,1,NULL,'AAA2'),(3,1,2,'2019-01-01','2020-01-01',0,5,1,1,NULL,'AAA3'),(4,4,2,'2018-01-01','2020-01-01',300,10,1,1,NULL,NULL),(7,10,4,'2018-08-10','2018-08-18',500,2,2,0,NULL,NULL);
/*!40000 ALTER TABLE `contracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lease_notification_types`
--

DROP TABLE IF EXISTS `lease_notification_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lease_notification_types` (
  `lease_notification_types_id` int(11) NOT NULL AUTO_INCREMENT,
  `lease_notification_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`lease_notification_types_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lease_notification_types`
--

LOCK TABLES `lease_notification_types` WRITE;
/*!40000 ALTER TABLE `lease_notification_types` DISABLE KEYS */;
INSERT INTO `lease_notification_types` VALUES (1,'3 Month Warning');
/*!40000 ALTER TABLE `lease_notification_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lease_notifications`
--

DROP TABLE IF EXISTS `lease_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lease_notifications` (
  `lease_notification_id` int(11) NOT NULL AUTO_INCREMENT,
  `lease_id` int(11) DEFAULT NULL,
  `marked_read` tinyint(4) DEFAULT NULL,
  `lease_notification_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`lease_notification_id`),
  KEY `lease_notificaitons_idx` (`lease_id`),
  KEY `lease_notification_type_idx` (`lease_notification_type_id`),
  CONSTRAINT `notificaiton_lease` FOREIGN KEY (`lease_id`) REFERENCES `leases` (`lease_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `notification_lease_type` FOREIGN KEY (`lease_notification_type_id`) REFERENCES `lease_notification_types` (`lease_notification_types_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lease_notifications`
--

LOCK TABLES `lease_notifications` WRITE;
/*!40000 ALTER TABLE `lease_notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `lease_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leases`
--

DROP TABLE IF EXISTS `leases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `leases` (
  `lease_id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) DEFAULT NULL,
  `date_from` date DEFAULT NULL,
  `date_to` date DEFAULT NULL,
  `amount` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`lease_id`),
  KEY `lease_property_idx` (`property_id`),
  CONSTRAINT `lease_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`property_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leases`
--

LOCK TABLES `leases` WRITE;
/*!40000 ALTER TABLE `leases` DISABLE KEYS */;
INSERT INTO `leases` VALUES (1,1,'2015-01-01','2020-01-01','200'),(7,1,'2021-01-05','2021-07-08','0');
/*!40000 ALTER TABLE `leases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `next_of_kin`
--

DROP TABLE IF EXISTS `next_of_kin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `next_of_kin` (
  `next_of_kin_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `relationship` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`next_of_kin_id`),
  KEY `next_of_kin_client_idx` (`client_id`),
  CONSTRAINT `next_of_kin_client` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `next_of_kin`
--

LOCK TABLES `next_of_kin` WRITE;
/*!40000 ALTER TABLE `next_of_kin` DISABLE KEYS */;
INSERT INTO `next_of_kin` VALUES (1,1,'Charlie','McGarth','0888888','Charlie@gmail.com','Father');
/*!40000 ALTER TABLE `next_of_kin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_types`
--

DROP TABLE IF EXISTS `payment_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_types` (
  `payment_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`payment_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_types`
--

LOCK TABLES `payment_types` WRITE;
/*!40000 ALTER TABLE `payment_types` DISABLE KEYS */;
INSERT INTO `payment_types` VALUES (1,'Bank Transfer'),(2,'Cash');
/*!40000 ALTER TABLE `payment_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `contract_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `date_recieved` date DEFAULT NULL,
  `payment_reference` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `payment_contract_idx` (`contract_id`),
  CONSTRAINT `payment_contract` FOREIGN KEY (`contract_id`) REFERENCES `contracts` (`contract_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (2,1,300,'2016-01-02','AAA1'),(3,1,300,'2016-01-02','AAA1'),(4,1,300,'2016-01-02','AAA1'),(5,1,300,'2016-01-02','AAA1'),(6,2,300,'2016-01-03','AAA2'),(7,3,300,'2016-01-03','AAA3');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `properties` (
  `property_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_line_address` varchar(45) DEFAULT NULL,
  `second_line_address` varchar(45) DEFAULT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  `landlord_id` int(11) DEFAULT NULL,
  `longitude` decimal(10,8) DEFAULT NULL,
  `latitude` decimal(11,8) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`property_id`),
  KEY `landlord_properties_idx` (`landlord_id`),
  CONSTRAINT `landlord_properties` FOREIGN KEY (`landlord_id`) REFERENCES `clients` (`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (1,'29 Rossmore','South Belfast','BT7 3HB',1,-5.93721692,54.60114281,'Rossmore','Belfast','N. Ireland'),(2,'14 Deramore Avenue','Ormeau Road','BT7 4HB',1,-5.91710600,54.57370300,'Deramore','Belfast','N. Ireland'),(3,'14 Sunnyside','Sunnyside','BT4 2DC',1,-5.91710600,54.57370300,'Sunnyside','Belfast','N. Ireland'),(4,'Computer Science Building','Malone Road','BT8 6HN',2,-5.91710600,54.57370300,'Queens','Belfast','N. Ireland'),(5,'29 Rossmore Avenue','Ormeau Road','BT7 3HB',2,-5.91710600,54.57370300,NULL,'Belfast','N. Ireland'),(6,'14 Rushfield Street','Ormeau Road','BT7 3HB',36,-5.91710600,54.57370300,NULL,'Belfast','N. IrelandN. Ireland'),(7,'27 Bloomfield Road','East Belfast','BT4 5TG',31,-5.91710600,54.57370300,NULL,'Belfast','N. Ireland'),(8,'25 West Street','East Belfast','bt3 8jh',38,-5.91710600,54.57370300,NULL,'Belfast','N. Ireland'),(9,'15 Rushfield Avenue','South Belfast','bt5 8gh',39,-5.91710600,54.57370300,NULL,'Belfast','N. Ireland'),(10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Belfast','N. Ireland'),(11,'45 Green Street','Belfast','bt65 5g',2,-5.94307539,54.60110651,NULL,'Belfast','N. Ireland'),(12,'14 Bloomfield Cresent','East Belfast','bt4 3dd',40,-5.85944317,54.59278348,NULL,NULL,NULL),(13,'29 Rossmore Avenue','East','BT7 3HB',31,-5.93890783,54.59475513,NULL,NULL,NULL);
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_images`
--

DROP TABLE IF EXISTS `property_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `property_images` (
  `property_images_id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) DEFAULT NULL,
  `image_path` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`property_images_id`),
  KEY `property_image_idx` (`property_id`),
  CONSTRAINT `property_image` FOREIGN KEY (`property_id`) REFERENCES `properties` (`property_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_images`
--

LOCK TABLES `property_images` WRITE;
/*!40000 ALTER TABLE `property_images` DISABLE KEYS */;
INSERT INTO `property_images` VALUES (3,1,'http:\\\\localhost:54183\\Uploads\\property\\1\\109.07.46.142951.jpg'),(4,1,'http:\\\\localhost:54183\\Uploads\\property\\1\\109.07.48.847642.jpg'),(5,1,'http:\\\\localhost:54183\\Uploads\\property\\1\\109.07.53.881015.jpg'),(6,2,'http:\\\\localhost:54183\\Uploads\\property\\2\\209.09.38.789795.jpg'),(7,2,'http:\\\\localhost:54183\\Uploads\\property\\2\\209.09.42.090312.jpg'),(8,3,'http:\\\\localhost:54183\\Uploads\\property\\3\\310.11.46.910213.jpg'),(9,1,'Uploads\\property\\1\\106.26.15.107310.jpg');
/*!40000 ALTER TABLE `property_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_images`
--

DROP TABLE IF EXISTS `room_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room_images` (
  `room_images_id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) DEFAULT NULL,
  `image_path` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`room_images_id`),
  KEY `image_room_idx` (`room_id`),
  CONSTRAINT `image_room` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_images`
--

LOCK TABLES `room_images` WRITE;
/*!40000 ALTER TABLE `room_images` DISABLE KEYS */;
INSERT INTO `room_images` VALUES (5,1,'http:\\\\localhost:54183\\Uploads\\room\\1\\102.39.14.042908.jpg'),(6,1,'http:\\\\localhost:54183\\Uploads\\room\\1\\102.39.58.160782.jpg'),(7,1,'http:\\\\localhost:54183\\Uploads\\room\\1\\102.52.32.171142.jpg'),(8,1,'http:\\\\localhost:54183\\Uploads\\room\\1\\102.53.51.609870.jpg'),(9,1,'http:\\\\localhost:54183\\Uploads\\room\\1\\102.56.07.896981.jpg'),(10,1,'http:\\\\localhost:54183\\Uploads\\room\\1\\102.58.00.338496.jpg'),(11,1,'http:\\\\localhost:54183\\Uploads\\room\\1\\102.59.48.743241.jpg'),(12,1,'http:\\\\localhost:54183\\Uploads\\room\\1\\103.00.14.435777.jpg'),(13,1,'http:\\\\localhost:54183\\Uploads\\room\\1\\103.00.18.841543.jpg'),(14,1,'http:\\\\localhost:54183\\Uploads\\room\\1\\103.01.33.689105.jpg'),(15,1,'http:\\\\localhost:54183\\Uploads\\room\\1\\103.01.39.572291.jpg'),(16,1,'http:\\\\localhost:54183\\Uploads\\room\\1\\108.03.07.497127.jpg'),(17,1,'http:\\\\localhost:54183\\Uploads\\room\\1\\108.05.32.237127.jpg'),(18,1,'http:\\\\localhost:54183\\Uploads\\room\\1\\108.06.03.223802.jpg');
/*!40000 ALTER TABLE `room_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rooms` (
  `room_id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,2,'Room 1'),(2,1,'Room 1'),(3,1,'Room 2'),(4,2,'Room 2'),(5,1,'Room 3'),(6,2,'Room 3'),(7,1,'Room 4'),(8,2,'Room 5'),(9,2,'Room 6'),(10,3,'Room 1'),(11,1,'Room 5'),(12,7,'Downstairs Bedroom 1'),(13,9,'Room 1');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-02 10:44:54
