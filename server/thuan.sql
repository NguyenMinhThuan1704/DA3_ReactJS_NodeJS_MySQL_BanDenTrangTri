USE thuan123;


-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: banden
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `MaSanPham` int DEFAULT NULL,
  `MaTaiKhoan` int DEFAULT NULL,
  `SoLuong` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (42,187,16,1,'2025-06-05 00:25:07','2025-06-05 00:25:07'),(43,188,16,1,'2025-06-05 00:25:07','2025-06-05 00:25:07');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitiethoadonbans`
--

DROP TABLE IF EXISTS `chitiethoadonbans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitiethoadonbans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `MaHoaDonBan` int DEFAULT NULL,
  `MaSanPham` int DEFAULT NULL,
  `SoLuongCTHDB` int DEFAULT NULL,
  `GiaCTHDB` int DEFAULT NULL,
  `TongGia` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cthdb_hdb_FK` (`MaHoaDonBan`),
  KEY `cthdb_sp_FK` (`MaSanPham`),
  CONSTRAINT `cthdb_hdb_FK` FOREIGN KEY (`MaHoaDonBan`) REFERENCES `hoadonbans` (`id`),
  CONSTRAINT `cthdb_sp_FK` FOREIGN KEY (`MaSanPham`) REFERENCES `sanphams` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitiethoadonbans`
--

LOCK TABLES `chitiethoadonbans` WRITE;
/*!40000 ALTER TABLE `chitiethoadonbans` DISABLE KEYS */;
INSERT INTO `chitiethoadonbans` VALUES (3,6,190,4,12457000,49828000,'2024-05-27 00:00:47','2024-05-27 00:00:47'),(4,6,170,2,12580000,25160000,'2024-05-27 00:00:47','2024-05-27 00:00:47'),(5,7,181,2,7700000,15400000,'2024-05-27 13:31:05','2024-05-27 13:31:05'),(6,8,170,1,12580000,12580000,'2024-05-29 17:57:45','2024-05-29 17:57:45'),(7,8,172,5,9280000,46400000,'2024-05-29 17:57:45','2024-05-29 17:57:45'),(8,8,171,2,5960000,11920000,'2024-05-29 17:57:45','2024-05-29 17:57:45'),(9,9,171,4,5960000,23840000,'2024-06-06 14:37:10','2024-06-06 14:37:10'),(10,9,184,5,4845000,24225000,'2024-06-06 14:37:10','2024-06-06 14:37:10'),(11,9,170,3,12580000,37740000,'2024-06-06 14:37:10','2024-06-06 14:37:10'),(12,9,183,3,9300000,27900000,'2024-06-06 14:37:10','2024-06-06 14:37:10'),(13,10,174,5,46600000,233000000,'2024-06-06 16:43:35','2024-06-06 16:43:35'),(14,11,180,10,3100000,31000000,'2024-06-07 17:16:00','2024-06-07 17:16:00'),(15,12,170,2,12580000,25160000,'2024-06-08 14:23:06','2024-06-08 14:23:06'),(16,12,177,3,12500000,37500000,'2024-06-08 14:23:06','2024-06-08 14:23:06'),(17,13,185,1,6990000,6990000,'2024-06-13 20:55:41','2024-06-13 20:55:41'),(18,13,174,1,46600000,46600000,'2024-06-13 20:55:41','2024-06-13 20:55:41'),(19,13,180,4,3100000,12400000,'2024-06-13 20:55:41','2024-06-13 20:55:41'),(20,14,170,3,12580000,37740000,'2025-05-10 15:49:09','2025-05-10 15:49:09'),(21,14,171,3,5960000,17880000,'2025-05-10 15:49:09','2025-05-10 15:49:09'),(22,15,170,3,12580000,37740000,'2025-05-12 21:42:08','2025-05-12 21:42:08'),(23,15,178,4,9530000,38120000,'2025-05-12 21:42:08','2025-05-12 21:42:08'),(24,15,179,4,3300000,13200000,'2025-05-12 21:42:08','2025-05-12 21:42:08'),(25,15,180,4,3100000,12400000,'2025-05-12 21:42:08','2025-05-12 21:42:08'),(26,16,172,1,9280000,9280000,'2025-05-12 21:58:56','2025-05-12 21:58:56'),(27,16,175,1,4540000,4540000,'2025-05-12 21:58:56','2025-05-12 21:58:56'),(28,16,176,1,6990000,6990000,'2025-05-12 21:58:56','2025-05-12 21:58:56'),(29,17,190,2,12457000,24914000,'2025-05-20 23:49:57','2025-05-20 23:49:57'),(30,17,187,2,4360000,8720000,'2025-05-20 23:49:57','2025-05-20 23:49:57'),(31,17,191,2,1295000,2590000,'2025-05-20 23:49:57','2025-05-20 23:49:57'),(32,18,260,1,1000000,1000000,'2025-05-21 01:15:35','2025-05-21 01:15:35'),(33,18,179,1,3300000,3300000,'2025-05-21 01:15:35','2025-05-21 01:15:35'),(34,18,170,1,12580000,12580000,'2025-05-21 01:15:35','2025-05-21 01:15:35'),(35,35,174,1,46600000,46600000,'2025-06-04 09:35:52','2025-06-04 09:35:52'),(36,35,175,1,4540000,4540000,'2025-06-04 09:35:52','2025-06-04 09:35:52'),(37,43,170,1,12580000,12580000,'2025-06-05 00:15:53','2025-06-05 00:15:53'),(38,43,172,1,9280000,9280000,'2025-06-05 00:15:53','2025-06-05 00:15:53'),(39,43,171,1,5960000,5960000,'2025-06-05 00:15:53','2025-06-05 00:15:53');
/*!40000 ALTER TABLE `chitiethoadonbans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitiethoadonnhaps`
--

DROP TABLE IF EXISTS `chitiethoadonnhaps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitiethoadonnhaps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `MaHoaDonNhap` int DEFAULT NULL,
  `MaSanPham` int DEFAULT NULL,
  `SoLuongCTHDN` int DEFAULT NULL,
  `GiaNhap` int DEFAULT NULL,
  `TongTienCTHDN` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cthdn_hdn_FK` (`MaHoaDonNhap`),
  KEY `cthdn_sp_FK` (`MaSanPham`),
  CONSTRAINT `cthdn_hdn_FK` FOREIGN KEY (`MaHoaDonNhap`) REFERENCES `hoadonnhaps` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cthdn_sp_FK` FOREIGN KEY (`MaSanPham`) REFERENCES `sanphams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitiethoadonnhaps`
--

LOCK TABLES `chitiethoadonnhaps` WRITE;
/*!40000 ALTER TABLE `chitiethoadonnhaps` DISABLE KEYS */;
INSERT INTO `chitiethoadonnhaps` VALUES (1,1,170,20,5000000,100000000,'2024-06-05 11:22:44','2024-06-05 11:22:44'),(4,3,172,3,4222400,12667200,'2024-06-05 15:11:08','2024-06-05 15:11:08'),(5,3,172,1,4222400,4222400,'2024-06-05 15:11:08','2024-06-05 15:11:08'),(6,4,176,10,3425100,34251000,'2024-06-05 15:13:04','2024-06-05 15:13:04'),(7,4,178,10,4336500,43365000,'2024-06-05 15:13:04','2024-06-05 15:13:04'),(8,4,177,20,6125000,122500000,'2024-06-05 15:13:04','2024-06-05 15:13:04'),(9,5,219,10,93100,931000,'2024-06-05 15:21:28','2024-06-05 15:21:28'),(10,5,216,10,429100,4291000,'2024-06-05 15:21:28','2024-06-05 15:21:28'),(11,5,218,10,95200,952000,'2024-06-05 15:21:28','2024-06-05 15:21:28'),(12,6,191,3,590100,1770300,'2024-06-06 14:52:37','2024-06-06 14:52:37'),(13,6,196,4,1355900,5423600,'2024-06-06 14:52:38','2024-06-06 14:52:38'),(14,6,193,3,1955100,5865300,'2024-06-06 14:52:38','2024-06-06 14:52:38'),(15,7,170,10,5723900,57239000,'2024-06-06 16:44:26','2024-06-06 16:44:26'),(16,8,170,10,5723900,57239000,'2024-06-07 17:03:47','2024-06-07 17:03:47'),(17,9,179,1,1501500,1501500,'2024-06-08 14:29:09','2024-06-08 14:29:09'),(18,10,260,10,700000,7000000,'2025-05-10 15:32:22','2025-05-10 15:32:22'),(19,11,260,10,700000,7000000,'2025-05-10 16:10:14','2025-05-10 16:10:14');
/*!40000 ALTER TABLE `chitiethoadonnhaps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitietsanphams`
--

DROP TABLE IF EXISTS `chitietsanphams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietsanphams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `MaSanPham` int DEFAULT NULL,
  `MaNhaPhanPhoi` int DEFAULT NULL,
  `Style` varchar(255) DEFAULT NULL,
  `RoomType` varchar(255) DEFAULT NULL,
  `SizeCategory` varchar(255) DEFAULT NULL,
  `DominantColors` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ctsp_sp_FK` (`MaSanPham`),
  KEY `ctsp_npp_FK` (`MaNhaPhanPhoi`),
  CONSTRAINT `ctsp_npp_FK` FOREIGN KEY (`MaNhaPhanPhoi`) REFERENCES `nhaphanphois` (`id`),
  CONSTRAINT `ctsp_sp_FK` FOREIGN KEY (`MaSanPham`) REFERENCES `sanphams` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietsanphams`
--

LOCK TABLES `chitietsanphams` WRITE;
/*!40000 ALTER TABLE `chitietsanphams` DISABLE KEYS */;
INSERT INTO `chitietsanphams` VALUES (1,170,1,'Modern','living room','large','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:50','2025-05-31 11:45:50'),(2,171,2,'Modern','ceiling','medium','[\"black\", \"gray\"]','2025-05-31 11:45:50','2025-05-31 11:45:50'),(3,172,3,'Modern','ceiling','large','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:50','2025-05-31 11:45:50'),(4,173,4,'Traditional','living room','medium','[\"sienna\", \"burlywood\"]','2025-05-31 11:45:50','2025-05-31 11:45:50'),(5,174,5,'Classic','living room','large','[\"silver\", \"white\"]','2025-05-31 11:45:50','2025-05-31 11:45:50'),(6,175,6,'Modern','ceiling','large','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:50','2025-05-31 11:45:50'),(7,176,7,'Modern','living room','medium','[\"sienna\", \"burlywood\"]','2025-05-31 11:45:50','2025-05-31 11:45:50'),(8,177,8,'Traditional','living room','large','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:50','2025-05-31 11:45:50'),(9,178,9,'Modern','ceiling','large','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:50','2025-05-31 11:45:50'),(10,179,10,'Modern','bedroom','small','[\"white\", \"gray\"]','2025-05-31 11:45:50','2025-05-31 11:45:50'),(11,180,11,'Modern','bedroom','medium','[\"white\", \"gray\"]','2025-05-31 11:45:50','2025-05-31 11:45:50'),(12,181,12,'Modern','ceiling','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:50','2025-05-31 11:45:50'),(13,182,13,'Modern','ceiling','medium','[\"white\", \"gray\"]','2025-05-31 11:45:50','2025-05-31 11:45:50'),(14,183,14,'Classic','ceiling','small','[\"silver\", \"white\"]','2025-05-31 11:45:50','2025-05-31 11:45:50'),(15,184,15,'Modern','ceiling','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:50','2025-05-31 11:45:50'),(16,185,16,'Modern','ceiling','small','[\"silver\", \"white\"]','2025-05-31 11:45:50','2025-05-31 11:45:50'),(17,186,17,'Classic','living room','medium','[\"silver\", \"white\"]','2025-05-31 11:45:50','2025-05-31 11:45:50'),(18,187,18,'Modern','living room','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:50','2025-05-31 11:45:50'),(19,188,19,'Classic','bedroom','large','[\"silver\", \"white\"]','2025-05-31 11:45:50','2025-05-31 11:45:50'),(20,189,20,'Modern','living room','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(21,190,1,'Modern','living room','large','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(22,191,2,'Modern','bedroom','medium','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(23,192,3,'Classic','living room','medium','[\"silver\", \"white\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(24,193,4,'Modern','living room','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(25,194,5,'Modern','wall','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(26,195,6,'Modern','bedroom','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(27,196,7,'Modern','living room','medium','[\"silver\", \"white\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(28,197,8,'Modern','living room','medium','[\"silver\", \"white\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(29,198,9,'Modern','bedroom','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(30,199,10,'Modern','living room','medium','[\"silver\", \"white\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(31,200,11,'Modern','living room','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(32,201,12,'Modern','living room','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(33,202,13,'Modern','outdoor','medium','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(34,203,14,'Modern','bedroom','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(35,204,15,'Modern','wall','small','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(36,205,16,'Modern','bedroom','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(37,206,17,'Modern','bedroom','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(38,207,18,'Modern','wall','small','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(39,208,19,'Modern','bedroom','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(40,209,20,'Modern','bedroom','small','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(41,210,1,'Modern','wall','medium','[\"black\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(42,211,2,'Modern','wall','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(43,212,3,'Modern','wall','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(44,213,4,'Modern','wall','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(45,214,5,'Modern','wall','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(46,215,6,'Modern','wall','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(47,216,7,'Modern','wall','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(48,217,8,'Modern','wall','medium','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(49,218,9,'Modern','ceiling','small','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(50,219,10,'Modern','ceiling','small','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(51,220,11,'Modern','ceiling','small','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(52,221,12,'Modern','ceiling','small','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(53,222,13,'Modern','living room','small','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(54,223,14,'Modern','living room','small','[\"gold\", \"yellow\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(55,224,15,'Modern','living room','small','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(56,225,16,'Modern','living room','small','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(57,226,17,'Modern','outdoor','medium','[\"green\", \"darkslategray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(58,227,18,'Modern','wall','medium','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(59,228,19,'Modern','outdoor','medium','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(60,229,20,'Modern','outdoor','medium','[\"green\", \"burlywood\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(61,230,1,'Modern','living room','medium','[\"gold\", \"brown\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(62,231,2,'Modern','outdoor','medium','[\"green\", \"burlywood\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(63,232,3,'Modern','outdoor','medium','[\"green\", \"darkslategray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(64,233,4,'Modern','outdoor','medium','[\"gold\", \"brown\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(65,234,5,'Modern','outdoor','medium','[\"green\", \"burlywood\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(66,235,6,'Modern','outdoor','medium','[\"yellow\", \"green\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(67,236,7,'Modern','outdoor','medium','[\"yellow\", \"green\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(68,237,8,'Modern','outdoor','medium','[\"yellow\", \"green\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(69,238,9,'Modern','outdoor','medium','[\"yellow\", \"green\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(70,239,10,'Modern','outdoor','medium','[\"gold\", \"yellow\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(71,240,11,'Modern','outdoor','medium','[\"yellow\", \"green\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(72,241,12,'Modern','outdoor','small','[\"yellow\", \"green\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(73,242,13,'Modern','living room','small','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(74,243,14,'Modern','living room','medium','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(75,244,15,'Modern','living room','small','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(76,245,16,'Modern','living room','medium','[\"gold\", \"yellow\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(77,246,17,'Modern','living room','small','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(78,247,18,'Modern','living room','medium','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(79,248,19,'Modern','living room','small','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(80,249,20,'Modern','living room','medium','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(81,250,1,'Modern','living room','large','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(82,251,2,'Modern','living room','medium','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(83,252,3,'Modern','living room','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(84,253,4,'Modern','living room','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(85,254,5,'Modern','living room','medium','[\"white\", \"gray\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(86,255,6,'Modern','living room','medium','[\"white\",\"gray\",\"black\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(87,256,7,'Classic','living room','medium','[\"silver\", \"white\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(88,257,8,'Classic','living room','medium','[\"silver\", \"white\"]','2025-05-31 11:45:51','2025-05-31 11:45:51'),(90,260,9,'Modern','living room','large','[\"white\",\"gray\",\"black\"]','2025-05-31 11:46:43','2025-05-31 11:46:43'),(91,259,10,'Modern','living room','large','[\"white\",\"gray\",\"black\"]','2025-05-31 11:46:43','2025-05-31 11:46:43');
/*!40000 ALTER TABLE `chitietsanphams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danhgias`
--

DROP TABLE IF EXISTS `danhgias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danhgias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `MaSanPham` int NOT NULL,
  `MaKhachHang` int NOT NULL,
  `MoTa` varchar(255) DEFAULT NULL,
  `SoSao` int NOT NULL DEFAULT '5',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhgias`
--

LOCK TABLES `danhgias` WRITE;
/*!40000 ALTER TABLE `danhgias` DISABLE KEYS */;
INSERT INTO `danhgias` VALUES (2,171,15,'Sản phẩm rất chất lượng, giao hàng nhanh.',5,'2025-05-21 01:23:52','2025-05-21 01:23:52'),(3,170,15,'Tốt',5,'2025-05-22 02:14:02','2025-05-22 02:14:02'),(4,260,15,'Siêu tốt',5,'2025-05-22 03:02:06','2025-05-22 03:02:06');
/*!40000 ALTER TABLE `danhgias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `duanthuchiens`
--

DROP TABLE IF EXISTS `duanthuchiens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `duanthuchiens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `TieuDe` varchar(255) DEFAULT NULL,
  `AnhDaiDien` varchar(255) DEFAULT NULL,
  `MoTa` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `duanthuchiens`
--

LOCK TABLES `duanthuchiens` WRITE;
/*!40000 ALTER TABLE `duanthuchiens` DISABLE KEYS */;
INSERT INTO `duanthuchiens` VALUES (1,'Dự Án ABC - Tăng Cường Hạ Tầng Giao Thông','./../../assets/img/DuAnThucHien/duanthuchien1.jpg','Dự án ABC nhằm nâng cao chất lượng hạ tầng giao thông, tạo điều kiện thuận lợi cho việc di chuyển và phát triển kinh tế.','2024-03-30 10:54:29','2024-03-30 10:54:29'),(2,'Dự Án XYZ - Xây Dựng Trung Tâm Thương Mại','./../../assets/img/DuAnThucHien/duanthuchien2.jpg','Dự án XYZ tập trung vào việc xây dựng trung tâm thương mại hiện đại, đáp ứng nhu cầu mua sắm và giải trí của cộng đồng.','2024-03-30 10:54:29','2024-03-30 10:54:29'),(3,'Dự Án KLM - Phát Triển Khu Đô Thị Sinh Thái','./../../assets/img/DuAnThucHien/duanthuchien3.jpg','Dự án KLM nhằm phát triển khu đô thị sinh thái, góp phần bảo vệ môi trường và cải thiện chất lượng cuộc sống cho cư dân.','2024-03-30 10:54:29','2024-03-30 10:54:29'),(4,'Dự Án DEF - Xây Dựng Cơ Sở Hạ Tầng Y Tế','./../../assets/img/DuAnThucHien/duanthuchien4.jpg','Dự án DEF tạo ra cơ sở hạ tầng y tế hiện đại, cung cấp dịch vụ chăm sóc sức khỏe chất lượng cho cộng đồng.','2024-03-30 10:54:29','2024-03-30 10:54:29'),(5,'Dự Án LMN - Phát Triển Công Viên Xanh','./../../assets/img/DuAnThucHien/duanthuchien5.jpg','Dự án LMN tập trung vào việc phát triển công viên xanh, tạo không gian sống trong lành và thư giãn cho cư dân.','2024-03-30 10:54:29','2024-03-30 10:54:29'),(6,'Dự Án GHI - Xây Dựng Trường Học Mới','./../../assets/img/DuAnThucHien/duanthuchien6.jpg','Dự án GHI hỗ trợ xây dựng trường học mới, nâng cao chất lượng giáo dục và tạo điều kiện học tập tốt hơn cho các em nhỏ.','2024-03-30 10:54:29','2024-03-30 10:54:29'),(7,'Dự Án UVW - Phát Triển Khu Du Lịch Nghỉ Dưỡng','./../../assets/img/DuAnThucHien/duanthuchien7.jpg','Dự án UVW tạo ra khu du lịch nghỉ dưỡng hiện đại, thu hút du khách và đóng góp vào phát triển kinh tế địa phương.','2024-03-30 10:54:29','2024-03-30 10:54:29'),(8,'Dự Án RST - Xây Dựng Khu Dân Cư Mới','./../../assets/img/DuAnThucHien/duanthuchien8.jpg','Dự án RST làm mới khu dân cư, cung cấp nhà ở cho người dân và cải thiện điều kiện sinh sống.','2024-03-30 10:54:29','2024-03-30 10:54:29'),(9,'Dự Án OPQ - Cải Thiện Hệ Thống Nước Sạch','./../../assets/img/DuAnThucHien/duanthuchien9.jpg','Dự án OPQ tập trung vào việc cải thiện hệ thống cung cấp nước sạch, đảm bảo sức khỏe cho cộng đồng.','2024-03-30 10:54:29','2024-03-30 10:54:29'),(10,'Dự Án EFG - Xây Dựng Trung Tâm Văn Hóa','./../../assets/img/DuAnThucHien/duanthuchien10.jpg','Dự án EFG đầu tư xây dựng trung tâm văn hóa, tạo điều kiện cho các hoạt động văn hóa, giáo dục và giải trí của cộng đồng.','2024-03-30 10:54:29','2024-03-30 10:54:29'),(11,'Dự Án HIJ - Phát Triển Khu Công Nghiệp','./../../assets/img/DuAnThucHien/duanthuchien11.jpg','Dự án HIJ tạo ra khu công nghiệp hiện đại, thu hút đầu tư và tạo việc làm cho người lao động trong khu vực.','2024-03-30 10:54:29','2024-03-30 10:54:29'),(12,'Dự Án STU - Xây Dựng Cơ Sở Hạ Tầng Giao Thông','./../../assets/img/DuAnThucHien/duanthuchien12.jpg','Dự án STU tập trung vào việc xây dựng cơ sở hạ tầng giao thông, tăng cường kết nối vùng miền và phát triển kinh tế.','2024-03-30 10:54:29','2024-03-30 10:54:29'),(13,'Dự Án VWX - Phát Triển Khu Đô Thị Mới','./../../assets/img/DuAnThucHien/duanthuchien13.jpg','Dự án VWX nhằm phát triển khu đô thị mới, đáp ứng nhu cầu về nhà ở và dịch vụ cho dân cư.','2024-03-30 10:54:29','2024-03-30 10:54:29'),(14,'Dự Án YZT - Xây Dựng Cơ Sở Hạ Tầng Giao Thông Nông Thôn','./../../assets/img/DuAnThucHien/duanthuchien14.jpg','Dự án YZT hỗ trợ xây dựng cơ sở hạ tầng giao thông ở các vùng nông thôn, tạo điều kiện kết nối và phát triển nông nghiệp.','2024-03-30 10:54:29','2024-03-30 10:54:29'),(15,'Dự Án BCD - Phát Triển Khu Dân Cư Thanh Đô','./../../assets/img/DuAnThucHien/duanthuchien15.jpg','Dự án BCD đầu tư vào việc phát triển khu dân cư thanh đô, tạo ra môi trường sống hiện đại và tiện nghi.','2024-03-30 10:54:29','2024-03-30 10:54:29'),(16,'Dự Án XYZ - Xây Dựng Trung Tâm Thương Mại','./../../assets/img/DuAnThucHien/duanthuchien16.jpg','Dự án XYZ tập trung vào việc xây dựng trung tâm thương mại hiện đại, đáp ứng nhu cầu mua sắm và giải trí của cộng đồng.','2024-03-30 10:54:29','2024-03-30 10:54:29'),(17,'Dự Án KLM - Phát Triển Khu Đô Thị Sinh Thái','./../../assets/img/DuAnThucHien/duanthuchien17.jpg','Dự án KLM nhằm phát triển khu đô thị sinh thái, góp phần bảo vệ môi trường và cải thiện chất lượng cuộc sống cho cư dân.','2024-03-30 10:54:29','2024-03-30 10:54:29'),(18,'Dự Án DEF - Xây Dựng Cơ Sở Hạ Tầng Y Tế','./../../assets/img/DuAnThucHien/duanthuchien18.jpg','Dự án DEF tạo ra cơ sở hạ tầng y tế hiện đại, cung cấp dịch vụ chăm sóc sức khỏe chất lượng cho cộng đồng.','2024-03-30 10:54:29','2024-03-30 10:54:29'),(22,'test1','./../../assets/img/DuAnThucHien/duanthuchien13.jpg','test1','2024-05-19 14:39:26','2024-05-19 14:39:31');
/*!40000 ALTER TABLE `duanthuchiens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoadonbans`
--

DROP TABLE IF EXISTS `hoadonbans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoadonbans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `MaKH` int DEFAULT NULL,
  `TenKH` varchar(255) DEFAULT NULL,
  `DiaChi` varchar(255) DEFAULT NULL,
  `SoDienThoai` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `TrangThaiDuyet` tinyint(1) DEFAULT NULL,
  `Shipped` tinyint(1) DEFAULT NULL,
  `TongGia` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `TrangThai` varchar(255) DEFAULT NULL,
  `HinhThucThanhToan` varchar(255) DEFAULT NULL,
  `TrangThaiThanhToan` tinyint(1) DEFAULT NULL,
  `ThoiGianThanhToan` datetime DEFAULT NULL,
  `order_code` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hdb_tk_FK` (`MaKH`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoadonbans`
--

LOCK TABLES `hoadonbans` WRITE;
/*!40000 ALTER TABLE `hoadonbans` DISABLE KEYS */;
INSERT INTO `hoadonbans` VALUES (6,13,'Nguyễn Minh Thuận','Hưng yên','1234567999','thuanpro9b@gmail.com',1,1,74988000,'2024-05-27 00:00:46','2024-06-02 14:13:48','Hoàn thành','Tiền mặt',1,NULL,NULL),(7,13,'Nguyễn Minh Thuận','Hưng yên','1234567999','thuanpro9b@gmail.com',0,0,15400000,'2024-05-27 13:31:05','2025-05-21 00:06:40','Chưa duyệt','Tiền mặt',0,NULL,NULL),(8,13,'Nguyễn Quốc Thái','Hà Nội','1234567890','thai@gmail.com',0,0,70900000,'2024-05-29 17:57:45','2025-05-21 00:06:40','Chưa duyệt','Tiền mặt',0,NULL,NULL),(9,13,'Nguyễn Quốc Thái','Hà Nội','1234567890','thai@gmail.com',0,0,113705000,'2024-06-06 14:37:10','2025-05-21 00:06:40','Chưa duyệt','Tiền mặt',0,NULL,NULL),(10,13,'Nguyễn Quốc Thái','Hà Nội','1234567890','thai@gmail.com',0,0,233000000,'2024-06-06 16:43:35','2025-06-01 23:15:32','Chưa duyệt','Tiền mặt',0,NULL,NULL),(11,13,'Nguyễn Minh Thuận','Hưng Yên','1234567999','thuanpro9b@gmail.com',1,0,31000000,'2024-06-07 17:16:00','2025-05-21 00:06:40','Đã duyệt, chờ vận chuyển','Tiền mặt',0,NULL,NULL),(12,14,'Nguyễn Minh Thuận','Hưng Yên','1234567999','thuanpro9b@gmail.com',1,0,62660000,'2024-06-08 14:23:06','2025-05-21 00:06:40','Đã duyệt, chờ vận chuyển','Tiền mặt',0,NULL,NULL),(13,14,'Nguyễn Minh Thuận','Hưng Yên','1234567999','thuanpro9b@gmail.com',1,1,65990000,'2024-06-13 20:55:41','2025-06-01 23:04:36','Đơn hàng đang trên đường giao','Tiền mặt',0,NULL,NULL),(14,15,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin@gmal.com',1,1,55620000,'2025-05-10 15:49:09','2025-05-10 16:05:26','Hoàn thành','Tiền mặt',1,NULL,NULL),(15,15,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin@gmal.com',1,1,101460000,'2025-05-12 21:42:08','2025-05-12 21:55:37','Hoàn thành','Tiền mặt',1,NULL,NULL),(16,15,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin@gmal.com',1,1,20810000,'2025-05-12 21:58:56','2025-05-12 22:01:19','Hoàn thành','Tiền mặt',1,NULL,NULL),(17,15,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin@gmal.com',1,0,36224000,'2025-05-20 23:49:57','2025-06-01 22:30:45','Chưa duyệt','Tiền mặt',0,NULL,NULL),(18,15,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin@gmal.com',1,1,16880000,'2025-05-21 01:15:35','2025-05-22 03:01:46','Hoàn thành','Tiền mặt',1,NULL,NULL),(19,15,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin@gmal.com',0,0,33600000,'2025-06-02 00:51:09','2025-06-02 00:51:09','Chưa duyệt','QR/Online',0,NULL,8099984623),(20,15,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin@gmal.com',0,0,33600000,'2025-06-02 00:58:19','2025-06-02 00:58:19','Chưa duyệt','QR/Online',0,NULL,3088131180),(21,15,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin@gmal.com',0,0,23050000,'2025-06-02 01:00:02','2025-06-02 01:00:02','Chưa duyệt','QR/Online',0,NULL,5495108807),(22,15,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin@gmal.com',0,0,10550000,'2025-06-02 01:00:58','2025-06-02 01:00:58','Chưa duyệt','QR/Online',0,NULL,3127007918),(23,15,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin@gmal.com',0,0,10550000,'2025-06-02 01:02:18','2025-06-02 01:02:18','Chưa duyệt','QR/Online',0,NULL,1343582551),(24,15,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin@gmal.com',0,0,10550000,'2025-06-02 01:05:07','2025-06-02 01:05:07','Chưa duyệt','QR/Online',0,NULL,5484395521),(25,15,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin@gmal.com',0,0,10550000,'2025-06-02 01:06:23','2025-06-02 01:06:23','Chưa duyệt','QR/Online',0,NULL,5236976208),(26,15,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin@gmal.com',0,0,10550000,'2025-06-02 01:10:27','2025-06-02 01:10:27','Chưa duyệt','QR/Online',0,NULL,2401440916),(27,15,'Nguyễn Minh Thuận','Hà Nội','0362274686','admin@gmal.com',0,0,18540000,'2025-06-02 01:12:48','2025-06-02 01:12:48','Chưa duyệt','QR/Online',0,NULL,2503707084),(28,15,'Nguyễn Minh Thuận','Hà Nội','0362274686','admin@gmal.com',0,0,18540000,'2025-06-02 01:15:09','2025-06-02 01:15:09','Chưa duyệt','QR/Online',0,NULL,8440954086),(29,15,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin@gmal.com',0,0,24335000,'2025-06-02 01:16:44','2025-06-02 01:16:44','Chưa duyệt','QR/Online',0,NULL,4431400910),(30,15,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin@gmal.com',0,0,18835000,'2025-06-02 01:19:27','2025-06-02 01:19:45','Chưa duyệt','QR/Online',1,'2025-06-02 01:19:47',1293730008),(31,15,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin@gmal.com',0,0,14145000,'2025-06-03 13:11:17','2025-06-03 13:11:17','Chưa duyệt','QR/Online',0,NULL,6550648356),(32,15,'Nguyễn Minh Thuận','Hà Nội','0362274686','admin@gmal.com',0,0,44830000,'2025-06-03 13:15:41','2025-06-03 13:15:59','Chưa duyệt','QR/Online',1,'2025-06-03 13:15:58',6033505757),(33,15,'Nguyễn Minh Thuận','Hà Nội','0362274686','admin@gmal.com',0,0,21090000,'2025-06-03 13:53:48','2025-06-03 13:54:09','Chưa duyệt','QR/Online',1,'2025-06-03 13:54:09',3385160070),(34,15,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin@gmal.com',0,0,30070000,'2025-06-04 09:33:16','2025-06-04 09:33:41','Chưa duyệt','QR/Online',1,'2025-06-04 09:33:40',1828038964),(35,15,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin@gmal.com',0,0,51140000,'2025-06-04 09:35:52','2025-06-04 09:35:52','Chưa duyệt','Tiền mặt',0,NULL,NULL),(36,16,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin1@gmal.com',0,0,18540000,'2025-06-04 09:38:37','2025-06-04 09:39:03','Chưa duyệt','QR/Online',1,'2025-06-04 09:39:02',2301503466),(38,16,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin1@gmail.com',0,0,11530000,'2025-06-04 09:47:59','2025-06-04 09:47:59','Chưa duyệt','QR/Online',0,NULL,2820666049),(39,16,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin1@gmail.com',0,0,11530000,'2025-06-04 09:48:15','2025-06-04 09:48:15','Chưa duyệt','QR/Online',0,NULL,4368860923),(40,15,'Nguyễn Minh Thuận','Hà Nội','0362274686','admin@gmal.com',0,0,18540000,'2025-06-04 09:54:40','2025-06-04 09:54:58','Chưa duyệt','QR/Online',1,'2025-06-04 09:54:58',9565061231),(41,16,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin1@gmal.com',0,0,14100000,'2025-06-05 00:10:14','2025-06-05 00:10:54','Chưa duyệt','QR/Online',1,'2025-06-05 00:10:55',3701673331),(42,16,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin@gmal.com',0,0,27820000,'2025-06-05 00:13:49','2025-06-05 00:13:49','Chưa duyệt','QR/Online',0,NULL,2205546349),(43,16,'Nguyễn Minh Thuận','Hà Nội','0123456789','admin1@gmal.com',0,0,27820000,'2025-06-05 00:15:52','2025-06-05 00:15:52','Chưa duyệt','Tiền mặt',0,NULL,NULL);
/*!40000 ALTER TABLE `hoadonbans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoadonnhaps`
--

DROP TABLE IF EXISTS `hoadonnhaps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoadonnhaps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `MaNhaPhanPhoi` int DEFAULT NULL,
  `MaTaiKhoan` int DEFAULT NULL,
  `KieuThanhToan` varchar(255) DEFAULT NULL,
  `TongTien` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `hdn_tk_FK` (`MaTaiKhoan`),
  KEY `hdn_npp_FK` (`MaNhaPhanPhoi`),
  CONSTRAINT `hdn_npp_FK` FOREIGN KEY (`MaNhaPhanPhoi`) REFERENCES `nhaphanphois` (`id`),
  CONSTRAINT `hdn_tk_FK` FOREIGN KEY (`MaTaiKhoan`) REFERENCES `taikhoans` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoadonnhaps`
--

LOCK TABLES `hoadonnhaps` WRITE;
/*!40000 ALTER TABLE `hoadonnhaps` DISABLE KEYS */;
INSERT INTO `hoadonnhaps` VALUES (1,1,1,'Thanh toán bằng tiền mặt',100000000,'2024-06-03 22:21:19','2024-06-03 22:21:19'),(3,2,2,'Thanh toán bằng tiền mặt',16889600,'2024-06-05 15:11:08','2024-06-05 15:11:08'),(4,3,8,'Thanh toán bằng chuyển khoản',200116000,'2024-06-05 15:13:03','2024-06-05 15:13:03'),(5,3,8,'Thanh toán bằng chuyển khoản',6174000,'2024-06-05 15:21:28','2024-06-05 15:21:28'),(6,6,2,'Thanh toán bằng tiền mặt',13059200,'2024-06-06 14:52:37','2024-06-06 14:52:37'),(7,3,1,'Thanh toán bằng chuyển khoản',57239000,'2024-06-06 16:44:26','2024-06-06 16:44:26'),(8,8,1,'Thanh toán bằng tiền mặt',57239000,'2024-06-07 17:03:47','2024-06-07 17:03:47'),(9,14,1,'Thanh toán bằng tiền mặt',1501500,'2024-06-08 14:29:09','2024-06-08 14:29:09'),(10,1,15,'Thanh toán bằng chuyển khoản',7000000,'2025-05-10 15:32:22','2025-05-10 15:32:22'),(11,1,15,'Thanh toán bằng tiền mặt',7000000,'2025-05-10 16:10:14','2025-05-10 16:10:14');
/*!40000 ALTER TABLE `hoadonnhaps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khachhangs`
--

DROP TABLE IF EXISTS `khachhangs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khachhangs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `MaTaiKhoan` int DEFAULT NULL,
  `TenKH` varchar(255) DEFAULT NULL,
  `DiaChi` varchar(255) DEFAULT NULL,
  `SoDienThoai` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `kh_tk_FK` (`MaTaiKhoan`),
  CONSTRAINT `kh_tk_FK` FOREIGN KEY (`MaTaiKhoan`) REFERENCES `taikhoans` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khachhangs`
--

LOCK TABLES `khachhangs` WRITE;
/*!40000 ALTER TABLE `khachhangs` DISABLE KEYS */;
INSERT INTO `khachhangs` VALUES (1,1,'Nguyễn Minh Thuận','Hưng Yên','1111111111','thuan@gmail.com','2024-03-28 12:57:01','2024-03-28 12:57:01'),(2,2,'Nguyễn Quốc Thái','Hưng Yên','1111111112','thai@gmail.com','2024-03-28 12:57:01','2024-03-28 12:57:01'),(3,3,'Đỗ Tiến Tài','Hà Nội','1111111113','tai@gmail.com','2024-03-28 12:57:01','2024-03-28 12:57:01'),(4,4,'Nguyễn Văn Khoa','Đà Nẵng','1111111114','khoa@gmail.com','2024-03-28 12:57:01','2024-03-28 12:57:01'),(5,15,'Quản Trị Viên','Hà Nội','1111111115','admin@gmail.com','2024-03-28 12:57:01','2024-03-28 12:57:01');
/*!40000 ALTER TABLE `khachhangs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loaisanphams`
--

DROP TABLE IF EXISTS `loaisanphams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loaisanphams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `TenLoaiSanPham` varchar(255) DEFAULT NULL,
  `NoiDung` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loaisanphams`
--

LOCK TABLES `loaisanphams` WRITE;
/*!40000 ALTER TABLE `loaisanphams` DISABLE KEYS */;
INSERT INTO `loaisanphams` VALUES (1,'Đèn chùm','Đèn chùm','2024-03-28 12:57:15','2024-05-21 09:40:11'),(2,'Đèn mâm ốp trần','Đèn mâm ốp trần','2024-03-28 12:57:15','2024-03-28 12:57:15'),(3,'Đèn thả','Đèn thả','2024-03-28 12:57:15','2024-03-28 13:12:10'),(4,'Đèn tường','Đèn tường','2024-03-28 12:57:15','2024-03-28 12:57:15'),(5,'Đèn chuyên dụng','Đèn chuyên dụng','2024-03-28 12:57:15','2024-03-28 12:57:15'),(6,'Đèn soi tranh - gương','Đèn soi tranh','2024-03-28 12:57:15','2024-03-28 12:57:15'),(7,'Đèn downlight Led','Đèn led','2024-03-28 12:57:15','2024-03-28 12:57:15'),(8,'Đèn ngoại thất','Đèn ngoại thất','2024-03-28 12:57:15','2024-03-28 12:57:15'),(9,'Đèn năng lượng mặt trời','Đèn năng lượng mặt trời','2024-03-28 12:57:15','2024-03-28 12:57:15'),(10,'Bóng đèn và phụ kiện','Bóng đè và phụ kiện','2024-03-28 12:57:15','2024-03-28 12:57:15'),(11,'Đèn trưng bày thanh lý','Đèn trưng bày thanh lý','2024-03-28 12:57:15','2024-05-17 12:25:17');
/*!40000 ALTER TABLE `loaisanphams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loaitaikhoans`
--

DROP TABLE IF EXISTS `loaitaikhoans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loaitaikhoans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `TenLoaiTK` varchar(255) DEFAULT NULL,
  `MoTa` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loaitaikhoans`
--

LOCK TABLES `loaitaikhoans` WRITE;
/*!40000 ALTER TABLE `loaitaikhoans` DISABLE KEYS */;
INSERT INTO `loaitaikhoans` VALUES (1,'Admin',NULL,'2024-03-28 12:57:25','2024-03-28 12:57:25'),(2,'Quản lý',NULL,'2024-03-28 12:57:25','2024-03-28 12:57:25'),(3,'Khách hàng',NULL,'2024-03-28 12:57:25','2024-03-28 12:57:25');
/*!40000 ALTER TABLE `loaitaikhoans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhaphanphois`
--

DROP TABLE IF EXISTS `nhaphanphois`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhaphanphois` (
  `id` int NOT NULL AUTO_INCREMENT,
  `TenNhaPhanPhoi` varchar(255) DEFAULT NULL,
  `DiaChi` varchar(255) DEFAULT NULL,
  `SoDienThoai` varchar(255) DEFAULT NULL,
  `MoTa` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhaphanphois`
--

LOCK TABLES `nhaphanphois` WRITE;
/*!40000 ALTER TABLE `nhaphanphois` DISABLE KEYS */;
INSERT INTO `nhaphanphois` VALUES (1,'ĐÈN TRANG TRÍ HÒA BÌNH 2','121 Đường 3/2, TP Cần Thơ','0909999556','a','2024-03-28 12:57:42','2024-03-28 12:57:42'),(2,'Đèn Led Thiên Minh - Công Ty TNHH Sản Xuất Thương Mại Và Xây Dựng Thiên Minh','Số 75A Đường số 17, Phường Hiệp Bình Chánh, TpThủ Đức, Thành phố Hồ Chí Minh (TPHCM)','2222222221','a','2024-03-28 12:57:42','2024-03-28 12:57:42'),(3,'Đèn Tâm Anh - Công Ty Cổ Phần Nội Thất Tâm Anh','Số 5, Ngõ 69 Bùi Huy Bích, P. Hoàng Liệt, Q. Hoàng Mai, TP Hà Nội (TPHN)','2222222222','a','2024-03-28 12:57:42','2024-03-28 12:57:42'),(4,'Công Ty TNHH Hoàng Nam Long','1106 Đường Tự Lập, Q. Tân Bình, Tp. Hồ Chí Minh (TPHCM)','2222222223','a','2024-03-28 12:57:42','2024-03-28 12:57:42'),(5,'Công Ty Cổ Phần Đầu Tư Sản Xuất Xây Dựng THương Mại Xuất Nhập Khẩu Thái Bình Dương',' 208 Quang Trung, Quận Hà Đông, TP Hà Nội (TPHN)','2222222224','a','2024-03-28 12:57:42','2024-03-28 12:57:42'),(6,'Quạt trần Klasse - Công Ty TNHH Klasse Việt Nam','188 Quang Trung, Quận Hà Đông, Tp Hà Nội (TPHN)','2222222225','a','2024-03-28 12:57:42','2024-03-28 12:57:42'),(7,'Công Ty TNHH Tin Học Phan Anh Huy','86/3B Ông Ích Khiêm, Phường 5, Quận 11, Tp. Hồ Chí Minh (TPHCM)','2222222226','a','2024-03-28 12:57:42','2024-03-28 12:57:42'),(8,'Công Ty TNHH Sản Xuất Thương Mại Và Xây Dựng Quang Thông','11/25/7 Tân Thới Hiệp 8, Khu Phố 3A, P. Tân Thới Hiệp, Quận 12, TP. Hồ Chí Minh (TPHCM)','2222222227','a','2024-03-28 12:57:42','2024-03-28 12:57:42'),(9,'Công Ty TNHH Xây Dựng Thương Mại Xuất Nhập Khẩu Thiên Ngân','R46, Đường Số 15, P. Tân Thới Nhất, Quận 12, Tp. Hồ Chí Minh (TPHCM)','2222222228','a','2024-03-28 12:57:42','2024-03-28 12:57:42'),(10,'Công Ty Cổ Phần Thương Mại Và Thiết Bị TK Lighting','Số 10, Ngõ 1043, Đường Giải Phóng, Q. Hoàng Mai, TP Hà Nội (TPHN)','2222222229','a','2024-03-28 12:57:42','2024-03-28 12:57:42'),(11,'Công Ty TNHH Thiết Bị Điện Và Chiếu Sáng Hiệp Phú Hưng','Phòng 408B -A5, Ngõ 109 Trường Chinh, Phường Phương Liệt, Quận Thanh Xuân, TP Hà Nội (TPHN)','2222222230','a','2024-03-28 12:57:42','2024-03-28 12:57:42'),(12,'Công Ty TNHH Quang Điện Quang','194 Phan Đăng Lưu, Tổ Phú Hòa, TP. Huế, Tỉnh Thừa Thiên-Huế','2222222231','a','2024-03-28 12:57:42','2024-03-28 12:57:42'),(13,'Công Ty Cổ Phần Xây Dựng và Thương Mại An Phước','Số 469 Hoàng Quốc Việt, Q. Bắc Từ Liêm, TP Hà Nội (TPHN)','2222222232','a','2024-03-28 12:57:42','2024-03-28 12:57:42'),(14,'Công Ty TNHH MTV Thiết Bị Điện Đại Lợi','142 Quốc Lộ 1K, Khu Phố 1, P. Linh Xuân, Q. Thủ Đức, Tp. Hồ Chí Minh (TPHCM)','2222222233','a','2024-03-28 12:57:42','2024-03-28 12:57:42'),(15,'Công Ty TNHH Thương Mại Thiết Bị Điện Và Chiếu Sáng Hoàng Phát','36 Đường 61, Phường Phước Long B, Quận 9, Thành Phố Hồ Chí Minh (TPHCM)','2222222234','a','2024-03-28 12:57:42','2024-03-28 12:57:42'),(16,'Công Ty TNHH One Light Việt Nam','Ngõ 192 Lê Trọng Tấn, Quận Thanh Xuân, Tp.Hà Nội (TPHN)','2222222235','a','2024-03-28 12:57:42','2024-03-28 12:57:42'),(17,'Công Ty TNHH Thương Mại Dịch Vụ Doanh Tín','379 Nguyễn Sơn, P. Phú Thọ Hòa, Q. Tân Phú, Tp. Hồ Chí Minh (TPHCM)','2222222236','a','2024-03-28 12:57:42','2024-03-28 12:57:42'),(18,'Công Ty Cổ Phần Đầu Tư Xây Dựng Và Thương Mại Gia Hưng','Số 34 Nguyễn Khuyến, P. Văn Quán, Q. Hà Đông, TP Hà Nội (TPHN)','2222222237','a','2024-03-28 12:57:42','2024-03-28 12:57:42'),(19,'Công Ty Sơn Tĩnh Điện Việt Thái','Khu Công Nghiệp Dốc Sặt, Phường Đông Ngàn, Huyện Từ Sơn, Thành Phố Bắc Ninh','2222222237','a','2024-03-28 12:57:42','2024-03-28 12:57:42'),(20,'Công Ty TNHH Khu Mua Sắm Đệ Nhất Phan Khang','431A Hoàng Văn Thụ, Phường 4, Q. Tân Bình, TP. Hồ Chí Minh (TPHCM)','2222222237','a','2024-03-28 12:57:42','2024-03-28 12:57:42');
/*!40000 ALTER TABLE `nhaphanphois` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanphams`
--

DROP TABLE IF EXISTS `sanphams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanphams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `MaLoaiSanPham` int DEFAULT NULL,
  `TenSanPham` varchar(255) DEFAULT NULL,
  `AnhDaiDien` varchar(255) DEFAULT NULL,
  `Gia` int DEFAULT NULL,
  `GiaGiam` int DEFAULT NULL,
  `SoLuong` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sp_lsp_id_FK` (`MaLoaiSanPham`),
  CONSTRAINT `sp_lsp_id_FK` FOREIGN KEY (`MaLoaiSanPham`) REFERENCES `loaisanphams` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=261 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanphams`
--

LOCK TABLES `sanphams` WRITE;
/*!40000 ALTER TABLE `sanphams` DISABLE KEYS */;
INSERT INTO `sanphams` VALUES (170,1,'Đèn chùm hiện đại trang trí phòng khách cao cấp D900mm DR-NC5613/8+4','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160320/ecommerce_decorative_lights/lskp7gxmhhphj3yyjwcp.jpg\"]',12580000,8177000,1648,'2024-03-28 12:57:53','2025-05-25 15:05:21'),(171,1,'Đèn Chùm Sát Trần Thân Sơn Đen Có 3 Chế Độ Ánh Sáng D950mm DR-NC02/10','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160314/ecommerce_decorative_lights/a66cyepxq7i6wbimhu7v.jpg\"]',5960000,3874000,207,'2024-03-28 12:57:53','2025-05-25 15:05:16'),(172,1,'Đèn Chùm Thả Trần Phòng Khách Có Hiệu Ứng Ánh Sáng D1300mm DR-NC692','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160839/ecommerce_decorative_lights/lw7htvrisl1gyfeqchw6.jpg\"]',9280000,6032000,824,'2024-03-28 12:57:53','2025-05-25 15:14:01'),(173,1,'Quạt Trần Đèn Chùm Phòng Khách Tân Cổ Điển, 5 Cánh Bằng Gỗ DR-Q2490','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160302/ecommerce_decorative_lights/qv1arw7g2ldiiduynany.jpg\"]',5850000,3803000,207,'2024-03-28 12:57:53','2025-05-25 15:05:03'),(174,1,'Đèn Chùm Pha Lê Thả Trần Phòng Khách 12 Tay Nến D1200mm HP-CFL3524','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160297/ecommerce_decorative_lights/fm8xnqlheodfxy5rzc77.jpg\"]',46600000,32620000,206,'2024-03-28 12:57:53','2025-05-25 15:04:58'),(175,1,'Đèn Chùm Phòng Khách Sát Trần Hiệu Ứng Ánh Sáng D1100mm PH-TH8239','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160288/ecommerce_decorative_lights/q7peyatdhotavk2rc5oq.jpg\"]',4540000,3178000,412,'2024-03-28 12:57:53','2025-05-25 15:04:49'),(176,1,'Quạt Trần Có Đèn Led 6 Cánh Nhựa ABS Giả Vân Gỗ Cao Cấp PH-QVifa64','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160281/ecommerce_decorative_lights/cdk0qm5vd6fsf4keovma.jpg\"]',6990000,4893000,206,'2024-03-28 12:57:53','2025-05-25 15:04:42'),(177,1,'Đèn Chùm Cổ Điển Phong Cách Châu Âu 15 Tay Chao Vải D1040mm DC-9088T15','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160276/ecommerce_decorative_lights/dnoopbtozt40mnk7tsdw.jpg\"]',12500000,8750000,206,'2024-03-28 12:57:53','2025-05-25 15:04:37'),(178,2,'Đèn Ốp Trần Hiệu Ứng Ánh Sáng Hình Ngôi Sao Mặt Trăng D1100mm DR-NC853','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160270/ecommerce_decorative_lights/xz1rv2bycrahhixzvpkv.jpg\"]',9530000,6195000,206,'2024-03-28 21:14:07','2025-05-25 15:04:31'),(179,2,'Đèn Ốp Trần Led 3 Chế Độ Ánh Sáng Trang Trí Phòng Ngủ D500mm DR-C2317','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160259/ecommerce_decorative_lights/fxmpwdiolmphmzezunad.jpg\"]',3300000,2145000,206,'2024-03-28 21:14:07','2025-05-25 15:04:20'),(180,2,'Đèn Ốp Trần Led 3 Màu Trang Trí Phòng Ngủ Hiện Đại 500x500mm EC-ML39','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160241/ecommerce_decorative_lights/aplhssywosjd5z71ahoe.jpg\"]',3100000,2015000,206,'2024-03-28 21:14:07','2025-05-25 15:04:02'),(181,2,'Đèn Ốp Trần Trang Trí Phòng Khách Hiện Đại Cao Cấp 1100x700mm EC-ML49','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160234/ecommerce_decorative_lights/aicaada63iwict82smv2.jpg\"]',7700000,5005000,206,'2024-03-28 21:14:07','2025-05-25 15:03:55'),(182,2,'Đèn Chùm Ốp Trần Led 3 Chế Độ Màu Trang Trí Hiện Đại D870mm SE-CLA748','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160227/ecommerce_decorative_lights/q9dgtwjnxgp33fmtduth.jpg\"]',4690000,3049000,206,'2024-03-28 21:14:07','2025-05-25 15:03:49'),(183,2,'Đèn Mâm Pha Lê Ốp Trần Tròn Trang Trí Gắn Phòng Khách D800mm DR-C1035B','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160193/ecommerce_decorative_lights/p3ekl8g7koeeqxy18s08.jpg\"]',9300000,6045000,206,'2024-03-28 21:14:07','2025-05-25 15:03:14'),(184,2,'Đèn Chùm Ốp Sát Trần 8 Bóng Trang Trí Hiện Đại 950x950mm DC-TTK112T4+4','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160184/ecommerce_decorative_lights/cpwxmbqlafv9dwh8cd9q.jpg\"]',4845000,3392000,206,'2024-03-28 21:14:07','2025-05-25 15:03:05'),(185,2,'Đèn Mâm Ốp Trần Led Hiện Đại 8 Cánh Đính Hạt Pha Lê D800mm PH-MO9052','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160170/ecommerce_decorative_lights/fvf5hqmodcvd4sz9nxga.jpg\"]',6990000,4893000,206,'2024-03-28 21:14:07','2025-05-25 15:02:52'),(186,3,'Đèn Thả Pha Lê Sang Trọng Gắn Phòng Khách, Sảnh Khách Sạn DR-NB2011B','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160137/ecommerce_decorative_lights/wuwnja2mn1o88pegtoak.jpg\"]',25970000,16881000,206,'2024-03-28 21:14:07','2025-05-25 15:02:19'),(187,3,'Đèn Thả Thông Tầng Cầu Thang Hình Con Ong Làm Bằng Mica DR-NB2198/6','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160128/ecommerce_decorative_lights/yd8wiphxmbgzznhledsj.jpg\"]',4360000,2834000,206,'2024-03-28 21:14:07','2025-05-25 15:02:09'),(188,3,'Đèn Chùm Pha Lê Thả Trần Bàn Ăn, Phòng Khách Đẹp L850mm EC-CFL133','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160119/ecommerce_decorative_lights/ovw2lsq6ubsn0nutvyha.jpg\"]',14500000,9425000,206,'2024-03-28 21:14:07','2025-05-25 15:02:00'),(189,3,'Đèn Thả Trần Phòng Khách Hiện Đại Sang Trọng EC-T48/17','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160107/ecommerce_decorative_lights/tlfsxzuoyke3buhqbhyq.jpg\"]',8350000,5427000,206,'2024-03-28 21:14:07','2025-05-25 15:01:49'),(190,3,'Đèn Thả Thông Tầng 15 Con Bướm Led Treo Cầu Thang H2800mm VA-T9666/15','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160033/ecommerce_decorative_lights/ex8ovznvyrus1h8wfe5f.jpg\"]',12457000,8720000,206,'2024-03-28 21:14:07','2025-05-25 15:00:34'),(191,3,'Đèn Thả Trần Led Hiệu Ứng Trang Trí Bàn Ăn, Phòng Ngủ D200mm SE-TKD799','[\"https://res.cloudinary.com/mt1704/image/upload/v1748160020/ecommerce_decorative_lights/finpo8ceu3mbdfdhbwfe.jpg\"]',1295000,843000,206,'2024-03-28 21:14:07','2025-05-25 15:00:21'),(192,3,'Đèn Thả Pha Lê Phòng Khách Nhỏ, Bàn Ăn DR-B1012','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159951/ecommerce_decorative_lights/otp4hc2usn7ilazhsuk8.jpg\"]',10550000,6858000,206,'2024-03-28 21:14:07','2025-05-25 14:59:13'),(193,3,'Đèn Thả Trần Bàn Ăn Có Đèn Chiếu Điểm HP-TL6535/3','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159945/ecommerce_decorative_lights/qw5c9wqzysggms0vethf.jpg\"]',3990000,2793000,206,'2024-03-28 21:14:07','2025-05-25 14:59:06'),(194,4,'Đèn Treo Tường Phòng Khách Hiện Đại Hình Chim Công Nhìn Phải HP-V9278A','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159929/ecommerce_decorative_lights/pqehhdtkluyum9pdw5vg.jpg\"]',1320000,924000,206,'2024-03-28 21:14:07','2025-05-25 14:58:51'),(195,4,'Đèn Gắn Tường Trang Trí Phòng Khách, Phòng Ngủ Đẹp Hiện Đại DC-VK130T','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159924/ecommerce_decorative_lights/komlgl9hdvzcgidkil7g.jpg\"]',1910000,1337000,206,'2024-03-28 21:14:07','2025-05-25 14:58:45'),(196,4,'Đèn Gắn Tường Pha Lê Trang Trí Phòng Ngủ Hiện Đại Sang Trọng EC-V700','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159918/ecommerce_decorative_lights/cxfib7nesqht1elgtqmt.jpg\"]',2980000,1937000,206,'2024-03-28 21:14:07','2025-05-25 14:58:39'),(197,4,'Đèn Tường Pha Lê Trang Trí Phòng Khách Hiện Đại Cao Cấp PH-GT451-23','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159904/ecommerce_decorative_lights/wo5xfwbwjkhncgbkxlco.jpg\"]',2540000,1778000,206,'2024-03-28 21:14:07','2025-05-25 14:58:25'),(198,4,'Đèn Tranh Ốp Tường Hình Cá Chép Trang Trí Phòng Ngủ Hiện Đại SE-VLE118','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159897/ecommerce_decorative_lights/gqebvr5ub3kkuisnqocb.jpg\"]',1495000,972000,206,'2024-03-28 21:14:07','2025-05-25 14:58:19'),(199,4,'Đèn Ốp Tường Pha Lê Trang Trí Phòng Khách Hiện Đại Cao Cấp SE-VLE221','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159889/ecommerce_decorative_lights/nse1h6xx3h1fweobxqgm.jpg\"]',2610000,1697000,206,'2024-03-28 21:14:07','2025-05-25 14:58:11'),(200,4,'Đèn Tường Đồng H430mm HP-VD6202','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159881/ecommerce_decorative_lights/hx3kgfdqwxjymhduohwp.jpg\"]',3700000,2590000,206,'2024-03-28 21:14:07','2025-05-25 14:58:02'),(201,4,'Đèn Gắn Tường Hiện Đại Trang Trí Trong Nhà Hình Con Bướm HP-VL4656','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159875/ecommerce_decorative_lights/zkturyvbrnftesj9cqn1.jpg\"]',730000,511000,206,'2024-03-28 21:14:07','2025-05-25 14:57:57'),(202,5,'Đèn Pha Led Bảng Hiệu Ngoài Trời Chống Nước Cao Cấp IP65 70W HP-FA46','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159866/ecommerce_decorative_lights/oyzsmxwvse65hkojpepd.jpg\"]',1950000,1365000,206,'2024-03-28 21:14:07','2025-05-25 14:57:47'),(203,5,'Đèn Để Bàn Trang Trí Phòng Ngủ Và Khách Sạn Đẹp Sang Trọng HP-DB1919','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159857/ecommerce_decorative_lights/tebo067lrq6jazp7aevk.jpg\"]',1100000,770000,206,'2024-03-28 21:14:07','2025-05-25 14:57:38'),(204,5,'Đèn Led Rọi Ray 10W Chiếu Shop Quần Áo, Sản Phẩm Trưng Bày HP-SL211','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159852/ecommerce_decorative_lights/fdyw1p3ms7gz3ejyf3o2.jpg\"]',316000,221000,206,'2024-03-28 21:14:07','2025-05-25 14:57:33'),(205,5,'Đèn Cây Đứng Trang Trí Góc Sofa Phòng Khách, Phòng Ngủ Đẹp DC-DD15','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159846/ecommerce_decorative_lights/dxifgyudt6hswstjpddx.jpg\"]',7765000,5436000,206,'2024-03-28 21:14:07','2025-05-25 14:57:27'),(206,5,'Đèn Cây Đứng Trang Trí Góc Sofa Phòng Khách, Phòng Ngủ DC-DD33T12','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159838/ecommerce_decorative_lights/ntplubyuyghox1sc3bft.jpg\"]',5315000,3721000,206,'2024-03-28 21:14:07','2025-05-25 14:57:20'),(207,5,'Đèn Led Rọi Thanh Ray 7W Làm Nổi Bật Sản Phẩm Shop, Cửa Hàng AN-PR101','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159830/ecommerce_decorative_lights/hjhljhitzxxqj4nzn9qg.jpg\"]',340000,221000,206,'2024-03-28 21:14:07','2025-05-25 14:57:12'),(208,5,'Đèn Đọc Sách Để Bàn Làm Việc, Bàn Học Kiểu Dáng Sang Trọng PH-DB503-19','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159825/ecommerce_decorative_lights/osfaswgun6e52atyykwa.jpg\"]',1700000,1190000,206,'2024-03-28 21:14:07','2025-05-25 14:57:06'),(209,5,'Đèn Bàn Phòng Làm Việc, Bàn Đọc Sách, Bàn Học Sinh Led 6W EC-BL1328','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159806/ecommerce_decorative_lights/flyk6aignux0xirqi7f0.jpg\"]',1350000,878000,206,'2024-03-28 21:14:07','2025-05-25 14:56:48'),(210,6,'Đèn Soi Gương Gắn Tường Sơn Đen 3 Chế Độ Chiếu Ánh Sáng DC-RT5834T600','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159784/ecommerce_decorative_lights/rod06ucut9fvwi7kfxpi.jpg\"]',1375000,963000,206,'2024-03-28 21:14:07','2025-05-25 14:56:25'),(211,6,'Đèn Soi Tranh 1 Bóng HP-SG2214/1','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159776/ecommerce_decorative_lights/mqck00c44zbqwdnlzaxu.jpg\"]',700000,490000,206,'2024-03-28 21:14:07','2025-05-25 14:56:17'),(212,6,'Đèn Soi Tranh 2 Bóng HP-SG2225/2','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159769/ecommerce_decorative_lights/hqmktdyebzrnmiusckz2.jpg\"]',1260000,882000,206,'2024-03-28 21:14:07','2025-05-25 14:56:11'),(213,6,'Đèn Soi Tranh 3 Bóng HP-SG2201/3','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159740/ecommerce_decorative_lights/dbv5lg0mwttlnflzi2bo.jpg\"]',1460000,1022000,206,'2024-03-28 21:14:07','2025-05-25 14:55:48'),(214,6,'Đèn Soi Gương Lavabo Nhà Tắm DC-RT5677/58NAU','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159715/ecommerce_decorative_lights/jpes2bemgha2huikrpck.jpg\"]',1250000,875000,206,'2024-03-28 21:14:07','2025-05-25 14:55:17'),(215,6,'Đèn Rọi Gương Nhà Tắm Rẻ, Đẹp DC-RT5543/58','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159727/ecommerce_decorative_lights/newuyvdbdbagi8uc1z5d.jpg\"]',1625000,1138000,206,'2024-03-28 21:14:07','2025-05-25 14:55:29'),(216,6,'Đèn Rọi Gương, Soi Tranh Giá Rẻ DC-RT5533/42NAU','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159693/ecommerce_decorative_lights/ks1ixp7qupieeysze4zh.jpg\"]',875000,613000,205,'2024-03-28 21:14:07','2025-05-25 14:54:55'),(217,6,'Đèn Rọi Gương Led L550mm PH-RG773','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159684/ecommerce_decorative_lights/h2lyo986emfod1jh9jah.jpg\"]',1280000,896000,206,'2024-03-28 21:14:07','2025-05-25 14:54:45'),(218,7,'Đèn Led Âm Trần 7W, Ánh Sáng 3 Chế Độ Màu, Khoét Lỗ D105mm HP-AKCOB07','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159673/ecommerce_decorative_lights/bykpl1xrjivwhbdevuap.jpg\"]',194000,136000,206,'2024-03-28 21:14:07','2025-05-25 14:54:35'),(219,7,'Đèn Led Âm Trần Downlight 7W, Ánh Sáng 3 Màu, Khoét Lỗ D85mm HP-AT110','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159664/ecommerce_decorative_lights/dt6toftr8tgo36yhe3nz.jpg\"]',190000,133000,206,'2024-03-28 21:14:07','2025-05-25 14:54:26'),(220,7,'Đèn Led Âm Trần Downlight 9W, Ánh Sáng 3 Màu, Khoét Lỗ D130mm HP-AT80','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159639/ecommerce_decorative_lights/kqix3js2ofjt44n2u7zq.jpg\"]',240000,168000,206,'2024-03-28 21:14:07','2025-05-25 14:54:00'),(221,7,'Đèn Led Âm Trần Downlight 12W, Ánh Sáng 3 Màu, Khoét Lỗ D150mm HP-AT85','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159625/ecommerce_decorative_lights/hz5qhyxyemm0t3inovl1.jpg\"]',255000,179000,206,'2024-03-28 21:14:07','2025-05-25 14:53:46'),(222,7,'Đèn Led Gắn Nổi 12W Góc Xoay 90 Độ, Ánh Sáng Đơn D100xH105mm EC-LN71','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159615/ecommerce_decorative_lights/fw5etntxwfac7b6iss4l.jpg\"]',650000,423000,206,'2024-03-28 21:14:07','2025-05-25 14:53:36'),(223,7,'Đèn Led Gắn Nổi 10W Chip Led USA, Trắng - Vàng, D105xH100mm HP-LN27','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159608/ecommerce_decorative_lights/ngdufoofukmeufmubw3e.jpg\"]',830000,581000,206,'2024-03-28 21:14:07','2025-05-25 14:53:29'),(224,7,'Máng Led Dẹp 36W 1.2m HP-MANGDEP/36W','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159598/ecommerce_decorative_lights/oycz2yjlmiued4guzqnd.jpg\"]',310000,217000,206,'2024-03-28 21:14:07','2025-05-25 14:53:19'),(225,7,'Máng Đèn Tuýp Đơn T8 1m2 HP-MANGT8','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159587/ecommerce_decorative_lights/ntavmhkcmsnxgfpquqq6.jpg\"]',62000,43000,206,'2024-03-28 21:14:07','2025-05-25 14:53:08'),(226,8,'Đèn Tường Ngoài Trời Trang Trí Hàng Rào, Trụ Cổng Cao Cấp AN-VC1290A','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159558/ecommerce_decorative_lights/yzjindnplsxatrksi8pt.jpg\"]',1107000,720000,206,'2024-03-28 21:14:07','2025-05-25 14:52:40'),(227,8,'Đèn Hắt Tường Led 8 Đầu Dùng Cho Trong Nhà Và Mái Hiên IP54 PH-VNT6013','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159546/ecommerce_decorative_lights/dnwpddbuwynynclvsnj7.jpg\"]',740000,518000,206,'2024-03-28 21:14:07','2025-05-25 14:52:28'),(228,8,'Đèn Hắt Tường Led 2 Đầu Sử Dụng Trong Nhà Và Ngoài Trời IP65 EC-CN305','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159538/ecommerce_decorative_lights/zdp1ncbuihhjki0bbnpg.jpg\"]',880000,572000,206,'2024-03-28 21:14:07','2025-05-25 14:52:20'),(229,8,'Đèn Trụ Cổng Gắn Sân Vườn Ngoài Trời Phong Cách Hiện Đại HP-LG0857','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159529/ecommerce_decorative_lights/nzfgwlm0t11jvb82kcsf.jpg\"]',1250000,875000,206,'2024-03-28 21:14:07','2025-05-25 14:52:10'),(230,8,'Đèn Trụ Đồng H400mm PH-TD24/400','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159515/ecommerce_decorative_lights/ty32urbrpjrgtgdbfqvf.jpg\"]',6990000,4893000,206,'2024-03-28 21:14:07','2025-05-25 14:51:57'),(231,8,'Đèn Trụ Sân Vườn H270=>590mm PH-SVNT06','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159061/ecommerce_decorative_lights/d52xa827gswhosuucbbk.jpg\"]',1130000,791000,206,'2024-03-28 21:14:07','2025-05-25 14:44:23'),(232,8,'Đèn Trụ Sân Vườn 2 Bóng Chiếu Cảnh Quan Ngoài Trời H4570mm TT-3516/2','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159037/ecommerce_decorative_lights/ggmunzg1zzjizqkpl5hf.jpg\"]',33943000,23760000,206,'2024-03-28 21:14:07','2025-05-25 14:44:02'),(233,8,'Đèn Gắn Tường Đồng Ngoài Trời Nguyên Chất Chống Nước H770mm DR-NV0621','[\"https://res.cloudinary.com/mt1704/image/upload/v1748159011/ecommerce_decorative_lights/hdzwyvp1lywcqmmopeyq.jpg\"]',7360000,4784000,206,'2024-03-28 21:14:07','2025-05-25 14:43:32'),(234,9,'Đèn Trụ Sân Vườn Năng Lượng Mặt Trời 300W EC-TRU157','[\"https://res.cloudinary.com/mt1704/image/upload/v1748158981/ecommerce_decorative_lights/sjvvty2wcrn2s4brmdaq.jpg\"]',9600000,6240000,206,'2024-03-28 21:14:07','2025-05-25 14:43:02'),(235,9,'Đèn Trụ Năng Lượng Mặt Trời H310mm HP-TĐ2109','[\"https://res.cloudinary.com/mt1704/image/upload/v1748158989/ecommerce_decorative_lights/juoyhh4xgno2ldq779ew.jpg\"]',6500000,4550000,206,'2024-03-28 21:14:07','2025-05-25 14:43:10'),(236,9,'Đèn Trụ Năng Lượng Mặt Trời Ø145mm EC-Solar228','[\"https://res.cloudinary.com/mt1704/image/upload/v1748158968/ecommerce_decorative_lights/bqcmszyrhzm0we5tzr1q.jpg\"]',3100000,2015000,206,'2024-03-28 21:14:07','2025-05-25 14:43:14'),(237,9,'Đèn Trụ Năng Lượng Mặt Trời EC-Solar36','./../../assets/img/Product/dennangluong4.jpg',2530000,1645000,206,'2024-03-28 21:14:07','2024-04-05 08:33:59'),(238,9,'Đèn Treo Tường Năng Lượng Mặt Trời Gắn Thêm Bóng Điện H450mm HP-VNL01','[\"https://res.cloudinary.com/mt1704/image/upload/v1748158921/ecommerce_decorative_lights/upqccq9ptr1ibm7mfbow.jpg\"]',2500000,1750000,206,'2024-03-28 21:14:07','2025-05-25 14:42:02'),(239,9,'Đèn Tường Năng Lượng Mặt Trời Gắn Thêm Bóng Điện H500mm PH-TD21-20VÀNG','[\"https://res.cloudinary.com/mt1704/image/upload/v1748158897/ecommerce_decorative_lights/c7kbe7e2mltri1emxelc.jpg\"]',1850000,1295000,206,'2024-03-28 21:14:07','2025-05-25 14:41:38'),(240,9,'Đèn Tường Năng Lượng Mặt Trời Gắn Thêm Bóng Điện H500mm PH-TD22-20ĐEN','[\"https://res.cloudinary.com/mt1704/image/upload/v1748158741/ecommerce_decorative_lights/liufpshgzzeqlx6wyxed.jpg\"]',1850000,1295000,206,'2024-03-28 21:14:07','2025-05-25 14:39:05'),(241,9,'Đèn Trụ Cổng Năng Lượng Mặt Trời 3 Kích Thước D150-210-260mm PH-TD07','./../../assets/img/Product/dennangluong8.jpg',1710000,1197000,206,'2024-03-28 21:14:07','2024-04-05 08:33:59'),(242,10,'Dây Thả Dù Màu Vàng Đui Đèn Edison E27 Có Đế Gắn Trần Dài 1m2','[\"https://res.cloudinary.com/mt1704/image/upload/v1748158614/ecommerce_decorative_lights/zgls5un5cssa5jggud4e.jpg\"]',135000,125000,206,'2024-03-28 21:14:07','2025-05-25 14:36:55'),(243,10,'Bóng Đèn Led Bông Edison Hình Bí Ngô Lớn VA-G150-BĐ','[\"https://res.cloudinary.com/mt1704/image/upload/v1748158338/ecommerce_decorative_lights/g8bnbyjkfqx0nfvxenzy.jpg\"]',219000,200000,206,'2024-03-28 21:14:07','2025-05-25 14:32:20'),(244,10,'Dây Thả Đui Đèn E27 Có Đế Gắn Trần Dây Dài 1m2','[\"https://res.cloudinary.com/mt1704/image/upload/v1748158332/ecommerce_decorative_lights/ryjsv5jmet5n6z2f5gnp.jpg\"]',95000,65000,206,'2024-03-28 21:14:07','2025-05-25 14:32:13'),(245,10,'Dây Thả Dù Màu Vàng Cuộn 100m','[\"https://res.cloudinary.com/mt1704/image/upload/v1748158326/ecommerce_decorative_lights/feonglz7g5gkbgfjpri0.jpg\"]',1750000,1550000,206,'2024-03-28 21:14:07','2025-05-25 14:32:08'),(246,10,'Bóng Bắp LED 6+6W 3 Chế Độ Ánh Sáng','[\"https://res.cloudinary.com/mt1704/image/upload/v1748158320/ecommerce_decorative_lights/vpxwjr0zl2l7zgdmzwio.jpg\"]',50000,40000,206,'2024-03-28 21:14:07','2025-05-25 14:32:02'),(247,10,'Bóng Đèn LED Edison G45 Công Suất 4w','[\"https://res.cloudinary.com/mt1704/image/upload/v1748158311/ecommerce_decorative_lights/tqulakrbxqnetblsz2kv.jpg\"]',45000,35000,206,'2024-03-28 21:14:07','2025-05-25 14:31:52'),(248,10,'Bóng Đèn LED Edison G125/6w PH-B256','[\"https://res.cloudinary.com/mt1704/image/upload/v1748158305/ecommerce_decorative_lights/p4eaaorbs63oepw1q4gj.jpg\"]',79000,0,206,'2024-03-28 21:14:07','2025-05-25 14:31:46'),(249,10,'Bóng Đèn Trụ LED 80W IC Tốt Tải Nhiệt Nhôm HP-BN12','[\"https://res.cloudinary.com/mt1704/image/upload/v1748158298/ecommerce_decorative_lights/fqvmyxmb9mnjtp2qgeoy.jpg\"]',325000,315000,206,'2024-03-28 21:14:07','2025-05-25 14:31:40'),(250,11,'Đèn Chùm Led Phòng Khách, Chung Cư 12 Tay D680mm EC-C2097/12 - Trưng Bày','[\"https://res.cloudinary.com/mt1704/image/upload/v1748158263/ecommerce_decorative_lights/b5ynfhjksvlsydesvqrp.jpg\"]',13500000,4050000,206,'2024-03-28 21:14:07','2025-05-25 14:31:05'),(251,11,'Đèn Thả Led 3 Vòng Trang Trí Phòng Khách PH-TH8038 - Trưng Bày','[\"https://res.cloudinary.com/mt1704/image/upload/v1748158068/ecommerce_decorative_lights/sos12ih6x3to4j8jiyqt.jpg\"]',5680000,1136000,206,'2024-03-28 21:14:07','2025-05-25 14:27:51'),(252,11,'Đèn Thả Trần Trang Trí Phòng Khách HP-TL6384 - Trưng Bày','[\"https://res.cloudinary.com/mt1704/image/upload/v1748158048/ecommerce_decorative_lights/t3mzmnhlfufqqoic1um8.jpg\"]',3300000,660000,206,'2024-03-28 21:14:07','2025-05-25 14:27:30'),(253,11,'Đèn Chùm Thả Trần Phòng Khách Sang Trọng DC-TTK116T6+6V - Trưng Bày','[\"https://res.cloudinary.com/mt1704/image/upload/v1748158039/ecommerce_decorative_lights/gzgh3zlawkyytclkg1yk.jpg\"]',4857000,971000,206,'2024-03-28 21:14:07','2025-05-25 14:27:21'),(254,11,'Đèn Chùm Led Phòng Khách Chung Cư, Nhà Phố Đẹp 8 Tay D850mm DR-C9268/8 - Trưng Bày','[\"https://res.cloudinary.com/mt1704/image/upload/v1748157890/ecommerce_decorative_lights/qoqiienw4h9aev5mbzo2.jpg\"]',4450000,890000,206,'2024-03-28 21:14:07','2025-05-25 14:24:51'),(255,11,'Đèn Chùm Phòng Khách Cổ Điển HP-CN622/8 - Trưng Bày','[\"https://res.cloudinary.com/mt1704/image/upload/v1748157873/ecommerce_decorative_lights/i28s4z65ydnckzpcfagf.jpg\"]',11200000,2240000,206,'2024-03-28 21:14:07','2025-05-25 14:24:34'),(256,11,'Đèn Thả Pha Lê Ø560mm AN22-CPL2009 - Trưng Bày','[\"https://res.cloudinary.com/mt1704/image/upload/v1748157774/ecommerce_decorative_lights/jq0dg5hhbqqt5qmadq25.jpg\"]',8870000,1774000,206,'2024-03-28 21:14:07','2025-05-25 14:22:56'),(257,11,'Đèn Pha Lê Thả Trần Phòng Khách PH-TH8193 - Trưng Bày','[\"https://res.cloudinary.com/mt1704/image/upload/v1748157761/ecommerce_decorative_lights/arjcg0arqn26nhdkgh9e.jpg\"]',6990000,1398000,206,'2024-03-28 21:14:07','2025-05-25 14:22:43'),(259,10,'Đèn chùm hiện đại trang trí phòng khách cao cấp D900mm DR-NC5613/8+4 V3','[\"https://res.cloudinary.com/mt1704/image/upload/v1748157690/ecommerce_decorative_lights/nyuybbqeyskjzssv9evq.jpg\"]',90000000,8000000,150,'2024-05-19 15:42:59','2025-05-25 14:21:32'),(260,1,'Đèn chùm hiện đại trang trí phòng khách cao cấp D900mm DR-NC5613/8+4 V2','[\"https://res.cloudinary.com/mt1704/image/upload/v1746808869/ecommerce_decorative_lights/cfwcaaf4scttbgvtdwpl.jpg\",\"https://res.cloudinary.com/mt1704/image/upload/v1746809721/ecommerce_decorative_lights/ykyfhjh3pml8l3cptsld.jpg\"]',1000000,1000000,1,'2025-05-09 23:41:22','2025-05-10 16:05:21');
/*!40000 ALTER TABLE `sanphams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20240507080408-create-user.js'),('20240511143801-create-tin-tuc.js'),('20240511143807-create-loai-san-pham.js'),('20240511143813-create-san-pham.js'),('20240511143819-create-loai-tai-khoan.js'),('20240511143831-create-nha-phan-phoi.js'),('20240511143837-create-khach-hang.js'),('20240511143842-create-hoa-don-nhap.js'),('20240511143847-create-hoa-don-ban.js'),('20240511143853-create-du-an-thuc-hien.js'),('20240511143858-create-chi-tiet-san-pham.js'),('20240511143903-create-chi-tiet-hoa-don-nhap.js'),('20240511143908-create-chi-tiet-hoa-don-ban.js'),('20240511144810-add-foreign-key-to-chitiethoadonnhaps.js'),('20240511144816-add-foreign-key-to-chitiethoadonbans.js'),('20240511144821-add-foreign-key-to-chitietsanphams.js'),('20240511144826-add-foreign-key-to-hoadonbans.js'),('20240511144832-add-foreign-key-to-hoadonnhaps.js'),('20240511144838-add-foreign-key-to-khachhangs.js'),('20240511144849-add-foreign-key-to-sanphams.js'),('20240514165006-create-tai-khoan.js'),('20240514165019-add-foreign-key-to-taikhoans.js'),('20240526060337-create-cart.js'),('20240526060607-add-foreign-key-to-carts.js'),('20250520173021-create-danh-gia.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taikhoans`
--

DROP TABLE IF EXISTS `taikhoans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taikhoans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `MaLoaiTK` int DEFAULT NULL,
  `TaiKhoan` varchar(255) DEFAULT NULL,
  `MatKhau` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tk_ltk_id_FK` (`MaLoaiTK`),
  CONSTRAINT `tk_ltk_id_FK` FOREIGN KEY (`MaLoaiTK`) REFERENCES `loaitaikhoans` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taikhoans`
--

LOCK TABLES `taikhoans` WRITE;
/*!40000 ALTER TABLE `taikhoans` DISABLE KEYS */;
INSERT INTO `taikhoans` VALUES (1,1,'thuan','12345678','thuan@gmail.com','2024-03-28 12:57:01','2024-03-28 12:57:01'),(2,2,'thai','12345678','thai@gmail.com','2024-03-28 12:57:01','2024-03-28 12:57:01'),(3,3,'tai','12345678','tai@gmail.com','2024-03-28 12:57:01','2024-05-16 22:36:54'),(4,3,'khoa','12345678','khoa@gmail.com','2024-03-28 12:57:01','2024-03-28 12:57:01'),(8,1,'thuan123','123456','thuan123@gmail.com','2024-05-22 14:27:11','2024-05-22 14:27:11'),(9,3,'thuan1','123456','thuan1@gmail.com','2024-05-22 14:37:09','2024-05-22 14:37:09'),(10,3,'thuan2','123456','thuan2@gmail.com','2024-05-22 14:39:22','2024-05-22 14:39:22'),(11,3,'thuan3','123456','thuan3@gmail.com','2024-05-22 14:42:56','2024-05-22 14:42:56'),(12,3,'thuan4','123456','thuan4@gmail.com','2024-05-22 14:46:10','2024-05-22 14:46:10'),(13,3,'thuan5','$2b$10$bBPWrh0hYj91ke7U.5w6Y.e5HB5oaAkDD9DHUyxW3ior39Dp4mz5S','thuan5@gmail.com','2024-05-22 14:56:28','2024-05-22 14:56:28'),(14,3,'user1','$2b$10$Lq1uFvzzULpnlgMv2I064.2FGOh1OC2KMFE9MRuKG3VzKXcYTuKFm','user1@gmail.com','2024-05-26 14:05:05','2024-05-26 14:05:05'),(15,1,'admin','$2b$10$eAp6PaWgjOo82dYJOVyYO.lfT1sAv./lp3G9x/jMs6yotuIlUpbRW','admin@gmal.com','2025-05-07 23:35:39','2025-05-07 23:35:39'),(16,1,'admin1','$2b$10$EytfuTTpz1vjnvjiR97PjeKILaTxr3kjDvZmoCqZ6TVWHViYetJhm','admin1@gmail.com','2025-06-04 09:38:09','2025-06-04 09:38:09');
/*!40000 ALTER TABLE `taikhoans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tintucs`
--

DROP TABLE IF EXISTS `tintucs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tintucs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `TieuDe` varchar(255) DEFAULT NULL,
  `AnhDaiDien` varchar(255) DEFAULT NULL,
  `MoTa` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tintucs`
--

LOCK TABLES `tintucs` WRITE;
/*!40000 ALTER TABLE `tintucs` DISABLE KEYS */;
INSERT INTO `tintucs` VALUES (1,'ĐÈN BÀN ĂN ĐA NĂNG - ĐIỂM NHẤN TINH TẾ, SOI SÁNG BỮA CƠM ẤM CÚNG 1','./../../assets/img/TinTuc/tintuc29.jpg','Đèn bàn ăn đa năng không chỉ là điểm nhấn tinh tế trong không gian phòng ăn, mà còn mang lại ánh sáng chất lượng, soi sáng bữa cơm tạo nên không gian ấm cúng và đầy ấn tượng cho gia đình.','2024-05-09 16:37:26','2024-05-13 23:06:09'),(2,'ĐÈN PHÒNG NGỦ YẾU TỐ QUAN TRỌNG TẠO NÊN KHÔNG GIAN THƯ GIÃN HOÀN HẢO','./../../assets/img/TinTuc/tintuc28.jpg','Đèn phòng ngủ không chỉ là yếu tố quan trọng trong việc tạo nên không gian thư giãn hoàn hảo mà còn là điểm nhấn tinh tế tạo điểm nhấn trong không gian nghỉ ngơi, giúp tạo ra một môi trường thoải mái và độc đáo cho việc nghỉ ngơi.','2024-03-29 08:05:32','2024-03-30 09:39:28'),(3,'ĐÈN BÀN ĂN ĐA NĂNG - ĐIỂM NHẤN TINH TẾ, SOI SÁNG BỮA CƠM ẤM CÚNG','./../../assets/img/TinTuc/tintuc1.jpg','Đèn bàn ăn đa năng: điểm nhấn tinh tế, soi sáng bữa cơm ấm cúng cho gia đình.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(4,'ĐÈN TRANG TRÍ PHÒNG KHÁCH - TẠO ĐIỂM NHẤN ẤN TƯƠI MỚI CHO KHÔNG GIAN','./../../assets/img/TinTuc/tintuc2.jpg','Chọn đèn trang trí phòng khách: điểm nhấn tươi mới, tạo không gian sống đặc biệt hơn.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(5,'BÍ QUYẾT LỰA CHỌN ĐÈN TRANG TRÍ PHÒNG NGỦ ĐÚNG CÁCH','./../../assets/img/TinTuc/tintuc3.jpg','Lựa chọn đèn trang trí phòng ngủ đúng cách: thoải mái, ấm áp và thư giãn.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(6,'THIẾT KẾ ÁNH SÁNG CHO NHÀ BẾP - TẠO KHÔNG GIAN SANG TRỌNG VÀ TIỆN ÍCH','./../../assets/img/TinTuc/tintuc4.jpg','Thiết kế ánh sáng cho nhà bếp: sang trọng, tiện ích và thuận lợi.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(7,'CÁCH PHỐI MÀU ÁNH SÁNG CHO PHÒNG NGỦ - TẠO CẢM GIÁC THƯ GIÃN VÀ ẤM ÁP','./../../assets/img/TinTuc/tintuc5.jpg','Phối màu ánh sáng cho phòng ngủ: thư giãn, ấm áp và thoải mái.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(8,'LỢI ÍCH CỦA ĐÈN LED SO VỚI ĐÈN COMPACT','./../../assets/img/TinTuc/tintuc6.jpg','Đèn LED: tiết kiệm năng lượng, tuổi thọ cao, không gian sáng đẹp.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(9,'BÍ QUYẾT CHỌN ĐÈN TRANG TRÍ PHÒNG KHÁCH PHÙ HỢP VỚI KHÔNG GIAN','./../../assets/img/TinTuc/tintuc7.jpg','Chọn đèn trang trí phòng khách: phù hợp, tôn vẻ đẹp không gian.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(10,'CÁCH BỐ TRÍ ĐÈN TRANG TRÍ CHO PHÒNG NGỦ NHỎ','./../../assets/img/TinTuc/tintuc8.jpg','Bố trí đèn trang trí cho phòng ngủ nhỏ: tối ưu, thoải mái.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(11,'THIẾT KẾ ÁNH SÁNG CHO NHÀ BẾP THEO PHONG CÁCH HIỆN ĐẠI','./../../assets/img/TinTuc/tintuc9.jpg','Thiết kế ánh sáng cho nhà bếp: hiện đại, tiện nghi và thuận lợi.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(12,'CÁCH LỰA CHỌN ĐÈN TRANG TRÍ CHO NHÀ HÀNG, QUÁN CAFE','./../../assets/img/TinTuc/tintuc10.jpg','Lựa chọn đèn trang trí cho nhà hàng, quán cafe: phong cách, ấm cúng.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(13,'BÍ QUYẾT LỰA CHỌN ĐÈN TRANG TRÍ CHO PHÒNG ĂN GIA ĐÌNH','./../../assets/img/TinTuc/tintuc11.jpg','Bí quyết chọn đèn trang trí cho phòng ăn gia đình: ấm cúng, gần gũi.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(14,'CÁCH PHỐI MÀU SẮC CHO ĐÈN TRANG TRÍ PHÒNG NGỦ','./../../assets/img/TinTuc/tintuc12.jpg','Phối màu sắc cho đèn trang trí phòng ngủ: thư giãn, ấm áp.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(15,'CÁCH BỐ TRÍ ĐÈN TRANG TRÍ CHO NHÀ BẾP TIỆN ÍCH','./../../assets/img/TinTuc/tintuc13.jpg','Bố trí đèn trang trí cho nhà bếp: tiện ích, hiện đại và tiện nghi.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(16,'THIẾT KẾ ÁNH SÁNG CHO NHÀ BẾP THEO PHONG CÁCH HIỆN ĐẠI','./../../assets/img/TinTuc/tintuc14.jpg','Thiết kế ánh sáng cho nhà bếp: hiện đại, tinh tế và tiện ích.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(17,'CÁCH LỰA CHỌN ĐÈN TRANG TRÍ PHÙ HỢP VỚI KHÔNG GIAN NHÀ CỬA','./../../assets/img/TinTuc/tintuc15.jpg','Lựa chọn đèn trang trí phù hợp với không gian nhà cửa: ấm áp, sang trọng.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(18,'ĐÈN TRANG TRÍ CHO KHÔNG GIAN LÀM VIỆC TẠI NHÀ','./../../assets/img/TinTuc/tintuc16.jpg','Đèn trang trí cho không gian làm việc tại nhà: thoải mái, hiệu quả.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(19,'CÁCH CHỌN LỰA ĐÈN TRANG TRÍ PHÙ HỢP VỚI NHÀ CỬA','./../../assets/img/TinTuc/tintuc17.jpg','Chọn lựa đèn trang trí phù hợp với nhà cửa: ấm áp, tạo không gian riêng.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(20,'BÍ QUYẾT PHỐI MÀU ÁNH SÁNG CHO PHÒNG NGỦ','./../../assets/img/TinTuc/tintuc18.jpg','Bí quyết phối màu ánh sáng cho phòng ngủ: ấm áp, thoải mái.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(21,'CÁCH CHỌN ĐÈN TRANG TRÍ PHÙ HỢP VỚI KHÔNG GIAN NHÀ BẾP','./../../assets/img/TinTuc/tintuc19.jpg','Chọn đèn trang trí phù hợp với không gian nhà bếp: hiện đại, tiện ích.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(22,'THIẾT KẾ ÁNH SÁNG CHO PHÒNG ĂN HIỆN ĐẠI','./../../assets/img/TinTuc/tintuc20.jpg','Thiết kế ánh sáng cho phòng ăn hiện đại: sang trọng, tinh tế.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(23,'CÁCH CHỌN LỰA ĐÈN TRANG TRÍ CHO KHÔNG GIAN PHÒNG KHÁCH','./../../assets/img/TinTuc/tintuc21.jpg','Chọn lựa đèn trang trí cho không gian phòng khách: ấm áp, sang trọng.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(24,'ĐÈN TRANG TRÍ CHO NHÀ CỬA THEO PHONG CÁCH SCANDINAVIA','./../../assets/img/TinTuc/tintuc22.jpg','Đèn trang trí cho nhà cửa theo phong cách Scandinavia: gần gũi, tự nhiên.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(25,'CÁCH LỰA CHỌN ĐÈN TRANG TRÍ PHÙ HỢP VỚI PHÒNG NGỦ NHỎ','./../../assets/img/TinTuc/tintuc23.jpg','Lựa chọn đèn trang trí phù hợp với phòng ngủ nhỏ: tối ưu, thoải mái.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(26,'THIẾT KẾ ÁNH SÁNG CHO PHÒNG KHÁCH SANG TRỌNG','./../../assets/img/TinTuc/tintuc24.jpg','Thiết kế ánh sáng cho phòng khách sang trọng: lịch lãm, ấm áp.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(27,'CÁCH BỐ TRÍ ĐÈN TRANG TRÍ CHO PHÒNG NGỦ THEO FENG SHUI','./../../assets/img/TinTuc/tintuc25.jpg','Bố trí đèn trang trí cho phòng ngủ theo phong thủy: cân bằng, yên bình.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(28,'BÍ QUYẾT CHỌN ĐÈN TRANG TRÍ PHÙ HỢP VỚI KHÔNG GIAN NHÀ BẾP','./../../assets/img/TinTuc/tintuc26.jpg','Bí quyết chọn đèn trang trí phù hợp với không gian nhà bếp: hiện đại, tiện ích.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(29,'CÁCH PHỐI MÀU ÁNH SÁNG CHO PHÒNG ĂN GIA ĐÌNH','./../../assets/img/TinTuc/tintuc27.jpg','Phối màu ánh sáng cho phòng ăn gia đình: ấm áp, gần gũi.','2024-03-30 09:33:25','2024-03-30 09:33:25'),(30,'test1','./../../assets/img/TinTuc/tintuc12.jpg','test1','2024-05-19 13:55:27','2024-05-19 14:03:16');
/*!40000 ALTER TABLE `tintucs` ENABLE KEYS */;
USE thuan123;

UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-07 18:27:40
