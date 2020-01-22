-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: tani_box
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
-- Table structure for table `buyer`
--

DROP TABLE IF EXISTS `buyer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buyer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `province` varchar(5) DEFAULT '',
  `province_name` varchar(45) DEFAULT '',
  `city` varchar(5) DEFAULT '',
  `city_name` varchar(45) DEFAULT '',
  `kecamatan` varchar(45) DEFAULT '',
  `address` varchar(50) DEFAULT '',
  `postal_code` varchar(6) DEFAULT '',
  `phone` varchar(15) DEFAULT '',
  `photo` varchar(50) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buyer`
--

LOCK TABLES `buyer` WRITE;
/*!40000 ALTER TABLE `buyer` DISABLE KEYS */;
INSERT INTO `buyer` VALUES (7,9,' 1','aaa',' 1','bbb',' Suko',' haha',' 11111',' 0812','buyer-1340c1f0-3376-11ea-a775-3d62da45ebba.jpg','2020-01-10 06:54:41',NULL),(8,13,'1','Bali','2','Buleleng','Tes','Tes','26000','085263154226','ChelseaIslan.jpg','2020-01-13 04:08:59',NULL),(10,32,'','','','','','','','',NULL,'2020-01-12 13:54:20',NULL),(12,34,'','','','','','','','',NULL,'2020-01-13 02:24:12',NULL),(13,35,'','','','','','','','',NULL,'2020-01-13 03:12:59',NULL),(14,37,'','','','','','','','',NULL,'2020-01-13 03:15:28',NULL),(15,38,'','','','','','','','',NULL,'2020-01-13 03:17:56',NULL),(16,39,'','','','','','','','',NULL,'2020-01-13 03:18:22',NULL),(17,40,'','','','','','','','',NULL,'2020-01-13 03:23:58',NULL),(18,41,'','','','','','','','',NULL,'2020-01-13 03:41:06',NULL),(19,42,'','','','','','','','',NULL,'2020-01-13 03:53:06',NULL),(20,43,'','','','','','','','',NULL,'2020-01-13 03:56:15',NULL),(21,45,'','','','','','','','',NULL,'2020-01-13 17:09:16',NULL),(22,47,'','','','','','','','',NULL,'2020-01-21 08:52:44',NULL),(23,49,'','','','','','','','',NULL,'2020-01-21 09:15:37',NULL);
/*!40000 ALTER TABLE `buyer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unit_price` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,14000,10,140000,28,21,'2020-01-12 07:36:17','2020-01-12 07:36:17'),(2,14000,15,210000,27,21,'2020-01-12 09:16:20','2020-01-12 09:16:20');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'sayur','2020-01-07 13:12:22','2020-01-07 13:12:22'),(2,'buah','2020-01-07 13:12:22','2020-01-07 13:12:22');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `receive_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `message` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_transaction` varchar(255) NOT NULL,
  `va_number` varchar(255) DEFAULT NULL,
  `bank` varchar(255) DEFAULT NULL,
  `transaction_time` varchar(255) DEFAULT NULL,
  `transaction_status` varchar(255) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `status_message` varchar(255) DEFAULT NULL,
  `status_code` varchar(255) DEFAULT NULL,
  `signature_key` text,
  `settlement_time` varchar(255) DEFAULT NULL,
  `payment_type` varchar(255) DEFAULT NULL,
  `merchant_id` varchar(255) DEFAULT NULL,
  `gross_amount` varchar(255) DEFAULT NULL,
  `fraud_status` varchar(255) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,'90009090',NULL,NULL,'2020-01-11 23:23:56','pending','7e128968-deee-4fdf-84c7-bc19d64c763e','midtrans payment notification','201','b4e05ff7bfaed0bdd3d385bb62ba0c1d82356627f5c1bbe928ca3c90a7c486ce36ed9bf44a959170981fa2035dff027fb2c458e387286ce43259e25b0a1e326f',NULL,'bank_transfer','G916525965','44000.00','accept','2020-01-11 16:25:33',NULL),(2,'90009090',NULL,NULL,'2020-01-11 23:23:56','settlement','7e128968-deee-4fdf-84c7-bc19d64c763e','midtrans payment notification','200','63fdb22d63cc2642e03cff4db8ab4c34f5976366626673e435efb3e307ed0227b5c0220f3fc2757905276bf82309bc638917ea2ab385139a64f7cd62ac4060a1','2020-01-11 23:24:18','bank_transfer','G916525965','44000.00','accept','2020-01-11 16:26:21',NULL),(3,'90009090',NULL,NULL,'2020-01-11 23:23:56','pending','7e128968-deee-4fdf-84c7-bc19d64c763e','midtrans payment notification','201','b4e05ff7bfaed0bdd3d385bb62ba0c1d82356627f5c1bbe928ca3c90a7c486ce36ed9bf44a959170981fa2035dff027fb2c458e387286ce43259e25b0a1e326f',NULL,'bank_transfer','G916525965','44000.00','accept','2020-01-11 16:27:54',NULL),(4,'90009090',NULL,NULL,'2020-01-11 23:23:56','settlement','7e128968-deee-4fdf-84c7-bc19d64c763e','midtrans payment notification','200','63fdb22d63cc2642e03cff4db8ab4c34f5976366626673e435efb3e307ed0227b5c0220f3fc2757905276bf82309bc638917ea2ab385139a64f7cd62ac4060a1','2020-01-11 23:24:18','bank_transfer','G916525965','44000.00','accept','2020-01-11 16:30:45',NULL),(5,'1','916525965238603','bca','2020-01-11 23:32:56','pending','6ab5a1f1-3224-4c75-b843-d08b23f0625f','midtrans payment notification','201','6d87500cbd8e638ca0250fe6ea64608af7ceda141fabfb5578dfd5610293f2d18ea007cd96247a7459f40324e57956cf489268ff5348c4a38f2fddeffe6b48da',NULL,'bank_transfer','G916525965','44000.00','accept','2020-01-11 16:32:57',NULL),(6,'1','916525965238603','bca','2020-01-11 23:32:56','settlement','6ab5a1f1-3224-4c75-b843-d08b23f0625f','midtrans payment notification','200','740767d5413942994a945c7133f3fbf5a2eca1545ce84060d9b0df7d85dcd9bfac6d8d59a978872ada316a5122892647245e894b77e0726f569858eba297bc88','2020-01-11 23:33:27','bank_transfer','G916525965','44000.00','accept','2020-01-11 16:33:28',NULL),(7,'2','916525965238138','bca','2020-01-11 23:36:09','pending','b5ac1ab8-5d4e-47fb-b806-bc8faf25a31e','midtrans payment notification','201','d05b35a038001f0d7a9d6439e9d53959f93218241ef0fcb407cb44c995a055dc9e28e48e7a42d237972576832247c0037cec2eb29cf0668bc2d4a6f439a5ff86',NULL,'bank_transfer','G916525965','44000.00','accept','2020-01-11 16:36:10',NULL),(8,'2','916525965238138','bca','2020-01-11 23:36:09','settlement','b5ac1ab8-5d4e-47fb-b806-bc8faf25a31e','midtrans payment notification','200','0f52b8f0e41e906ad7d11cded3534928aa8f987897a1b9ba08647ad8edd8ce4a0eaa00a75233d9b4ad9687f3688cb430a8dfde26d9ef69cc78aa1373baf078a5','2020-01-11 23:37:13','bank_transfer','G916525965','44000.00','accept','2020-01-11 16:37:13',NULL),(9,'32324324234234','916525965531907','bca','2020-01-11 23:27:52','pending','090056a2-eddd-46a3-856e-159c21fda818','midtrans payment notification','201','e2a18d2e85cdaff3325a7f6bcf2bdf6b52a5b4cc0cdc3020e874848e85a24690de01153fd6403654d16b3f357c8f6bd0777c71fd6ac4a9f1a6631924e2ad5b1e',NULL,'bank_transfer','G916525965','44000.00','accept','2020-01-11 16:47:51',NULL),(10,'3','916525965342189','bca','2020-01-11 23:54:05','pending','a9ed08db-9736-4cd2-92fb-0ac2b35a3d53','midtrans payment notification','201','5d00d7aa0a1bb75bbdff220d3b1be9b4804db1cffef75226c4a5420e01b4b9d38398c806bd553fd90acefff641d6b12b22f4ab2822d686d71dbae1e07a457918',NULL,'bank_transfer','G916525965','44000.00','accept','2020-01-11 16:54:07',NULL),(11,'3','916525965342189','bca','2020-01-11 23:54:05','settlement','a9ed08db-9736-4cd2-92fb-0ac2b35a3d53','midtrans payment notification','200','429c9ab5fbc62ffb4fc6d54515889caebc06e93aed667b9ee47de11a9aae696c32ce02f7c3d0325190a556df9b95b2bd18ffa03228a67e1b465749c6d6612f2f','2020-01-11 23:55:08','bank_transfer','G916525965','44000.00','accept','2020-01-11 16:55:09',NULL),(12,'32324324234234','916525965531907','bca','2020-01-11 23:27:52','settlement','090056a2-eddd-46a3-856e-159c21fda818','midtrans payment notification','200','2dbece95386a4dde15309d02eecd0dc9363d07c2d68bde7131ab79f587c6e2448d5cc7cb1b1a487d2a94b06369d0bd70b921110d46315d8b3efeabfb9f20bf4d','2020-01-11 23:28:55','bank_transfer','G916525965','44000.00','accept','2020-01-11 16:58:23',NULL);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo_product`
--

DROP TABLE IF EXISTS `photo_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photo_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `photo` varchar(255) NOT NULL,
  `product_id` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo_product`
--

LOCK TABLES `photo_product` WRITE;
/*!40000 ALTER TABLE `photo_product` DISABLE KEYS */;
INSERT INTO `photo_product` VALUES (12,'2.png',17,'2020-01-08 07:59:22','2020-01-08 07:59:22'),(13,'semang.jpg',18,'2020-01-09 10:00:12','2020-01-09 10:00:12'),(14,'semang.jpg',19,'2020-01-09 10:07:27','2020-01-09 10:07:27'),(15,'apelMalang.jpg',20,'2020-01-10 10:03:59','2020-01-10 10:03:59'),(16,'apelMalang.jpg',21,'2020-01-10 12:09:35','2020-01-10 12:09:35'),(17,'Durian-Montong-image-source.jpg',22,'2020-01-10 12:10:16','2020-01-10 12:10:16'),(18,'Durian-Montong-image-source.jpg',23,'2020-01-10 12:13:05','2020-01-10 12:13:05'),(19,'cranberry.jpg',24,'2020-01-10 12:16:18','2020-01-10 12:16:18'),(20,'nanas.jpg',25,'2020-01-10 12:23:56','2020-01-10 12:23:56'),(21,'tauge.jpg',26,'2020-01-11 16:09:19','2020-01-11 16:09:19'),(22,'jagung.jpg',27,'2020-01-11 16:10:59','2020-01-11 16:10:59'),(23,'bawang.jpg',28,'2020-01-11 16:11:56','2020-01-11 16:11:56'),(24,'buncis.jpg',29,'2020-01-11 16:12:39','2020-01-11 16:12:39');
/*!40000 ALTER TABLE `photo_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `unit` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `description` text,
  `category_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (18,'Semang',12,9999,800,'Semang',12,9,'2020-01-09 10:00:12','2020-01-09 10:00:12'),(19,'Semang',12,9999,800,'Semang',12,9,'2020-01-09 10:07:27','2020-01-09 10:07:27'),(20,' Apel Malang',1,60000,80,'Apel malang mengandung serat yang cukup tinggi di dalamnya. Kandungan serat bagus dalam melancarkan sistem pencernaan di dalam tubuh. Kandungan ini juga bagus dalam membantu tumbuhnya bakteri baik dalam usus.',2,16,'2020-01-10 10:03:59','2020-01-10 10:03:59'),(22,'Duren',1,150000,80,'Durian adalah nama tumbuhan tropis yang berasal dari wilayah Asia Tenggara, sekaligus nama buahnya yang bisa dimakan. Nama ini diambil dari ciri khas kulit buahnya yang keras dan berlekuk-lekuk tajam sehingga menyerupai duri.',2,13,'2020-01-10 12:10:16','2020-01-10 12:10:16'),(24,'cranberry',1,50000,60,'Buah cranberry sering digunakan untuk mencegah infeksi saluran kencing. Sari buah cranberry juga dapat mencegah infeksi saluran kemih, tapi kurang efektif untuk mengobatinya.',2,13,'2020-01-10 12:16:18','2020-01-10 12:16:18'),(25,'Nanas',1,50000,60,'Menurut Medical Center di Maryland Universiy, buah nanas juga memiliki enzim pencernaan baik, yang disebut bromelain. Enzim ini merupakan campuran dari enzim proteolitik yang membantu usus Anda memecah dan menyerap protein lebih banyak. Manfaat lain dari bromelain ini juga mampu meringankan masalah perut seperti, sakit perut dan diare.',2,16,'2020-01-10 12:23:56','2020-01-10 12:23:56'),(26,'Tauge',1,12000,10,'Tauge adalah sayur ',1,9,'2020-01-11 16:09:19','2020-01-11 16:09:19'),(27,'Jagung',1,14000,10,'Jagung adalah sayur ',1,9,'2020-01-11 16:10:59','2020-01-11 16:10:59'),(28,'Bawang',1,14000,10,'Bawang adalah sayur ',1,9,'2020-01-11 16:11:56','2020-01-11 16:11:56'),(29,'Buncis',1,14000,10,'Buncis adalah sayur ',1,9,'2020-01-11 16:12:39','2020-01-11 16:12:39');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller`
--

DROP TABLE IF EXISTS `seller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name_of_store` varchar(45) DEFAULT '',
  `address1` varchar(50) DEFAULT '',
  `province1` varchar(45) DEFAULT '',
  `province1_name` varchar(45) DEFAULT '',
  `city1` varchar(45) DEFAULT '',
  `city1_name` varchar(45) DEFAULT '',
  `kecamatan1` varchar(45) DEFAULT '',
  `postal_code1` varchar(6) DEFAULT '',
  `address2` varchar(50) DEFAULT '',
  `province2` varchar(45) DEFAULT '',
  `province2_name` varchar(45) DEFAULT '',
  `city2` varchar(45) DEFAULT '',
  `city2_name` varchar(45) DEFAULT '',
  `kecamatan2` varchar(45) DEFAULT '',
  `postal_code2` varchar(6) DEFAULT '',
  `phone` varchar(12) DEFAULT '',
  `photo_profile` varchar(50) DEFAULT '',
  `photo_store` varchar(50) DEFAULT '',
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller`
--

LOCK TABLES `seller` WRITE;
/*!40000 ALTER TABLE `seller` DISABLE KEYS */;
INSERT INTO `seller` VALUES (1,10,'Toko Sepatu','','','','','','','123456','','','','','','','123456','123456789101',NULL,NULL,'2020-01-11 07:23:45',NULL,NULL),(3,16,' halim store','dsa','1',' dari body',' 1',' dari body',' dari body','3232',' dari body','1',' dari body','1',' dari body',' cd','443','5443543','seller-dcaef2e0-3520-11ea-853a-43faed2291fa.jpg',NULL,'2020-01-12 09:49:44',NULL,NULL),(4,31,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-01-12 07:06:17',NULL,NULL),(5,999,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2020-01-12 07:46:30',NULL,NULL),(6,36,'','','','','','','','','','','','','','','','','seller-31715330-35b3-11ea-b6b0-c1131eae7d1f.jpg','store-0ee83ae0-35b3-11ea-b6b0-c1131eae7d1f.jpg','2020-01-13 03:17:13',NULL,NULL),(7,44,'','','','','','','','','','','','','','','','','','','2020-01-13 04:21:12',NULL,NULL),(8,46,'Fresh Store','Asia Tropis','9','Jawa Barat','54',NULL,'Babelan Kota','17837','Asia Tropis','9','Jawa Barat','54',NULL,'Babelan Kota','17837','081234567890','seller-344305d0-362c-11ea-96b0-a10f1b7a34ea.jpg','store-6d2f78b0-362c-11ea-96b0-a10f1b7a34ea.jpg','2020-01-13 18:25:34',NULL,NULL),(9,48,'','','','','','','','','','','','','','','','','','','2020-01-21 08:55:47',NULL,NULL);
/*!40000 ALTER TABLE `seller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seller_user_id` int(11) NOT NULL,
  `buyer_user_id` int(11) DEFAULT NULL,
  `invoice` varchar(200) NOT NULL,
  `shipment_amount` int(11) NOT NULL,
  `transaction_amount` int(11) NOT NULL,
  `total_amount` int(11) NOT NULL,
  `status` varchar(10) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_detail`
--

DROP TABLE IF EXISTS `transaction_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_transaction` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_detail`
--

LOCK TABLES `transaction_detail` WRITE;
/*!40000 ALTER TABLE `transaction_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_shipment`
--

DROP TABLE IF EXISTS `transaction_shipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_shipment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_transaction` int(11) DEFAULT NULL,
  `seller_address` varchar(45) DEFAULT NULL,
  `seller_kecamatan` varchar(45) DEFAULT NULL,
  `seller_postal_code` varchar(6) DEFAULT NULL,
  `seller_province` varchar(5) DEFAULT NULL,
  `seller_province_name` varchar(45) DEFAULT NULL,
  `seller_city` varchar(5) DEFAULT NULL,
  `seller_city_name` varchar(45) DEFAULT NULL,
  `buyer_address` varchar(45) DEFAULT NULL,
  `buyer_kecamatan` varchar(45) DEFAULT NULL,
  `buyer_postal_code` varchar(6) DEFAULT NULL,
  `buyer_province` varchar(5) DEFAULT NULL,
  `buyer_province_name` varchar(45) DEFAULT NULL,
  `buyer_city` varchar(5) DEFAULT NULL,
  `buyer_city_name` varchar(45) DEFAULT NULL,
  `courier` varchar(5) DEFAULT NULL,
  `courier_service` varchar(5) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `shipment_amount` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_shipment`
--

LOCK TABLES `transaction_shipment` WRITE;
/*!40000 ALTER TABLE `transaction_shipment` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction_shipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `OTP` int(11) DEFAULT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (9,'Reihan Agam','reihanagam7@gmail.com','$2a$10$dgSlmwjGIxmpgaG54SHFQeVgnTcSZwi8t1X190zlAvtjLkdm0Y4SS','seller',NULL,'2020-01-09 01:55:42','2020-01-09 01:55:42'),(10,NULL,'andreasluhut2911@gmail.com','$2a$10$dCaS10UQgyl5TWQbHVnfmOymhIZD2AQXXtr9mjdR5fwaahhwNaCTK',NULL,NULL,'2020-01-09 14:54:21','2020-01-09 14:54:21'),(11,NULL,'hasanudinhalim@gmail.com','$2a$10$aCuHecxMWNpsGq3jOXpdZusnGHgJ7fBcgZ4DGUqfUp9YWGcydJoiS','seller',NULL,'2020-01-10 06:33:19','2020-01-10 06:33:19'),(12,NULL,'shoifuddin.arkademy@gmail.com','$2a$10$LnISle2szaAlKsApaMR6v.5sJBnZj50P9qjRYMocmOmrdV2.KpIkG','buyer',2460,'2020-01-10 07:09:33','2020-01-10 07:09:33'),(13,'Muhad','bayu@gmail.com','$2a$10$HnBg1/kE.0GHbGlJ9Ax/wukisDC8ZZiy4ZpF10sn/wuG9niUkOVcS','buyer',NULL,'2020-01-10 09:18:03','2020-01-10 09:18:03'),(16,'halim','hallim@gmail.com','$2a$10$fwcl0TBSpZfo1bmEgRgoJ..drOZfAbev7FZQFKlujPeU2PTVEypBe','seller',NULL,'2020-01-10 10:28:20','2020-01-10 10:28:20'),(17,'Bambang','mbambang10@gmail.com','$2a$10$d6lk/3M57TD0fjyh.tPeTOQcjr0T5bwBc6eXNPeVshP1nStUsNujG','seller',NULL,'2020-01-10 14:52:49','2020-01-10 14:52:49'),(18,'aku','aku@gmail.com','$2a$10$0WWrPIq.P/yBBLstzuHZOuSOn8/yNvC/qV6Xjg8qR/nYkxwXyjCHa','buyer',NULL,'2020-01-11 05:16:49','2020-01-11 05:16:49'),(19,'Halim','halim@halim..com','$2a$10$vN3SRI0us/6fJP9fhzd/QuSQ6W1x24JzZvtBBik8An8zsiK47hRVa','buyer',NULL,'2020-01-11 06:47:47','2020-01-11 06:47:47'),(21,'Halim2','halim@mail.com','$2a$10$1rOwSSA44hMxCbfTGkffK.GxSImVayk44kO0LFZELn.r4yMb1vLQW','buyer',NULL,'2020-01-11 06:55:00','2020-01-11 06:55:00'),(22,'Seller','seller@mail.com','$2a$10$3AQPd1m/7z6LHgUW1/jAxOCSDD..MdfbP3YG0Io4ajLkz5U8oJX1y','seller',NULL,'2020-01-11 07:37:49','2020-01-11 07:37:49'),(24,'halim','halim1313@gmail.com','$2a$10$Fye9IdOiUw4zzmKUNGJa0uxyh0/7Df8W73yNle1sET1ukoRKlGcd.','seller',NULL,'2020-01-11 20:22:35','2020-01-11 20:22:35'),(25,'bayu','bayu@gmail.com','$2a$10$YGZjUzAnWsx0fwwVnlmGz.NWfoi3miL7.9IFQO/msWgIKHlMhE5xe','buyer',NULL,'2020-01-12 03:09:03','2020-01-12 03:09:03'),(31,'puguh','puguh@gmail.com','$2a$10$vdmIduSiKasM4Mpc9/O5culOQrrYPJKye3JINovE81HfpS/HmwR7u','seller',NULL,'2020-01-12 07:06:17','2020-01-12 07:06:17'),(32,'tes','tes@gmail.com','$2a$10$yWVY9gwfPsvZ.JlCXkAWLeB4LBu3uOhBvcB6ctI.avidlbP38/N/K','buyer',NULL,'2020-01-12 13:54:20','2020-01-12 13:54:20'),(34,'shoifuddin','iip@gmail.com','$2a$10$gaSBioPsRSYuoJuf9i6mDeC0RXQxRSl0gbhecSeG4WExvdIBGa5uu','buyer',4934,'2020-01-13 02:24:12','2020-01-13 02:24:12'),(35,'ihsan27','ihsan27@gmail.com','$2a$10$Jim3Jel2kB6NKD6OK21ItulQ0AdSBMCvaTs585xPEnK9ZqAaW3mmO','buyer',6723,'2020-01-13 03:12:59','2020-01-13 03:12:59'),(36,'hapidmochjamil','hapidmochj1201@gmail.com','$2a$10$6p1RtYbkr9ACJadTj3AIs.jqCulFOF1FYhgaQV147ze9ieF6Tqx5C','seller',NULL,'2020-01-13 03:13:42','2020-01-13 03:13:42'),(37,'wika','wika@gmail.com','$2a$10$McSawEyoccZBdQ3EzkkzyeonK9ECpyo64Q.RrigLpTgdqoGaTtVxS','buyer',NULL,'2020-01-13 03:15:28','2020-01-13 03:15:28'),(38,'ihs','pionpik@gmail.com','$2a$10$NOFWI0z7NNuouwGMSuuCkurxpR43ziuTwyvAhlHHr5ssJJf4eUvkC','buyer',NULL,'2020-01-13 03:17:56','2020-01-13 03:17:56'),(39,'Wikanyaa','vikavp0@gmail.com','$2a$10$SA3hRQJseEokRetG7nICh.2vb6yAJlFLcXal1pXO.iAk3wj2E4IzS','buyer',NULL,'2020-01-13 03:18:22','2020-01-13 03:18:22'),(40,'sein','seinlwincoc@gmail.com','$2a$10$N1rAgC5bTYyrG845bO0rh.N6OKGgYZL.ATd3BRXPk5rykt9q10h4m','buyer',NULL,'2020-01-13 03:23:58','2020-01-13 03:23:58'),(41,'Muhammad risano','muhammadrisano@gmail.com','$2a$10$BJ94e6jJok2CsnLYuEADSu8spxej8RqqcHI0FZz6IV8RGnwtuaJDu','buyer',NULL,'2020-01-13 03:41:06','2020-01-13 03:41:06'),(42,'ici','akun.pratamasumirat@gmail.com','$2a$10$hCNc6VC5avn1ca3KHpbjReHhxZZvx/rgrduato66ESnCq0N6G16Mi','buyer',NULL,'2020-01-13 03:53:06','2020-01-13 03:53:06'),(43,'bangudin','hapidmochj12@gmail.com','$2a$10$eyAHczViS05tIjacyGVH3u3axyjU2.FgmdS31JTOVsN5ypMW0XXvu','buyer',NULL,'2020-01-13 03:56:15','2020-01-13 03:56:15'),(44,'muhammadrisano2','muhammadrisano2@gmail.com','$2a$10$A1hl/0D6z8cGSRfEHZsRU.3XID0.UnRigN2AM0qqIlLjSZy9WJy1G','seller',NULL,'2020-01-13 04:21:12','2020-01-13 04:21:12'),(45,'bayu','bpy@gmail.com','$2a$10$1QNbJfRUkd.hwXwaLA/FsuCIsJrEPJ0U/N7nh9g8BzMLFhi1K2TM6','buyer',NULL,'2020-01-13 17:09:16','2020-01-13 17:09:16'),(46,'william','luhutmanulang26@gmail.com','$2a$10$vSOoCqpcSOmLFWwa5ryyNO5rtIclllMJklz9eZVmMAzIMb/tUDibq','seller',NULL,'2020-01-13 17:42:28','2020-01-13 17:42:28'),(47,'iip','shoifuddin@gmail.com','$2a$10$aTIXQaD2ZBwWTQsP0RI2Zu6CTQ93o90g8A3DopcqqhhXlnS83coFu','buyer',NULL,'2020-01-21 08:52:44','2020-01-21 08:52:44'),(48,'iip','iip1@gmail.com','$2a$10$KdKCKPAPBd0/2G0qWaUAduShWeJ9I/qpzt67KaJ0MI1skEySttaCC','seller',NULL,'2020-01-21 08:55:47','2020-01-21 08:55:47'),(49,'Halim','halim@halim.com','$2a$10$cCqsPhLlldzO3sKtKwS5y.vhXsUsHEjnoJNjetd2dSFUbVZ3VVuta','buyer',NULL,'2020-01-21 09:15:37','2020-01-21 09:15:37'),(50,NULL,NULL,'$2a$10$JUW2CbGdE77WyDva7K0/o.MPaMB6Z42p7egK7OHGLjR8iTddz2MuW','engineer',NULL,'2020-01-21 10:31:00','2020-01-21 10:31:00');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (10,26,19,'2020-01-12 08:27:47','2020-01-12 08:27:47'),(11,25,9,'2020-01-12 09:15:35','2020-01-12 09:15:35');
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'tani_box'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-22 17:41:37
