-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: team-2-db.cpgkkkosuur7.us-east-2.rds.amazonaws.com    Database: test-db-3
-- ------------------------------------------------------
-- Server version	8.0.35

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `Bookings`
--

DROP TABLE IF EXISTS `Bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Bookings` (
  `bookingID` int NOT NULL AUTO_INCREMENT,
  `tourID` int DEFAULT NULL,
  `providedFullName` varchar(255) NOT NULL,
  `providedEmail` varchar(150) NOT NULL,
  `providedPhone` varchar(20) NOT NULL,
  `guests` int DEFAULT NULL,
  `totalPrice` decimal(10,2) DEFAULT NULL,
  `userID` int DEFAULT NULL,
  `withdraw` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`bookingID`),
  KEY `tourID` (`tourID`),
  KEY `userID` (`userID`),
  CONSTRAINT `Bookings_ibfk_1` FOREIGN KEY (`tourID`) REFERENCES `Tours` (`tourID`) ON UPDATE CASCADE,
  CONSTRAINT `Bookings_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `Users` (`userID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bookings`
--

LOCK TABLES `Bookings` WRITE;
/*!40000 ALTER TABLE `Bookings` DISABLE KEYS */;
INSERT INTO `Bookings` VALUES (1,5,'fhf','dfbghydf@hfbgibdfi.com','456345345345',5,825.00,1,NULL,'2024-02-01 00:15:13','2024-02-01 00:15:13'),(2,2,'trfdjtygiftgyi','dshfbshdh@jsdbgfidhrb.com','44856478646',1,40.00,1,NULL,'2024-02-01 00:17:11','2024-02-01 00:17:11'),(3,2,'Peter Parker','parker@email.com','5148952321',5,100.00,1,NULL,'2024-02-01 13:27:49','2024-02-01 13:27:49'),(4,2,'gfhdft','isdbgfidr@sdngjndriuj.com','486784578578\\57',1,40.00,1,0,'2024-02-01 13:37:46','2024-02-01 13:37:46'),(5,3,'fgndf','bfidsfbgh@fnguoehdiuog.com','5145416546545456',3,730.00,1,0,'2024-02-01 13:52:23','2024-02-01 13:52:23'),(6,5,'jgdjgy','sgdrg@ergbidr.com','87427427\\452\\74',4,665.00,1,0,'2024-02-01 13:55:45','2024-02-01 13:55:45'),(7,2,'Batman','batman@email.com','126456789',2,55.00,1,NULL,'2024-02-01 17:41:34','2024-02-01 17:41:34'),(8,1,'Green Green','green@green.com','123456789',5,854.95,8,NULL,'2024-02-01 18:09:41','2024-02-01 18:09:41'),(9,4,'hjt','esgsr@trhtry.com','547845374563834674',5,305.00,8,NULL,'2024-02-01 18:16:34','2024-02-01 18:16:34'),(10,4,'bvnhvmvhm','hdhdt@dshgiufgds.com','453245354354',5,305.00,1,NULL,'2024-02-01 18:18:20','2024-02-01 18:18:20'),(11,4,'gfhfdgh','vbcb@thrt.com','75452784527845254',5,305.00,1,NULL,'2024-02-01 18:27:46','2024-02-01 18:27:46'),(12,3,'thrrh','hdbvsdh@uishdg.com','378437843785378',4,965.00,8,NULL,'2024-02-01 18:32:26','2024-02-01 18:32:26'),(13,4,'wwtwge','nfgnf@udsgfys.com','877678678',1,81.00,8,NULL,'2024-02-01 18:48:14','2024-02-01 18:48:14'),(14,4,'jgjg','gfeg@dfie.com','42868585857',2,137.00,1,NULL,'2024-02-01 18:50:38','2024-02-01 18:50:38'),(15,4,'ghfg','sgyyu@suegfiu.com','1472582353564',2,137.00,1,NULL,'2024-02-01 18:59:13','2024-02-01 18:59:13'),(16,5,'ghdfhf','dfbd@fjbvf.com','75427527',2,345.00,1,NULL,'2024-02-01 19:12:36','2024-02-01 19:12:36'),(17,8,'njghcvm','gfbvg@trh.com','4254345',2,325.00,1,NULL,'2024-02-01 19:26:34','2024-02-01 19:26:34'),(18,8,'gfhdfhfh','eufgeu@ueghfu.com','24234753278',1,175.00,1,NULL,'2024-02-01 19:34:39','2024-02-01 19:34:39'),(19,8,'hjg','bcue@uefbhue.com','24524525',1,175.00,1,NULL,'2024-02-01 19:37:45','2024-02-01 19:37:45'),(20,4,'batman','batman@email.com','123456789',4,249.00,1,NULL,'2024-02-01 20:55:44','2024-02-01 20:55:44'),(21,2,'gndfyhjyf','dfghdfgn@eger.com','787868',5,100.00,1,NULL,'2024-02-01 20:59:24','2024-02-01 20:59:24'),(22,4,'dfgtrhrte','gdgr@usdufw.com','742785',4,249.00,1,NULL,'2024-02-01 21:00:47','2024-02-01 21:00:47'),(23,4,'ghjguj','fdbfg@rthtr.com','725427856786578',1,81.00,1,NULL,'2024-02-01 21:03:52','2024-02-01 21:03:52'),(24,4,'jhghfn','gfnbf@yrhtry.com','752453468535',1,81.00,1,NULL,'2024-02-01 21:07:55','2024-02-01 21:07:55'),(25,4,'hmhm','ifdsgvi@ygsuef.com','54354325',1,81.00,1,NULL,'2024-02-01 21:27:49','2024-02-01 21:27:49'),(26,1,'uyjfghj','fdgd@ydgyf.com','7785',2,356.98,1,NULL,'2024-02-01 21:45:58','2024-02-01 21:45:58'),(27,5,'gfhdh','dfyyd@uidshfu.com','542452547345',1,185.00,1,NULL,'2024-02-01 22:07:31','2024-02-01 22:07:31'),(28,5,'gfhdth','dsfgdfs@udhgf.com','454535454',1,185.00,1,NULL,'2024-02-01 22:15:26','2024-02-01 22:15:26'),(29,5,'ghffdhfd','dshfb@asjbf.com','7858758785',1,185.00,1,NULL,'2024-02-01 22:18:19','2024-02-01 22:18:19'),(30,5,'ydjftyjtyj','ufhufh@hfb.com','5435456476845',3,505.00,1,NULL,'2024-02-01 22:48:16','2024-02-01 22:48:16'),(31,4,'gfhfgh','dsfdvsyu@ywegfiwe.com','54684887',4,249.00,1,NULL,'2024-02-01 22:49:55','2024-02-01 22:49:55'),(32,5,'ghfdhdf','fdbgdfbg@ydsifgs.com','542455424',4,665.00,1,NULL,'2024-02-01 23:26:07','2024-02-01 23:26:07'),(33,2,'fgdhdfh','fgdf@rdget.com','532453',1,40.00,1,NULL,'2024-02-01 23:29:36','2024-02-01 23:29:36'),(34,4,'fysg sgudgfis','gbbgf@ydsuhf.com','165418945616',1,81.00,1,NULL,'2024-02-01 23:43:41','2024-02-01 23:43:41'),(35,1,'fgdh','hgngf@yhj.com','754353453',2,356.98,1,NULL,'2024-02-01 23:56:08','2024-02-01 23:56:08'),(36,4,'Full Name','sgfhb@yusegfu.com','64153215165',1,81.00,1,0,'2024-02-02 00:21:26','2024-02-02 00:21:26'),(37,5,'ghjmgh ukyuk','fdgdf@uhisuhf.com','165165165',1,185.00,1,0,'2024-02-02 00:38:17','2024-02-02 00:38:17'),(38,5,'gfhfg','hfg@dsigbf.com','57457\\',1,185.00,1,0,'2024-02-02 01:24:57','2024-02-02 01:24:57'),(39,1,'Robin Hood','robin@hood.com','456123789',3,522.97,8,0,'2024-02-02 13:35:01','2024-02-02 13:35:01'),(40,2,'rdfgd','fgdsf@yesbfbeis.com','4534535',3,70.00,8,0,'2024-02-02 14:43:38','2024-02-02 14:43:38'),(41,5,'ydgjfgy','drsghds@iugbhuer.com','5436453',1,185.00,8,0,'2024-02-02 15:22:23','2024-02-02 15:22:23'),(42,8,'fdghdgf','dsfbrduh@yudgye.com','727857',2,325.00,8,0,'2024-02-02 15:23:24','2024-02-02 15:23:24'),(43,5,'rtutyu','gfbfd@gsyugs.com','7452',1,185.00,8,0,'2024-02-02 15:26:06','2024-02-02 15:26:06'),(44,4,'dfbrsdhgi sudhxgidrj','dbgfc@ysdgfius.com','45645464654564',2,137.00,8,0,'2024-02-02 15:28:11','2024-02-02 15:28:11'),(45,4,'chmgfh','gfnfh@hjdbvgfhrd.com','54737453543',1,81.00,1,0,'2024-02-02 16:46:37','2024-02-02 16:46:37'),(46,4,'djgfgj','jhvmvhj@ydgsufygr.com','4532453',1,81.00,1,0,'2024-02-02 16:48:30','2024-02-02 16:48:30'),(47,4,'njdgh thrttrh','fgdfs@gsdif.com','635246324',1,81.00,1,0,'2024-02-02 16:51:23','2024-02-02 16:51:23'),(48,9,'hmfhytj','gbgf@ydsugf.com','53574354346',1,97.00,1,0,'2024-02-02 16:53:34','2024-02-02 16:53:34'),(49,9,'fdbudfhib rdfugitsd','fsgdfj@udsigi.com','4564561654654465',1,97.00,1,0,'2024-02-02 16:57:04','2024-02-02 16:57:04'),(50,9,'jkiu uity','fdhdg@uygdfb.com','64545646546541',1,97.00,1,0,'2024-02-02 17:10:56','2024-02-02 17:10:56'),(51,5,'tfdhdyt ','fcbdg@udsyfgyus.com','7524775',1,185.00,1,0,'2024-02-02 18:13:16','2024-02-02 18:13:16'),(52,5,'dfbgihs urs geviusd','sgvriubvhf@iufsi.com','6546534135453',1,185.00,1,0,'2024-02-02 18:14:59','2024-02-02 18:14:59'),(53,4,'Robert P','dfkjbgdjfk@iusgids.com','456432154684',2,137.00,12,0,'2024-02-02 18:57:20','2024-02-02 18:57:20'),(54,2,'trytr b5wyytr','dtfhgf@yugewfuy.com','5433875345',1,40.00,8,0,'2024-02-03 14:26:49','2024-02-03 14:26:49'),(55,9,'gdry grsygfdr','fdgdf@iudhsgui.com','415715478',3,241.00,8,0,'2024-02-03 14:29:07','2024-02-03 14:29:07'),(56,10,'aaaa','test@test.com','123-123-1234',3,985.00,16,0,'2024-02-03 15:22:24','2024-02-03 15:22:24'),(57,10,'Superman','superman@dc.com','85644468944',5,1625.00,8,0,'2024-02-03 15:26:40','2024-02-03 15:26:40'),(58,8,'ghkjgufh','ghcngch@ydsufgvs.com','87524327',1,1525.00,8,0,'2024-02-03 15:29:45','2024-02-03 15:29:45'),(59,5,'trdhtrdu','fbdf@yudgsfvs.com','75434553',2,345.00,8,0,'2024-02-03 15:30:27','2024-02-03 15:30:27'),(60,2,'Wonder Woman','fhd@yusf.com','542754347537',1,40.00,8,0,'2024-02-03 15:36:23','2024-02-03 15:36:23'),(61,5,'Ben','drgdsr@uyesfvg.com','5432784',2,345.00,8,0,'2024-02-03 15:41:00','2024-02-03 15:41:00'),(62,8,'hg,hjg','ghjgh@tydsyfvs.com','5436563',1,1525.00,8,0,'2024-02-03 15:42:26','2024-02-03 15:42:26'),(63,8,'ghju','ghfg@yusdgfs.com','574354',1,1525.00,8,0,'2024-02-03 16:15:04','2024-02-03 16:15:04'),(64,5,'Jungle','sgfergi@ygsiug.com','576378637896368',1,185.00,8,0,'2024-02-03 16:15:41','2024-02-03 16:15:41'),(65,8,'uhkugh','gfhngfjn@yugdsfg.com','452354',2,3025.00,8,0,'2024-02-03 16:17:27','2024-02-03 16:17:27'),(66,1,'test','fyuf@udsuf.com','786786587678',1,190.99,8,0,'2024-02-03 16:25:54','2024-02-03 16:25:54'),(67,8,'cmon work','vhnghn@hsf.com','54724524',2,3025.00,8,0,'2024-02-03 16:30:29','2024-02-03 16:30:29'),(68,5,'work','gcnhgf@yugsf.com','785785\\7',1,185.00,8,0,'2024-02-03 16:32:00','2024-02-03 16:32:00'),(69,9,'delete','dfgkjdfkj@yusdvhf.com','7267226585',1,97.00,8,0,'2024-02-03 16:32:53','2024-02-03 16:32:53'),(73,5,'Mark','mark@gmail.com','123-123-1234',2,345.00,17,0,'2024-02-04 03:48:02','2024-02-04 03:48:02'),(74,2,'Admin','Admin@email.com','123-123-1234',4,85.00,2,0,'2024-02-04 03:58:40','2024-02-04 03:58:40'),(75,10,'Hello work','dfhvbdh@husbfhdb.com','1561984845',1,345.00,8,0,'2024-02-04 04:25:26','2024-02-04 04:25:26'),(77,9,'I think it works','dfbbbd@tysfvud.com','6514515',1,97.00,8,0,'2024-02-04 04:28:15','2024-02-04 04:28:15'),(82,1,'test 6','byub@crtyu.com','6541651',1,190.99,8,0,'2024-02-04 04:40:19','2024-02-04 04:40:19'),(83,9,'test 8','dfnvdn @ugbeufbhe.com','56416515',1,97.00,8,0,'2024-02-04 04:48:24','2024-02-04 04:48:24'),(84,9,'test 9','dfubdhiuf@gmail.com','46511557446',1,97.00,8,0,'2024-02-04 04:49:18','2024-02-04 04:49:18'),(85,8,'test 11','tgjfriun@gbdfubd.com','41651511',1,1525.00,8,0,'2024-02-04 04:50:40','2024-02-04 04:50:40'),(89,9,'dfjbndfjln@svhbfs.com','fbm;lvdsf;@shbk.com','54654654',1,97.00,8,0,'2024-02-04 13:15:25','2024-02-04 13:15:25'),(90,10,'gvncg','hfyj@yugdsfgs.com','546153156',1,345.00,8,0,'2024-02-04 13:21:31','2024-02-04 13:21:31'),(93,5,'aaaaa','test@test.com','123-123-1234',4,665.00,16,0,'2024-02-05 03:21:19','2024-02-05 03:21:19'),(94,9,'sssss','sss@sss.com','123-456-5554',4,313.00,16,0,'2024-02-05 13:50:02','2024-02-05 13:50:02'),(95,8,'ffffffff','sss@sss.com','1111111111111',5,12525.00,2,0,'2024-02-05 14:00:39','2024-02-05 14:00:39'),(96,8,'hcgmgf dfsgtd','ghfdhf@uybdsi.com','16511651515',1,2525.00,8,0,'2024-02-05 14:17:47','2024-02-05 14:17:47'),(97,5,'ydgjt','ghmh@yugsuyf.com','547327',1,185.00,8,0,'2024-02-05 14:21:32','2024-02-05 14:21:32'),(98,10,'sssss','sss@sss.com','123-456-9870',4,1305.00,16,0,'2024-02-05 14:55:39','2024-02-05 14:55:39');
/*!40000 ALTER TABLE `Bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ContactUs`
--

DROP TABLE IF EXISTS `ContactUs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ContactUs` (
  `contactusID` int NOT NULL AUTO_INCREMENT,
  `message` varchar(800) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userID` int DEFAULT NULL,
  PRIMARY KEY (`contactusID`),
  KEY `userID` (`userID`),
  CONSTRAINT `ContactUs_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `Users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContactUs`
--

LOCK TABLES `ContactUs` WRITE;
/*!40000 ALTER TABLE `ContactUs` DISABLE KEYS */;
INSERT INTO `ContactUs` VALUES (1,'This is a test','test@test.com','Test','2024-02-02 16:20:38','2024-02-02 16:20:38',NULL),(2,'This is a test','test@test.com','Test','2024-02-02 16:20:58','2024-02-02 16:20:58',NULL),(3,'aaaaaaaa','test@test.com','Test','2024-02-02 16:22:04','2024-02-02 16:22:04',NULL),(4,'aaaaaaaa','test@test.com','Test1','2024-02-02 16:24:07','2024-02-02 16:24:07',NULL),(5,'I am batman~~~','batman@email.com','batman','2024-02-03 03:22:42','2024-02-03 03:22:42',NULL);
/*!40000 ALTER TABLE `ContactUs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payment` (
  `payID` int NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,2) NOT NULL,
  `bookingID` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`payID`),
  KEY `bookingID` (`bookingID`),
  CONSTRAINT `Payment_ibfk_1` FOREIGN KEY (`bookingID`) REFERENCES `Bookings` (`bookingID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment`
--

LOCK TABLES `Payment` WRITE;
/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reviews`
--

DROP TABLE IF EXISTS `Reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reviews` (
  `reviewID` int NOT NULL AUTO_INCREMENT,
  `message` varchar(800) NOT NULL,
  `rating` int DEFAULT NULL,
  `userID` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tourID` int DEFAULT NULL,
  PRIMARY KEY (`reviewID`),
  KEY `userID` (`userID`),
  KEY `tourID` (`tourID`),
  CONSTRAINT `Reviews_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `Users` (`userID`) ON UPDATE CASCADE,
  CONSTRAINT `Reviews_ibfk_2` FOREIGN KEY (`tourID`) REFERENCES `Tours` (`tourID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reviews`
--

LOCK TABLES `Reviews` WRITE;
/*!40000 ALTER TABLE `Reviews` DISABLE KEYS */;
INSERT INTO `Reviews` VALUES (1,'Very comfortable travel. Could make beautiful memories with friends!',4,4,'2024-02-02 04:29:10','2024-02-02 04:29:10',9),(2,'Fantastic Experience~~   A lot of activities to enjoy. I love it!!!',5,9,'2024-02-02 06:58:11','2024-02-02 06:58:11',9),(3,'very calm. I had a good time which I dreamed for a long time.',3,9,'2024-02-02 07:05:28','2024-02-02 07:05:28',8),(4,'calm, very relaxed ...  I had a well being time :)',3,9,'2024-02-02 07:13:52','2024-02-02 07:13:52',5),(5,'made a good memory with my family . It was fantastic summer',4,4,'2024-02-02 07:21:07','2024-02-02 07:21:07',8),(6,'I love mountain. very nice experience',4,9,'2024-02-02 07:40:31','2024-02-02 07:40:31',1),(7,'Amazing travel. well guided. love it',5,4,'2024-02-02 07:42:58','2024-02-02 07:42:58',4),(8,'so so....',2,9,'2024-02-02 07:47:13','2024-02-02 07:47:13',4),(9,'Love beautiful Sunrise!!!',4,4,'2024-02-02 07:52:41','2024-02-02 07:52:41',2),(10,'Loved the amazing landscape..',3,9,'2024-02-02 08:01:42','2024-02-02 08:01:42',2),(11,'liked the leisure activities. fantastic beach. Love it!!!',4,10,'2024-02-02 08:12:50','2024-02-02 08:12:50',9),(12,'Love it!',3,10,'2024-02-02 08:16:41','2024-02-02 08:16:41',5),(13,'Nice trip',3,10,'2024-02-02 08:23:42','2024-02-02 08:23:42',4),(14,'Good travel.. Like it',3,10,'2024-02-02 08:27:13','2024-02-02 08:27:13',2),(15,'Good Trip',3,10,'2024-02-02 08:30:52','2024-02-02 08:30:52',1),(16,'Nice Travel..good memory',3,10,'2024-02-02 08:37:39','2024-02-02 08:37:39',8),(17,'Another Good memory',5,10,'2024-02-02 08:43:21','2024-02-02 08:43:21',4),(18,'Wonderful landscape. Refreshable trip.',4,4,'2024-02-02 14:23:46','2024-02-02 14:23:46',1),(19,'fascinating tour.. lots of fun',3,4,'2024-02-02 15:37:15','2024-02-02 15:37:15',4),(20,'beautiful nature..  It was restful time~~',3,10,'2024-02-03 00:37:29','2024-02-03 00:37:29',3),(21,'very nice.. Lovely Ocean!! Like it~~',4,13,'2024-02-03 01:03:55','2024-02-03 01:03:55',9),(22,'Lovely beach.. exciting leisure activities.. ',4,13,'2024-02-03 01:31:30','2024-02-03 01:31:30',10),(23,'Nice experience!  Beautiful Nature... Like it!!',4,13,'2024-02-03 02:55:08','2024-02-03 02:55:08',5),(24,'Fantastic ~~ Met a lot of good people during travel.',5,13,'2024-02-03 03:03:25','2024-02-03 03:03:25',1),(25,'Not bad.. a little bit boring',2,13,'2024-02-03 03:14:53','2024-02-03 03:14:53',3),(26,'Exiting Adventure~~',1,13,'2024-02-03 03:19:17','2024-02-03 03:19:17',2),(27,'Food Provided was amazing!!',5,8,'2024-02-03 13:46:07','2024-02-03 13:46:07',8),(28,'I loved every moment during this travel. Fantastic...',5,4,'2024-02-03 15:57:46','2024-02-03 15:57:46',10),(29,'dgadhsa',2,18,'2024-02-05 03:13:17','2024-02-05 03:13:17',10),(30,'asdsadsadasdasdds',5,16,'2024-02-05 03:20:54','2024-02-05 03:20:54',5),(31,'wow like it',4,16,'2024-02-05 13:49:29','2024-02-05 13:49:29',9),(32,'Great travel',5,16,'2024-02-05 14:55:15','2024-02-05 14:55:15',10);
/*!40000 ALTER TABLE `Reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tours`
--

DROP TABLE IF EXISTS `Tours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tours` (
  `tourID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `availability` int NOT NULL,
  `region` varchar(40) NOT NULL,
  `country` varchar(40) NOT NULL,
  `city` varchar(40) NOT NULL,
  `address` varchar(100) NOT NULL,
  `tourDate` date NOT NULL,
  `description` varchar(500) NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`tourID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tours`
--

LOCK TABLES `Tours` WRITE;
/*!40000 ALTER TABLE `Tours` DISABLE KEYS */;
INSERT INTO `Tours` VALUES (1,'Snowy Mountains',165.99,12,'Asia','Thailand','Sapa','123 Mountain Road','2024-02-09','Beautiful hike!','7eecef58a46548f38aadd1b4a548f06ce1f4f9da91acb8161e5dbf2826cba045','2024-01-30 18:48:14','2024-01-30 18:48:14'),(2,'Beautiful Sunrise',15.00,30,'Asia','Thailand','Hoy An','123 Lanterns','2024-02-03','Beautiful Sunrise !','6fe37572f6554e68a0a9b67d2bfa718b547224721a12e01bd44051e69cefe966','2024-01-30 19:09:43','2024-01-30 19:09:43'),(3,'Ha Long Bay',235.00,23,'Asia','Vietnam','Ha Long Bay','123 Ha Long Bay','2024-02-24','Beautiful Ha Long Bay!','3e39ddc5fa8bf5419cd335427c9a5f000bc6ce8bebb307c8600aaa7758fa12dc','2024-01-30 19:31:18','2024-01-30 19:31:18'),(4,'Venice Gondola',556.00,4,'Europe','Italy','Venice','123 Gondola','2024-02-16','Beautiful Gondola Ride!','f908c97542ce46e72db13074d8734f48d283bc4a78fa222a668a10c64ac35e6a','2024-01-31 13:51:59','2024-02-03 06:42:12'),(5,'Jungle excursion',160.00,12,'Asia','Laos','City','123 Tree House','2024-02-17','Beautiful Tree House!','24dc18fa6a01cbd8b449cef951c1397fb088f21bb93aae525c88ca384b6126d0','2024-01-31 14:10:11','2024-01-31 14:10:11'),(8,'xyzxyzsdssssss',1500.00,10,'abc','abc','dddddddddd11','qbc','2024-02-08','qbc','33f7f8b76210a424b31d6fcac119ad8b32f6f2ec83bd9b86802fba3368704d7b','2024-02-01 17:08:18','2024-02-05 14:57:20'),(9,'test',72.00,572,'asia','sdgd','city','123 street','2024-02-29','dhgdtrhtyh','57d1fe3ef4451c5b5f6500e18044ef2c5f3ad833c97a1daf514d06a2b02a43cf','2024-02-01 20:12:23','2024-02-01 20:12:23'),(10,'Varadero Beach',320.00,14,'South America','Cuba','Varadero','123 street','2024-02-05','Beautiful Varadero Beach!','71a1554c4ea71f1273ce18219e125859944d574d64e629af9950227455132008','2024-02-02 19:00:56','2024-02-03 13:40:07');
/*!40000 ALTER TABLE `Tours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(150) NOT NULL,
  `password` varchar(64) NOT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(40) DEFAULT NULL,
  `DOB` datetime DEFAULT NULL,
  `address` varchar(40) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `province` varchar(30) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `roles` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'mike@gmail.com','$2b$10$m6KSU8BABjmX.Yo7jhtop.jF2KlKKcwtqVM13auzoPcoWeyJ09NAm','Michael','Pinsonneault','2006-03-09 00:00:00','123 Street','Montréal','QC','H9H1H2','514-887-1187',NULL,'2024-01-30 18:41:37','2024-01-31 14:25:01'),(2,'admin@email.com','$2b$10$vJY9X75yXzu5O6y9c0F8hOnahINoaCNYRU2eD1EBhgIh8DDnt.2Ju','John','Smith','2000-01-13 00:00:00','8877 street','Montreal','QC','A2C3B3','123-456-9870',1,'2024-01-30 22:37:50','2024-01-30 22:49:03'),(3,'admin@travelease.com','$2b$10$PoHDBuHenxpui9/uqrr1oOVSLME2ZbvsCvmWGmo4IaCisN/OnkTtm',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2024-01-31 01:46:49','2024-01-31 01:46:49'),(4,'test123@test.com','$2b$10$ofMesZxhxjIjufRRp23ViupkmiCHKr.gBEQ/M4mqd4aUd/h.nQVdi','John','Smith1','2010-01-01 00:00:00','8877 street','Montreal','QC','A2C3B3','222-222-5555',0,'2024-01-31 18:57:49','2024-02-05 14:53:13'),(5,'blah@blah.com','$2b$10$M8MPQpLQYGW3Z9C582OwAucxiBttsXv8LZWfYA6HymkP5Mnr21QKO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2024-01-31 21:05:00','2024-01-31 21:05:00'),(6,'admin23@gmail.com','$2b$10$geaEeDXmfkxHOILCz4Dq2.2oBFdcG0wVYIxFKiwRr5iehwpIlnOIK',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2024-02-01 14:00:45','2024-02-01 14:00:45'),(7,'billy@gmail.com','$2b$10$8MnMEvpxKTrin4s1r5z2KeBeRQVbpeoxIh8y240LSDsnCTUnmQ/3a',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2024-02-01 18:06:17','2024-02-01 18:06:17'),(8,'green@green.com','$2b$10$/fSnsyu3QVvYboiFVzxTHe61uSvqMHUQFG4sORyA.Us/WurAGKkvK',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2024-02-01 18:07:13','2024-02-01 18:07:13'),(9,'test234@email.com','$2b$10$UO2iNBtPSmrBjU/ZQz/pUeDcjw7IkM0j6790007Q9j1Yw5SZoXTeG','Jane','Aere','2008-02-02 00:00:00','3333 street','Montreal','QC','A2B1D5','555-666-4444',0,'2024-02-02 06:55:08','2024-02-02 06:56:35'),(10,'test345@email.com','$2b$10$WIAPGiW77Q9LmXB2CGWE/Out4N4vz14Twe4p92ZYMlEtYpwGzYZd.','Jackson','MC','2010-03-03 00:00:00','3334 street','Montreal','QC','A2B1D1','555-666-4477',0,'2024-02-02 08:11:47','2024-02-02 08:16:19'),(11,'pan@email.com','$2b$10$VfdYf6S16xR1Jes/LejY7.n2GWrzTTvZHMzwwx9K0EBcI73.0YSCG',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2024-02-02 16:42:11','2024-02-02 16:42:11'),(12,'connie@email.com','$2b$10$a42wJ1uhJn1F5FkPNXjM8OdYesp1ixsT3U2qr2tQgVj.AqJZm/1PK','Connie','DR','2023-05-10 00:00:00','123 street','Montreal','QC','H2h1h3','456-789-4756',0,'2024-02-02 18:51:53','2024-02-02 18:55:16'),(13,'test456@email.com','$2b$10$omAa467FvQALl9v55IlaY.f1bLulqm1DdkoqyXZBFyXXaokRBb16q','Madonna','Butcher','2006-06-06 00:00:00','3256 street','Montreal','QC','A2F3Z3','123-897-7777',0,'2024-02-03 00:53:10','2024-02-03 00:55:03'),(14,'test@email.com','$2b$10$cpXKnHV0dOtSalx3XSe25uvEI1GKkLVW6MG8xPBAoO7KVD.XSABCS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2024-02-03 06:38:09','2024-02-03 06:38:09'),(16,'test@test.com','$2b$10$gFq6bdRj3LKByB9MUDi3eO28iPfXdqyC1mUTvI6c4efpgdrI.hBIS','aaaaa','aaabb','2024-01-16 00:00:00','aaaaa','aaaaa','aaaa','a1a1a1','123-123-1234',0,'2024-02-03 15:19:50','2024-02-05 13:48:14'),(17,'mark@gmail.com','$2b$10$heJFfRviPBmwaki/2.7iO.MIbK9xvEAmbi6FaFKF6ROzqOFGn1XJG','Mark','Sumoba','1990-07-21 00:00:00','123 4th avenue ','Montreal','Qc','a1a1a1','123-123-1234',0,'2024-02-04 03:41:30','2024-02-04 03:44:00'),(18,'testuser@test.com','$2b$10$KHm65PBxQQmvDSyW6vNGP.egi09Bj8JbENCDNKzWvyQ3pmvH7KJni','john','Smith','2017-01-31 00:00:00','8877 street','Montreal','QC','A2B1D5','123-456-9870',0,'2024-02-05 03:08:29','2024-02-05 03:10:06'),(19,'user@user.com','$2b$10$41NZ.EytGKqk4UgrFXZXgeqsMEILHwGvnBipPZaEtD3ewihVmS3cG',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2024-02-05 13:47:41','2024-02-05 13:47:41'),(20,'user1@user.com','$2b$10$Pn.j2xY8kwwGu2ITmZute.rgiNdQBN/8TGR/NUAtuXKoMotFo7QhC',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2024-02-05 14:52:28','2024-02-05 14:52:28');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-05 10:53:18
