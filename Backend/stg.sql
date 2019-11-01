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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--


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
-- Table structure for table `athl_like`
--

DROP TABLE IF EXISTS `athl_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `athl_like` (
  `athl_like_id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_athl_id` int(11) NOT NULL,
  `fk_offer_id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `isLiked` tinyint(4) NOT NULL,
  PRIMARY KEY (`athl_like_id`),
  KEY `fk_athl_id_idx` (`fk_athl_id`),
  KEY `fk_athl_like_offer_id_idx` (`fk_offer_id`),
  CONSTRAINT `fk_athl_like_athl_id` FOREIGN KEY (`fk_athl_id`) REFERENCES `athletes` (`athl_id`),
  CONSTRAINT `fk_athl_like_offer_id` FOREIGN KEY (`fk_offer_id`) REFERENCES `offers` (`offer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `athl_like`
--

LOCK TABLES `athl_like` WRITE;
/*!40000 ALTER TABLE `athl_like` DISABLE KEYS */;
INSERT INTO `athl_like` VALUES (1,1,1,'2019-10-18 10:00:00',1),(2,1,2,'2019-10-18 07:00:00',1),(3,3,1,'2019-10-18 07:00:00',0),(4,3,2,'2019-10-18 07:00:00',1),(5,4,15,'2019-10-18 07:00:00',1),(6,4,16,'2019-10-18 07:00:00',0),(7,5,6,'2019-10-18 07:00:00',1),(8,5,7,'2019-10-18 07:00:00',0),(9,6,10,'2019-10-18 07:00:00',0),(10,6,20,'2019-10-18 07:00:00',1);
/*!40000 ALTER TABLE `athl_like` ENABLE KEYS */;
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
  `city` varchar(120) DEFAULT NULL,
  `country` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`athl_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `athletes`
--

LOCK TABLES `athletes` WRITE;
/*!40000 ALTER TABLE `athletes` DISABLE KEYS */;
INSERT INTO `athletes` VALUES (1,'Sibella','Vasquez','Female','2014-03-26','1784 Ridge Oak Point',178,245,'svasquez0@unblog.fr','884-279-1746','svasquez0','fGFAdWKK','Newmarket','Canada\r'),(2,'Agnella','Mayzes','Female','1989-06-08','09848 East Center',188,340,'amayzes1@va.gov','647-376-6074','amayzes1','WwD4SIfw','Gialo','Libya\r'),(3,'Farah','Mallan','Female','2018-02-11','9 Boyd Avenue',154,151,'fmallan2@netscape.com','497-114-5336','fmallan2','YceECQH','Fermont','Canada\r'),(4,'Griffin','Fishpool','Male','2017-02-13','4 Graceland Road',250,284,'gfishpool3@xrea.com','342-902-1159','gfishpool3','o75Pl0Lm0','Pont-Audemer','France\r'),(5,'Janessa','Beckenham','Female','1982-02-24','1 Waywood Terrace',197,303,'jbeckenham4@apple.com','450-745-1278','jbeckenham4','1HZT5e','Teykovo','Russia\r'),(6,'Thaine','Ewbanks','Male','2007-02-15','709 Morrow Avenue',150,222,'tewbanks5@homestead.com','767-277-8502','tewbanks5','lljYjwsIA','Eshan','China\r'),(7,'Stoddard','MacWhan','Female','2015-03-24','7712 Glendale Drive',222,333,'smacwhan6@usatoday.com','877-269-5076','smacwhan6','j93TonmB9LK','Chabany','Ukraine\r'),(8,'Graehme','Crumby','Male','2009-06-08','124 Sullivan Drive',176,125,'gcrumby7@prlog.org','719-499-7775','gcrumby7','4alcZZ5It','Wakimachi','Japan\r'),(9,'Lyndel','Sexten','Female','1982-08-11','45346 Karstens Avenue',250,172,'lsexten8@about.com','678-638-7227','lsexten8','uKq8wW4H2','Comrat','Moldova\r'),(10,'Andrej','Franzonetti','Male','2008-11-20','76687 Bluejay Lane',226,148,'afranzonetti9@feedburner.com','216-865-8414','afranzonetti9','WedaVQW9s','Sandviken','Sweden\r'),(11,'Aluin','Pendle','Male','2009-03-22','7 Kipling Alley',235,251,'apendlea@wp.com','192-931-0101','apendlea','ZJrItBfgG','Triesenberg','Liechtenstein\r'),(12,'Garner','Pudner','Male','1984-10-09','28860 Pennsylvania Park',174,241,'gpudnerb@tinyurl.com','156-692-2555','gpudnerb','syPLfU','Aravissós','Greece\r'),(13,'Chaddy','Yeudall','Male','2015-02-05','060 Forest Dale Pass',179,208,'cyeudallc@stanford.edu','573-652-8231','cyeudallc','VvTsAyELIm','Kalunan','Indonesia\r'),(14,'Wylie','Haxell','Male','2013-07-21','7 Coleman Alley',164,134,'whaxelld@technorati.com','478-902-8236','whaxelld','5kwmsEFBey8V','Lazdijai','Lithuania\r'),(15,'Lyndel','Gilchriest','Female','2017-10-19','656 Melvin Park',191,285,'lgilchrieste@123-reg.co.uk','702-829-1615','lgilchrieste','CfaVAV','Ar Rujum','Yemen\r'),(16,'Lorene','Motten','Female','2013-11-21','18308 Helena Drive',178,349,'lmottenf@sakura.ne.jp','765-795-5870','lmottenf','h67nlaaX','Santa Maria','Philippines\r'),(17,'Worthington','Ghidelli','Male','2018-11-14','334 Porter Court',194,182,'wghidellig@skype.com','955-187-2732','wghidellig','vvtiXf7phh','Kalmar','Sweden\r'),(18,'Byron','Woodhead','Male','2016-05-08','24 Little Fleur Hill',249,116,'bwoodheadh@vkontakte.ru','501-813-1559','bwoodheadh','EgdLS7AwE','Kushnarënkovo','Russia\r'),(19,'Gratiana','Pozzi','Female','1981-05-15','3993 Summer Ridge Alley',235,316,'gpozzii@desdev.cn','808-269-8979','gpozzii','CRtnZa9ixW','Zelenodolsk','Russia\r'),(20,'Hubert','Grimoldby','Male','1990-10-26','3968 Harper Crossing',160,349,'hgrimoldbyj@mtv.com','672-604-7684','hgrimoldbyj','rc88PkyuYVJs','Francisco Villa','Mexico\r'),(21,'Lin','Wynett','Female','1991-03-29','73661 Comanche Terrace',173,259,'lwynettk@bravesites.com','497-172-4129','lwynettk','iEHx2w','Benoy','Chad\r'),(22,'Misha','Grewer','Female','1989-10-10','289 Hallows Pass',153,267,'mgrewerl@omniture.com','763-788-5680','mgrewerl','wBqCV1fqjo','Nangka','Indonesia\r'),(23,'Suzi','Kelsow','Female','2009-04-02','82344 Spohn Way',150,257,'skelsowm@zimbio.com','853-278-7864','skelsowm','Nx8HN3BJUZ','Hanyū','Japan\r'),(24,'Jo','Ahlin','Male','2004-06-21','872 Sunnyside Road',166,181,'jahlinn@jiathis.com','938-316-9871','jahlinn','vEzx07GhtQs','Orocué','Colombia\r'),(25,'Johna','Knath','Female','1992-10-26','07 Roxbury Hill',186,315,'jknatho@feedburner.com','523-131-7925','jknatho','C34skOQD','Skrwilno','Poland\r'),(26,'Rene','Clooney','Female','2016-11-19','4 Jay Hill',195,106,'rclooneyp@cnet.com','342-865-9160','rclooneyp','Hb8ZZSW','Ponta Grossa','Brazil\r'),(27,'Talbert','Hopkyns','Male','2001-01-02','9 Eggendart Lane',193,180,'thopkynsq@mit.edu','912-276-3840','thopkynsq','95yXronMiXDb','Ellinikó','Greece\r'),(28,'Humfrid','MacPeice','Male','1997-03-23','3612 Pearson Street',152,135,'hmacpeicer@eventbrite.com','876-476-6697','hmacpeicer','YlTi70ZT1K','Huangtian','China\r'),(29,'Townie','Campling','Male','1983-02-26','0788 Morningstar Parkway',220,256,'tcamplings@netvibes.com','560-744-9955','tcamplings','TzqCJLc','Sol’tsy','Russia\r'),(30,'Laureen','Justis','Female','2016-12-23','222 Del Sol Street',185,167,'ljustist@businessweek.com','260-326-0779','ljustist','vgA942oCHzfq','Jinqiao','China\r'),(31,'Jamesy','Coltan','Male','1981-12-07','9410 Evergreen Way',192,180,'jcoltanu@sourceforge.net','808-272-0766','jcoltanu','AloatG6','Nowogard','Poland\r'),(32,'Kimmie','Langton','Female','2001-03-12','503 Acker Court',241,197,'klangtonv@apache.org','423-900-2106','klangtonv','9jUuMQbdO','Calachuchi','Philippines\r'),(33,'Esther','Cockell','Female','1990-12-02','66733 Caliangt Crossing',168,219,'ecockellw@goo.ne.jp','141-363-3120','ecockellw','6bIDGn41BmK','Liuche','China\r'),(34,'Justine','McKeveney','Female','1991-07-06','39223 Shopko Parkway',196,186,'jmckeveneyx@blogs.com','587-476-1626','jmckeveneyx','viDHsqq','Qiziltepa Shahri','Uzbekistan\r'),(35,'Thia','Sedman','Female','2006-02-09','551 Mayfield Park',165,181,'tsedmany@imgur.com','756-910-2647','tsedmany','qzC28IxVGO7','Guaporé','Brazil\r'),(36,'Dominica','Meryett','Female','1989-12-23','3311 Mendota Hill',178,345,'dmeryettz@ustream.tv','280-169-6075','dmeryettz','eIRmSZvf','Japeri','Brazil\r'),(37,'Meaghan','Rowlatt','Female','2019-08-04','58 Carberry Lane',218,249,'mrowlatt10@nasa.gov','790-259-6094','mrowlatt10','UcgzvWkZh','Baranusa','Indonesia\r'),(38,'Angelo','Cosson','Male','1999-06-17','33356 Trailsway Park',245,253,'acosson11@mysql.com','310-935-4764','acosson11','yTBtyEXCgTX','Liufu','China\r'),(39,'Min','Ebbage','Female','1999-04-21','0 Schurz Center',240,211,'mebbage12@shareasale.com','372-860-4355','mebbage12','imvsSj','Mislak','Indonesia\r'),(40,'Daloris','MacArthur','Female','1986-02-07','5 Arkansas Plaza',158,347,'dmacarthur13@microsoft.com','856-155-4527','dmacarthur13','BV3getqV','David','Panama\r'),(41,'Celestyn','McAulay','Female','2011-12-30','07267 Shasta Center',183,175,'cmcaulay14@list-manage.com','954-392-9245','cmcaulay14','6HCJa7nM1wb','Changtan','China\r'),(42,'Beryl','Dybell','Female','2015-07-03','7243 Larry Point',209,344,'bdybell15@webmd.com','178-329-9989','bdybell15','UeHAzD1Oxvo4','Buzuluk','Russia\r'),(43,'Stanford','Wilsdon','Male','1997-06-01','69290 Bunker Hill Center',249,172,'swilsdon16@ox.ac.uk','912-755-2890','swilsdon16','WLEavN0','Yanzhou','China\r'),(44,'Irina','MacMeanma','Female','2018-11-03','11865 Caliangt Plaza',223,339,'imacmeanma17@furl.net','533-665-1646','imacmeanma17','j9ZPv2bdL6','Gaoqiao','China\r'),(45,'Minnaminnie','Gianetti','Female','2002-06-25','534 Stoughton Circle',194,302,'mgianetti18@sphinn.com','371-562-2913','mgianetti18','TR142V','Bantilan','Indonesia\r'),(46,'Waite','Keighley','Male','1998-06-26','1 Buena Vista Junction',213,237,'wkeighley19@github.com','179-277-9682','wkeighley19','MXmacj','Dukuh Kaler','Indonesia\r'),(47,'Charlotte','Amort','Female','2000-04-05','4 Lotheville Plaza',237,253,'camort1a@spotify.com','809-426-5422','camort1a','qJUYOkzJqA','Liquan Chengguanzhen','China\r'),(48,'Avictor','Curbishley','Male','1999-04-06','6318 Northport Way',240,224,'acurbishley1b@sfgate.com','424-106-0102','acurbishley1b','ubxubZ','Ibrā’','Oman\r'),(49,'Willabella','Trenholm','Female','1999-08-10','84921 5th Center',185,277,'wtrenholm1c@nhs.uk','712-728-3690','wtrenholm1c','lgKUuA4q','Guangyubao','China\r'),(50,'Georgeta','Keele','Female','2004-04-17','77553 Anderson Court',152,244,'gkeele1d@wikispaces.com','144-903-7545','gkeele1d','xI8On4AgUI','Juiz de Fora','Brazil\r'),(51,'Kermy','Stanton','Male','1982-07-17','72427 Canary Junction',236,285,'kstanton1e@surveymonkey.com','941-459-9431','kstanton1e','RKQNyXUOear','Trondheim','Norway\r'),(52,'Keri','Pitcaithly','Female','1999-11-13','04 East Hill',234,266,'kpitcaithly1f@networkadvertising.org','461-162-0764','kpitcaithly1f','KYxRElwB','Jõgeva','Estonia\r'),(53,'Hoebart','Howsan','Male','2016-09-09','276 Crescent Oaks Court',195,280,'hhowsan1g@timesonline.co.uk','295-860-6047','hhowsan1g','btTyZJ','Ágios Athanásios','Greece\r'),(54,'Marilin','Merner','Female','2009-08-13','21719 Loftsgordon Circle',150,210,'mmerner1h@umn.edu','556-267-8580','mmerner1h','WrJGw8G7h5','Nanhai','China\r'),(55,'Fancy','Von Oertzen','Female','2006-11-21','5802 Hoffman Street',214,107,'fvonoertzen1i@archive.org','303-498-0471','fvonoertzen1i','i5OFfoNDekNZ','Danville','Canada\r'),(56,'Porter','Franies','Male','1990-01-10','6 Buell Point',217,221,'pfranies1j@nydailynews.com','860-647-5269','pfranies1j','oX8LxRKr506K','Kitale','Kenya\r'),(57,'Meridith','Brash','Female','1990-07-17','305 School Crossing',153,236,'mbrash1k@unblog.fr','419-707-7312','mbrash1k','fPHqnKBv','Paraty','Brazil\r'),(58,'Reamonn','Jakubowsky','Male','1993-08-13','765 Declaration Court',219,280,'rjakubowsky1l@gravatar.com','513-847-0300','rjakubowsky1l','RJOUjubV3','Uniejów','Poland\r'),(59,'Clevey','Collick','Male','1996-12-11','09711 Westridge Parkway',160,255,'ccollick1m@senate.gov','278-756-4993','ccollick1m','kg8tLs6xpg5','Nariño','Colombia\r'),(60,'Lena','Buckby','Female','2014-12-08','7009 Meadow Valley Center',185,201,'lbuckby1n@netvibes.com','205-683-8348','lbuckby1n','Wv7qQzxcu','Beselga','Portugal\r'),(61,'Xenos','Kempston','Male','1986-05-12','7379 Becker Lane',198,328,'xkempston1o@paginegialle.it','329-464-8679','xkempston1o','OZ25AX','Wau','Papua New Guinea\r'),(62,'Beverlie','Earland','Female','2013-12-09','63 Continental Avenue',196,161,'bearland1p@nyu.edu','451-276-3217','bearland1p','k8tVUSM4Fb1','Guijalo','Philippines\r'),(63,'Knox','MacMillan','Male','2006-11-07','78 Nobel Lane',158,258,'kmacmillan1q@blogtalkradio.com','853-629-7740','kmacmillan1q','6txPQuEbDI','Rudnyy','Kazakhstan\r'),(64,'Damaris','Wikey','Female','1993-11-26','963 Lien Avenue',240,147,'dwikey1r@yahoo.co.jp','906-504-0983','dwikey1r','MAjBovYI341','Al Bahlūlīyah','Syria\r'),(65,'Aaron','Kimmerling','Male','1986-11-03','0 Kennedy Crossing',244,181,'akimmerling1s@gov.uk','941-711-6834','akimmerling1s','WZsYlyH9','Jorok Dalam','Indonesia\r'),(66,'Hort','Keasy','Male','1981-04-16','7388 Morrow Court',196,299,'hkeasy1t@indiegogo.com','627-801-6211','hkeasy1t','ISKj29l6c','Dugu','China\r'),(67,'Gaspard','Jamrowicz','Male','2003-05-09','6 Dawn Street',224,277,'gjamrowicz1u@slashdot.org','603-747-4272','gjamrowicz1u','sVInU7','Pyt-Yakh','Russia\r'),(68,'Shay','Comfort','Female','2012-04-04','8 Del Mar Drive',221,101,'scomfort1v@reference.com','272-641-6967','scomfort1v','AXP2HyC','Yirga ‘Alem','Ethiopia\r'),(69,'Jenny','Driussi','Female','1983-06-25','6 Fremont Center',185,150,'jdriussi1w@google.ru','752-103-7671','jdriussi1w','rtjiQVrfktq','Paris 07','France\r'),(70,'Kristen','Milillo','Female','1996-10-24','1 Onsgard Terrace',234,343,'kmilillo1x@prnewswire.com','794-957-6839','kmilillo1x','5WSTKxDeORYM','Chirkey','Russia\r'),(71,'Rorie','Twopenny','Female','2012-03-08','1 Steensland Junction',235,112,'rtwopenny1y@scientificamerican.com','412-185-3484','rtwopenny1y','8rTvZ0','Jikamshi','Nigeria\r'),(72,'Adora','Pattesall','Female','2016-02-11','155 Derek Plaza',178,172,'apattesall1z@tumblr.com','864-224-8750','apattesall1z','AyXmXEzGmXy','Al Aḩmadī','Kuwait\r'),(73,'Dorothee','Harhoff','Female','1987-07-22','781 Lighthouse Bay Hill',232,208,'dharhoff20@biblegateway.com','477-189-6716','dharhoff20','zMSCwNN67','Kondangrege','Indonesia\r'),(74,'Katrine','Cushworth','Female','1985-04-10','97 High Crossing Center',154,210,'kcushworth21@cnet.com','810-419-6723','kcushworth21','BVtSRmWb','Calimita','Colombia\r'),(75,'Jodee','Beggi','Female','1998-10-07','31 Columbus Park',213,100,'jbeggi22@nasa.gov','979-189-3611','jbeggi22','40TOekhAi2','Sobral','Portugal\r'),(76,'Jessi','McGibbon','Female','1997-04-06','8 Monica Plaza',207,290,'jmcgibbon23@msn.com','238-839-2259','jmcgibbon23','Uk7wQQZDKZ','Longaví','Chile\r'),(77,'Rosie','MacNair','Female','1996-03-19','8342 Burrows Avenue',205,118,'rmacnair24@vk.com','382-843-7978','rmacnair24','NDI7DxD6qW','Digne-les-Bains','France\r'),(78,'Filia','Fitton','Female','2017-01-26','0 Crescent Oaks Center',154,218,'ffitton25@wsj.com','935-270-8255','ffitton25','cxoLrSK','Duobaoshan','China\r'),(79,'Kingston','Huller','Male','1988-10-14','475 Holmberg Hill',156,136,'khuller26@hostgator.com','127-940-3842','khuller26','NfOuyWkwC','Obrenovac','Serbia\r'),(80,'Nomi','Ikins','Female','1994-12-01','6695 Truax Plaza',193,168,'nikins27@si.edu','124-743-8287','nikins27','Z2GFT91','Voi','Kenya\r'),(81,'Alic','McCaffery','Male','2001-08-18','62515 Tony Pass',180,203,'amccaffery28@liveinternet.ru','823-823-4785','amccaffery28','bdYfFge','Halmstad','Sweden\r'),(82,'Pincus','Beardon','Male','1984-02-28','56481 Ronald Regan Plaza',236,298,'pbeardon29@netlog.com','925-133-4654','pbeardon29','JjyU98','Leiyang','China\r'),(83,'Hephzibah','O\'Geaney','Female','2010-11-13','01724 Westport Circle',224,126,'hogeaney2a@yahoo.co.jp','119-989-9536','hogeaney2a','HNPlqfsWE','Dugongan','Philippines\r'),(84,'Maggie','Claussen','Female','2019-03-26','83808 Mendota Center',200,209,'mclaussen2b@cloudflare.com','879-378-9261','mclaussen2b','BJRYmUGM4E','Metchosin','Canada\r'),(85,'Ulrika','Gillott','Female','1994-08-30','0515 6th Point',202,288,'ugillott2c@icio.us','786-532-5943','ugillott2c','nY0bcITe1','Rama','Nicaragua\r'),(86,'Minne','McGinn','Female','2019-09-26','8 Macpherson Pass',238,127,'mmcginn2d@dmoz.org','725-208-7939','mmcginn2d','Bbp6YWkv','Dalsjöfors','Sweden\r'),(87,'Brier','Ajam','Female','1986-12-29','97482 Manufacturers Crossing',206,274,'bajam2e@time.com','925-475-4644','bajam2e','2ojo35e','Staroshcherbinovskaya','Russia\r'),(88,'Nicol','Fattorini','Male','2015-03-06','902 Delladonna Hill',210,222,'nfattorini2f@t-online.de','200-147-9134','nfattorini2f','YQHEcxLWOq','Botigues','Philippines\r'),(89,'Etty','Fenty','Female','1993-09-17','33 Eagan Place',234,106,'efenty2g@columbia.edu','212-699-2143','efenty2g','zi1Fuelw','Sapernoye','Russia\r'),(90,'Billye','Nand','Female','1990-07-26','21993 Crescent Oaks Center',235,329,'bnand2h@yelp.com','449-280-7548','bnand2h','STLS8x5rh','Värnamo','Sweden\r'),(91,'Elsi','Meckiff','Female','2003-09-07','66 Cordelia Center',161,137,'emeckiff2i@smh.com.au','318-777-8628','emeckiff2i','V7UkLQeeXU','Narawayong','Indonesia\r'),(92,'Leandra','Metzke','Female','2007-11-02','9 Northview Circle',198,316,'lmetzke2j@goo.gl','186-819-7155','lmetzke2j','hvGnRo04lH','Jönköping','Sweden\r'),(93,'Aime','Shadrach','Female','1996-11-03','0415 Parkside Pass',210,246,'ashadrach2k@youtu.be','674-922-7354','ashadrach2k','z6HV8v0LlDAr','Fuan','Indonesia\r'),(94,'Klement','Greenhall','Male','1995-12-30','73 Hanover Lane',185,208,'kgreenhall2l@cloudflare.com','518-987-4957','kgreenhall2l','H9EEkAgU3d7','Hluboká nad Vltavou','Czech Republic\r'),(95,'Hazlett','Parcells','Male','2018-05-06','38 Tennessee Alley',200,180,'hparcells2m@geocities.jp','648-500-0473','hparcells2m','J5B6YR5Y6NzW','Yangqiaodian','China\r'),(96,'Caryl','Stonall','Male','1986-08-05','245 Rockefeller Trail',217,331,'cstonall2n@usatoday.com','145-521-9334','cstonall2n','Hb67PzaU','Krasnaye','Belarus\r'),(97,'Lyndsie','Kyles','Female','1990-03-05','7 Forest Lane',225,172,'lkyles2o@xing.com','762-263-9860','lkyles2o','QJlo9xu9o','Kwikila','Papua New Guinea\r'),(98,'Gillian','Melhuish','Female','2012-07-31','6 Judy Trail',190,229,'gmelhuish2p@flickr.com','612-437-0847','gmelhuish2p','WunVdR','Marialva','Brazil\r'),(99,'Adrea','Leith','Female','2013-08-02','46173 Artisan Drive',174,301,'aleith2q@usgs.gov','368-117-6410','aleith2q','OUp51N','Santa Ana','Argentina\r'),(100,'Harmon','Garrow','Male','1985-01-30','95814 2nd Street',167,211,'hgarrow2r@prnewswire.com','170-998-0384','hgarrow2r','Zq4Alq','Tangkanpulit','Indonesia\r');
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
-- Table structure for table `club_like`
--

DROP TABLE IF EXISTS `club_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `club_like` (
  `club_like_id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_club_id` int(11) NOT NULL,
  `fk_athl_id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `isLiked` tinyint(4) NOT NULL,
  PRIMARY KEY (`club_like_id`),
  KEY `fk_club_like_athl_id_idx` (`fk_athl_id`),
  KEY `fk_club_like_club_id_idx` (`fk_club_id`),
  CONSTRAINT `fk_club_like_athl_id` FOREIGN KEY (`fk_athl_id`) REFERENCES `athletes` (`athl_id`),
  CONSTRAINT `fk_club_like_club_id` FOREIGN KEY (`fk_club_id`) REFERENCES `clubs` (`club_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club_like`
--

LOCK TABLES `club_like` WRITE;
/*!40000 ALTER TABLE `club_like` DISABLE KEYS */;
INSERT INTO `club_like` VALUES (1,1,1,'2019-10-18 07:00:00',1),(2,2,1,'2019-10-18 08:00:00',0),(3,1,3,'2019-10-18 07:00:00',1),(4,2,3,'2019-10-18 07:00:00',1);
/*!40000 ALTER TABLE `club_like` ENABLE KEYS */;
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
  `mgr_account` varchar(45) DEFAULT NULL,
  `mgr_password` varchar(45) NOT NULL,
  PRIMARY KEY (`mgr_id`),
  KEY `fk_clubs_id_idx` (`fk_clubs_id`),
  CONSTRAINT `fk_clubs_id` FOREIGN KEY (`fk_clubs_id`) REFERENCES `clubs` (`club_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club_mgr`
--

LOCK TABLES `club_mgr` WRITE;
/*!40000 ALTER TABLE `club_mgr` DISABLE KEYS */;
INSERT INTO `club_mgr` VALUES (1,'Fania','Feldharker','ffeldharker0@ucsd.edu','783-232-6165',1,'ffeldharker0','zadicVF'),(2,'Nicole','Reignard','nreignard1@fc2.com','819-151-8367',2,'nreignard1','Vuhi9IWV9ic'),(3,'Orion','Wilfing','owilfing2@chronoengine.com','314-464-6496',3,'owilfing2','6OgFX0'),(4,'Taylor','Cleyne','tcleyne3@spiegel.de','151-218-5449',4,'tcleyne3','riMf9epn'),(5,'Sybyl','Lehr','slehr4@bbc.co.uk','933-451-6041',5,'slehr4','Ttdo1x'),(6,'Dylan','Burgoine','dburgoine5@nih.gov','911-947-5271',6,'dburgoine5','O4ur1F'),(7,'Clyve','Beinke','cbeinke6@goo.ne.jp','970-707-0839',7,'cbeinke6','ImI8dUBtX'),(8,'Linn','Du Fray','ldufray7@seattletimes.com','291-766-6518',8,'ldufray7','xQ9zmcD');
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
  `club_size` varchar(45) DEFAULT NULL,
  `club_status` varchar(45) DEFAULT NULL,
  `club_url` varchar(45) DEFAULT NULL,
  `club_contact` varchar(45) DEFAULT NULL,
  `fk_sports_id` int(11) DEFAULT NULL,
  `street_name` varchar(120) DEFAULT NULL,
  `city` varchar(120) DEFAULT NULL,
  `country` varchar(120) DEFAULT NULL,
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
INSERT INTO `clubs` VALUES (1,'Liverpool','Large','Vacant','www.liverpoolfc.com','448-200-5881',1,'Ridgeview','London','England'),(2,'Manchester United','Full','Vacant','www.manchesterunited.com','823-854-9027',1,'Manchester','Manchester','England'),(3,'Paris-St.Germain','Full','Vacant','www.parisgermain.com','545-481-9779',1,'fleur de tois','Paris','France'),(4,'Vancouver Whitecaps','Large','Vacant','www.whitecaps.com','186-879-3340',1,'smithe','Vancouver','Canada'),(5,'TorontoFC','Medium','Full','www.torontofc.com','241-129-5070',1,'gilberts','Toronto','Ontario'),(6,'Montreal Impact','Medium','Vacant','www.montrealimpact.com','323-130-1013',1,'Little Fleum','Montreal','Canada'),(7,'Ottawa Fury','Medium','Vacant','www.ottawafury.com','433-170-9065',1,'Springview','Ottowa','Canada'),(8,'Manchester City','Large','Vacant','www.manchestercity.com','410-626-9611',1,'Vera','Manchester','England'),(9,'Real Madrid','Large','Vacant','www.realmadridfc.com','869-398-0491',1,'Novick','Madrid','Spain');
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers`
--

LOCK TABLES `offers` WRITE;
/*!40000 ALTER TABLE `offers` DISABLE KEYS */;
INSERT INTO `offers` VALUES (1,'GK','1000000','Goal Keeper for 6 years','test','A','6',1,'Goal Keeper Contract'),(2,'RF','800000','Right Fullback for 3 years','test','B','6',2,'Right Fullback Contract'),(3,'LF','700000','Left Fullback for 2 years','test','C','6',3,'Left Fullback Contract'),(4,'DM','600000','Defending Midfielder for 4 years','test','B','6',4,'Defending Midfielder Contract'),(5,'RM','650000','Right Midfielder for 3 years','test','C','6',5,'Right Midfielder Contract'),(6,'RW','550000','Right Winger for 4 years','test','C','6',6,'Right Winger Contract'),(7,'RW','500000','Right Winger for 3 years','test','C','6',6,'Right Winger Contract'),(8,'CM','560000','Central Midfielder for 3 years','test','B','6',7,'Central Midfielder Contract'),(9,'BM','750000','Box-to-Box Midfielder for 6 years','test','B','6',7,'Box-to-Box Midfielder Contract'),(10,'SK','680000','Striker for 6 years','test','B','6',8,'Striker Contract'),(11,'AM','660000','Attacking Midfielder for 5 years','test','A','6',9,'Attacking Midfielder Contract'),(12,'AP','590000','Attacking Playmaker for 3 years','test','C','6',9,'Attacking Midfielder Contract'),(13,'LM','780000','Left Midfielder for 8 years','test','A','6',4,'Left Midfielder Contract'),(14,'LW','670000','Left Wingers for 7 years','test','A','6',5,'Left Wingers Contract'),(15,'GK','770000','Goalkeeper for 6 years','test','A','6',3,'Goalkeeper Contract'),(16,'GK','670000','Goalkeeper for 6 years','test','A','6',2,'Goalkeeper Contract'),(17,'DM','700000','Defending  Midfielder for 7 years','test','A','6',1,'Defending  Midfielder Contract'),(18,'CB','680000','Center Back for 6 years','test','A','6',2,'Center Back Contract'),(19,'HM','760000','Holding Midfielder for 7 years','test','A','6',4,'Holding Midfielder Contract'),(20,'SK','780000','Striker for 8 years','test','A','6',5,'Striker Contract');
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
  `stats` varchar(400) DEFAULT NULL,
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
INSERT INTO `profiles` VALUES (1,'GK','Samuel L. Jackson','test','test','Normal','test','Hello World A',1,1,'Active'),(2,'RF','Pep Guardiola','test','test','Normal','test','Hello World B',1,2,'Active'),(3,'LF','Massimiliano Allegri','test','test','Normal','test','Hello World C',1,3,'Active'),(4,'CB','Zinedine Zidane','test','test','Normal','test','Hello World D',1,4,'Active'),(5,'DM','Antonio Conte','test','test','Normal','test','Hello World E',1,5,'Active'),(6,'RM','Diego Simeone','test','test','Normal','test','Hello World F',1,6,'Active'),(7,'RW','Julen Lopetegui','test','test','Normal','test','Hello World G',1,7,'Active'),(8,'CM','Unai Emery','test','test','Normal','test','Hello World H',1,8,'Active'),(9,'BM','Fernando Santos','test','test','Normal','test','Hello World I',1,9,'Active'),(10,'SK','Didier Deschamps','test','test','Normal','test','Hello World J',1,10,'Active'),(11,'AM','Arsène Wenger','test','test','Normal','test','Hello World K',1,11,'Active'),(12,'AP','Roberto Martinez','test','test','Normal','test','Hello World K',1,12,'Active'),(13,'LM','Jupp Heynckes','test','test','Normal','test','Hello World K',1,13,'Active'),(14,'LW','Leonardo Jardim','test','test','Normal','test','Hello World K',1,14,'Active');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sports`
--

LOCK TABLES `sports` WRITE;
/*!40000 ALTER TABLE `sports` DISABLE KEYS */;
INSERT INTO `sports` VALUES (1,'soccer','0'),(2,'basketball','0'),(3,'rugby','1');
/*!40000 ALTER TABLE `sports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'stg'
--

--
-- Dumping routines for database 'stg'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-30 18:11:31
