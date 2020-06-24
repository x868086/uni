CREATE DATABASE  IF NOT EXISTS `uni` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `uni`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 192.168.189.8    Database: uni
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `b2iserial`
--

DROP TABLE IF EXISTS `b2iserial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `b2iserial` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `serial_number` varchar(20) NOT NULL,
  `product_name` varchar(32) NOT NULL,
  `yf_code` varchar(64) DEFAULT NULL,
  `id_desc` varchar(128) DEFAULT NULL,
  `fee` tinyint(4) DEFAULT NULL,
  `dev_name` varchar(128) DEFAULT NULL,
  `dev_phone` varchar(20) DEFAULT NULL,
  `contact_phone` varchar(20) DEFAULT NULL,
  `operate_time` varchar(64) DEFAULT NULL,
  `operate` varchar(20) DEFAULT '已处理',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `serial_number` (`serial_number`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `b2iserial`
--

LOCK TABLES `b2iserial` WRITE;
/*!40000 ALTER TABLE `b2iserial` DISABLE KEYS */;
INSERT INTO `b2iserial` VALUES (1,'15607200000','腾讯大王卡','YF0307','西陵营服中心',15,'Jhon\'s Number','15600000010','15600000020','1592294355888','删除','2020-05-26 10:08:00','2020-06-16 17:27:35',NULL),(2,'15607200010','腾讯大王卡','YF0307','西陵营服中心',25,'Lily','15600000011','15600000012','1589185965494','待处理','2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(3,'15607200020','腾讯小王卡','YF0337','五峰城西营服中心',35,'Kitty','15600000021','15600000022','1589185965494','已处理','2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(4,'15607200040','QQ卡','YF0307','西陵营服中心',15,'Json','15600000041','15600000042','1589185965494','已删除','2020-05-26 10:08:00','2020-05-26 10:08:00',NULL);
/*!40000 ALTER TABLE `b2iserial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization`
--

DROP TABLE IF EXISTS `organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organization` (
  `org_id` int(11) NOT NULL AUTO_INCREMENT,
  `channel_id` varchar(64) DEFAULT NULL,
  `yf_code` varchar(64) DEFAULT NULL,
  `is_market_group` varchar(8) DEFAULT NULL,
  `parent_manager_id` int(11) NOT NULL,
  `org_desc` varchar(128) NOT NULL,
  `scope` tinyint(4) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `state_code` tinyint(4) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`org_id`),
  UNIQUE KEY `channel_id` (`channel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization`
--

LOCK TABLES `organization` WRITE;
/*!40000 ALTER TABLE `organization` DISABLE KEYS */;
INSERT INTO `organization` VALUES (1,NULL,NULL,NULL,0,'root',66,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(2,NULL,NULL,NULL,1,'宜昌',60,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(3,NULL,NULL,NULL,2,'公众',54,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(4,NULL,NULL,NULL,2,'政企',54,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(5,NULL,NULL,NULL,3,'营销部',48,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(6,NULL,NULL,NULL,3,'综合服务支撑中心',48,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(7,NULL,NULL,NULL,4,'政企客户事业部',48,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(8,NULL,'YF0307','M',5,'西陵营服中心',42,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(9,NULL,'YF0337','M',5,'五峰城西营服中心',42,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(10,NULL,'YF0590','S2',7,'城区校园营服中心',42,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(11,NULL,'YF0307','M',8,'西陵东山网格',36,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(12,NULL,'YF0337','M',9,'五峰城西一网格',36,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(13,NULL,'YF0590','S2',10,'三峡大学网格',36,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(14,'09C15','YF0307','M',11,'正兴合作厅',30,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(15,'YVBBJ','YF0307','M',11,'易杰数码宜昌市管理本部',30,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(16,'YFYUJ','YF0307','M',11,'宜昌市oppo渠道管理本部',30,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(17,'09CAA','YF0337','M',12,'五峰新时空手机世界五峰店',30,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(18,'Y1ZRI','YF0337','M',12,'五峰城关自有营业厅',30,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(19,'YAAJ0','YF0590','S2',13,'宜昌市城区三峡大学图书城自有营业厅（校园）',30,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(20,NULL,'YF0307','M',12,'直销员1',24,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(21,NULL,'YF0337','M',12,'直销员2',24,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL),(22,NULL,'YF0590','S2',12,'直销员3',24,1,1,'2020-05-26 10:08:00','2020-05-26 10:08:00',NULL);
/*!40000 ALTER TABLE `organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `role_id` tinyint(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,1,1,'2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(2,1,2,'2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(3,1,3,'2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(4,10,1,'2020-05-26 10:45:35','2020-05-26 10:45:35',NULL),(5,10,2,'2020-05-26 10:45:35','2020-05-26 10:45:35',NULL),(6,10,3,'2020-05-26 10:45:35','2020-05-26 10:45:35',NULL),(7,16,3,'2020-05-26 12:45:31','2020-05-26 12:45:31',NULL),(8,17,3,'2020-05-26 12:55:21','2020-05-26 12:55:21',NULL),(9,17,2,'2020-05-26 12:55:21','2020-05-26 12:55:21',NULL),(10,18,3,'2020-05-26 15:44:32','2020-05-26 15:44:32',NULL),(11,18,2,'2020-05-26 15:44:32','2020-05-26 15:44:32',NULL),(12,19,2,'2020-05-26 15:45:39','2020-05-26 15:45:39',NULL),(13,19,3,'2020-05-26 15:45:39','2020-05-26 15:45:39',NULL),(14,20,3,'2020-05-26 15:48:09','2020-05-26 15:48:09',NULL),(15,20,2,'2020-05-26 15:48:09','2020-05-26 15:48:09',NULL),(16,21,7,'2020-06-02 13:05:59','2020-06-02 13:05:59',NULL),(17,22,6,'2020-06-02 14:03:20','2020-06-02 14:03:20',NULL),(68,24,6,'2020-06-09 09:46:37','2020-06-09 09:46:37','2020-06-12 13:23:05');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `role` varchar(128) NOT NULL,
  `role_name` varchar(128) NOT NULL,
  `scope` tinyint(4) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role` (`role`),
  UNIQUE KEY `role_name` (`role_name`),
  UNIQUE KEY `scope` (`scope`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin','管理员',66,'2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(2,'President','总经理',60,'2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(3,'DepartmentChief','部门经理',54,'2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(4,'DepartmentSupervisor','业务主管',48,'2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(5,'MarketDirector','营服经理',42,'2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(6,'StoreSupervisor','渠道主管',36,'2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(7,'StoreManager','店长',30,'2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(8,'DirectSeller','直销员',24,'2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(26,'custom1','自定义1',3,'2020-06-12 09:22:25','2020-06-15 09:21:26',NULL);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roleroute`
--

DROP TABLE IF EXISTS `roleroute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roleroute` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `role_id` tinyint(4) NOT NULL,
  `route_id` smallint(6) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roleroute`
--

LOCK TABLES `roleroute` WRITE;
/*!40000 ALTER TABLE `roleroute` DISABLE KEYS */;
INSERT INTO `roleroute` VALUES (1,1,1,'2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(2,1,2,'2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(3,1,4,'2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(4,3,3,'2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(5,3,4,'2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(6,7,5,'2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(37,26,1,'2020-06-12 16:20:28','2020-06-12 16:20:28','2020-06-15 09:21:26'),(38,26,2,'2020-06-12 16:20:28','2020-06-12 16:20:28','2020-06-15 09:21:26'),(39,26,3,'2020-06-12 16:20:28','2020-06-12 16:20:28','2020-06-15 09:21:26'),(40,26,1,'2020-06-15 09:21:26','2020-06-15 09:21:26',NULL),(41,26,2,'2020-06-15 09:21:26','2020-06-15 09:21:26',NULL),(42,26,3,'2020-06-15 09:21:26','2020-06-15 09:21:26',NULL);
/*!40000 ALTER TABLE `roleroute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route` (
  `route_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `path` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`route_id`),
  UNIQUE KEY `path` (`path`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES (1,'/','首页','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(2,'/permission','权限管理','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(3,'/edit','信息发布','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(4,'/dashboard','面板','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(5,'/b2i2c','B2I2C运营','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL);
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms`
--

DROP TABLE IF EXISTS `sms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sms` (
  `sms_id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(128) NOT NULL,
  `sms_code` varchar(8) NOT NULL,
  `expires_time` varchar(32) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`sms_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms`
--

LOCK TABLES `sms` WRITE;
/*!40000 ALTER TABLE `sms` DISABLE KEYS */;
INSERT INTO `sms` VALUES (1,'15600000009','222222','1591778708054','2020-06-10 17:27:52','2020-06-10 17:27:52','2020-06-10 17:28:08'),(2,'15600000009','222222','1591778708054','2020-06-10 17:28:09','2020-06-10 17:28:09','2020-06-11 12:30:48'),(3,'15600000009','024696','1591850154001','2020-06-11 12:31:04','2020-06-11 12:31:04','2020-06-11 12:31:25'),(4,'15600000009','790895','1591850185033','2020-06-11 12:31:28','2020-06-11 12:31:28','2020-06-11 12:43:45'),(7,'15600000009','985052','1591850925133','2020-06-11 12:43:45','2020-06-11 12:43:45','2020-06-11 12:49:01'),(8,'15600000009','141009','1591851241839','2020-06-11 12:49:01','2020-06-11 12:49:01','2020-06-11 12:54:02'),(9,'15600000009','375047','1591851542592','2020-06-11 12:54:02','2020-06-11 12:54:02','2020-06-11 14:23:19'),(10,'15600000009','455825','1591856899243','2020-06-11 14:23:19','2020-06-11 14:23:19',NULL);
/*!40000 ALTER TABLE `sms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state` (
  `state_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `state_code` tinyint(4) DEFAULT NULL,
  `state_name` varchar(64) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`state_id`),
  UNIQUE KEY `state_code` (`state_code`),
  UNIQUE KEY `state_name` (`state_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,0,'停用','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(2,1,'启用','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(3,2,'注销','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL);
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `threshold`
--

DROP TABLE IF EXISTS `threshold`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `threshold` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `config_name` varchar(128) NOT NULL,
  `state_code` tinyint(4) NOT NULL DEFAULT '1',
  `start_date` varchar(64) DEFAULT NULL,
  `end_date` varchar(64) DEFAULT NULL,
  `operator` varchar(128) NOT NULL,
  `gt` int(11) NOT NULL,
  `lte` int(11) NOT NULL,
  `title` varchar(128) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `threshold`
--

LOCK TABLES `threshold` WRITE;
/*!40000 ALTER TABLE `threshold` DISABLE KEYS */;
INSERT INTO `threshold` VALUES (1,'花呗红包20%赠费',1,'1592378689693','1592378689693','林燕',20,35,'低消48元，赠送红包10元，赠送时长24月','2020-05-26 10:08:49','2020-06-18 14:01:36',NULL),(2,'花呗红包20%赠费',1,'1592378689693','1592378689693','林燕',35,40,'低消58元，赠送红包14元，赠送时长24月','2020-05-26 10:08:49','2020-06-18 14:01:36',NULL),(3,'花呗红包20%赠费',1,'1592378689693','1592378689693','林燕',40,45,'低消68元，赠送红包19元，赠送时长24月','2020-05-26 10:08:49','2020-06-18 14:01:36',NULL),(4,'花呗红包20%赠费',1,'1592378689693','1592378689693','林燕',45,50,'低消78元，赠送红包23元，赠送时长24月','2020-05-26 10:08:49','2020-06-18 14:01:36',NULL),(5,'花呗红包30%赠费',1,'1592378689693','1592378689693','林燕',50,60,'低消98元,赠送红包29元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(6,'花呗红包30%赠费',1,'1592378689693','1592378689693','林燕',60,79,'低消108元,赠送红包29元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(7,'花呗红包30%赠费',1,'1592378689693','1592378689693','林燕',79,89,'低消118元,赠送红包29元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(8,'花呗红包30%赠费',1,'1592378689693','1592378689693','林燕',89,99,'低消138元,赠送红包38元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(9,'花呗红包30%赠费',1,'1592378689693','1592378689693','林燕',99,109,'低消148元,赠送红包38元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(10,'花呗红包30%赠费',1,'1592378689693','1592378689693','林燕',109,119,'低消158元,赠送红包38元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(11,'花呗红包30%赠费',1,'1592378689693','1592378689693','林燕',119,120,'低消168元,赠送红包48元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(12,'花呗红包30%赠费',1,'1592378689693','1592378689693','林燕',120,130,'低消178元,赠送红包48元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(13,'花呗红包30%赠费',1,'1592378689693','1592378689693','林燕',130,140,'低消188元,赠送红包48元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(14,'花呗红包30%赠费',1,'1592378689693','1592378689693','林燕',140,160,'低消218元,赠送红包57元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(15,'花呗红包30%赠费',1,'1592378689693','1592378689693','林燕',160,180,'低消238元,赠送红包57元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(16,'花呗红包30%赠费',1,'1592378689693','1592378689693','林燕',180,181,'低消258元,赠送红包76元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(17,'花呗红包30%赠费',1,'1592378689693','1592378689693','林燕',181,196,'低消278元,赠送红包81元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(18,'花呗红包30%赠费',1,'1592378689693','1592378689693','林燕',196,212,'低消298元,赠送红包86元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(19,'花呗红包30%赠费',1,'1592378689693','1592378689693','林燕',212,247,'低消348元,赠送红包100元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(20,'花呗红包30%赠费',1,'1592378689693','1592378689693','林燕',247,278,'低消398元,赠送红包119元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(21,'花呗红包30%赠费',1,'1592378689693','1592378689693','林燕',278,100000,'低消超过278,不予推荐花呗分期活动','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(22,'花呗分期推荐40%赠费',1,'1592378689693','1592378689693','林燕',30,56,'oppo A8专属套餐98元,赠送42元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(23,'花呗分期推荐40%赠费',1,'1592378689693','1592378689693','林燕',56,67,'5G套餐129元,赠送62元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(24,'花呗分期推荐40%赠费',1,'1592378689693','1592378689693','林燕',67,83,'5G套餐159元,赠送76元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(25,'花呗分期推荐40%赠费',1,'1592378689693','1592378689693','林燕',83,104,'5G套餐199元,赠送95元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(26,'花呗分期推荐40%赠费',1,'1592378689693','1592378689693','林燕',104,156,'5G套餐299元,赠送143元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(27,'花呗分期推荐40%赠费',1,'1592378689693','1592378689693','林燕',156,208,'5G套餐399元,赠送191元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(28,'花呗分期推荐40%赠费',1,'1592378689693','1592378689693','林燕',208,313,'5G套餐599元,赠送286元,赠送时长24月','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(29,'花呗分期推荐40%赠费',1,'1592378689693','1592378689693','林燕',313,100000,'低消超过313,不予推荐赠费活动','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(30,'5G直降活动',1,'1592378689693','1592378689693','林燕',0,67,'推荐5G套餐129档级，终端直降1300元','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(31,'5G直降活动',1,'1592378689693','1592378689693','林燕',67,83,'推荐5G套餐159档级，终端直降1600元','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(32,'5G直降活动',1,'1592378689693','1592378689693','林燕',83,104,'推荐5G套餐199档级，终端直降2000元','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(33,'5G直降活动',1,'1592378689693','1592378689693','林燕',104,156,'推荐5G套餐299档级，终端直降3000元','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(34,'5G直降活动',1,'1592378689693','1592378689693','林燕',156,208,'推荐5G套餐399档级，终端直降4000元','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(35,'5G直降活动',1,'1592378689693','1592378689693','林燕',208,313,'推荐5G套餐599档级，终端直降6000元','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(36,'5G直降活动',1,'1592378689693','1592378689693','林燕',313,100000,'超过313,不予推荐5G直降低活动','2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(49,'测试规则2',1,'1592468946832','1592468946832','林燕test',1,2,'testtest1','2020-06-18 17:13:14','2020-06-18 17:13:14',NULL),(50,'测试规则2',1,'1592468946832','1592468946832','林燕test',2,3,'testtest2','2020-06-18 17:13:18','2020-06-18 17:13:18',NULL);
/*!40000 ALTER TABLE `threshold` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `org_id` int(11) NOT NULL,
  `account` varchar(128) NOT NULL,
  `secret` varchar(128) NOT NULL,
  `nick_name` varchar(128) DEFAULT NULL,
  `create_by` int(11) DEFAULT NULL,
  `state_code` tinyint(4) DEFAULT '1',
  `sms_code` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `secret` (`secret`),
  UNIQUE KEY `account` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'15600000001','$2a$10$8apomZ0/Q7uHd3pt6nIZHOh.BIqQ5r3LGItfkTNiptD9Ba4UK/7dm','json',1,1,NULL,'2020-05-26 10:08:49','2020-05-26 10:08:49',NULL),(10,2,'15600000002','$2a$10$53LosVhzn4SxhX09RHfMzO1vvjSRH9X37iT8ItB7r/2tU4yAWCu.G','json1',1,1,NULL,'2020-05-26 10:45:35','2020-06-09 10:28:14',NULL),(16,3,'15600000003','$2a$10$f2uEo850p/9/sBqYDq6fLe4noikJLNMwxcdPBCPnk/jbLyX19GeYW','json1',1,1,NULL,'2020-05-26 12:45:31','2020-05-26 15:03:34',NULL),(17,3,'15600000004','$2a$10$qYtBKeSFruk3n/2kOk4BluLVcNRZjAanhHk.ae/aI1FYazhukutym','json1',1,1,NULL,'2020-05-26 12:55:21','2020-05-26 12:55:21',NULL),(20,4,'15600000006','$2a$10$/ZeHwsDx4gol49YrnbXTZOcYcI1Fh3H1YEoA55UecBlRdO/2kLi/.','json1',1,1,NULL,'2020-05-26 15:48:09','2020-05-26 15:48:09',NULL),(21,16,'15600000007','$2a$10$krB.M4v6z51PdIudGECqX.2JloqoGit4vu/Sgzue.j4Pp76HxhAM.','oppo',1,1,NULL,'2020-06-02 13:05:58','2020-06-02 13:05:58',NULL),(22,12,'15600000008','$2a$10$nfbsrQE8Hy/l6okFiCw8xedifYeBoZLH265A2PqH0lRDFK3i732Vq','liu',1,1,NULL,'2020-06-02 14:03:20','2020-06-02 14:03:20',NULL),(24,12,'15600000009','$2a$10$MBe3JR.AbMrZwL.FSunEiuZiOlmgbulI3K.lvYhzfXRzpZrTN1qg2','you',1,1,NULL,'2020-06-08 11:27:31','2020-06-12 13:23:21',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-24 17:24:04
