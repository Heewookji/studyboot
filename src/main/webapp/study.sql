-- MySQL dump 10.17  Distrib 10.3.14-MariaDB, for osx10.14 (x86_64)
--
-- Host: localhost    Database: studydb
-- ------------------------------------------------------
-- Server version	10.3.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sms_adr_l`
--

DROP TABLE IF EXISTS `sms_adr_l`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_adr_l` (
  `adr_l_id` char(2) NOT NULL COMMENT '주소 대분류 번호',
  `name` varchar(50) NOT NULL COMMENT '시도',
  PRIMARY KEY (`adr_l_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='활동지역 대분류';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_adr_l`
--

LOCK TABLES `sms_adr_l` WRITE;
/*!40000 ALTER TABLE `sms_adr_l` DISABLE KEYS */;
INSERT INTO `sms_adr_l` VALUES ('11','서울시'),('12','부산시'),('13','대구시'),('14','인천시'),('15','광주시'),('16','대전시'),('17','울산시'),('18','경기도'),('19','강원도'),('20','충청도'),('21','전라도'),('22','경상도'),('23','제주도');
/*!40000 ALTER TABLE `sms_adr_l` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_adr_m`
--

DROP TABLE IF EXISTS `sms_adr_m`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_adr_m` (
  `adr_m_id` char(2) NOT NULL COMMENT '주소 중분류 번호',
  `adr_l_id` char(2) NOT NULL COMMENT '주소 대분류 번호',
  `name` varchar(50) NOT NULL COMMENT '시군구',
  PRIMARY KEY (`adr_m_id`,`adr_l_id`),
  KEY `FK_sms_adr_l_TO_sms_adr_m` (`adr_l_id`),
  CONSTRAINT `FK_sms_adr_l_TO_sms_adr_m` FOREIGN KEY (`adr_l_id`) REFERENCES `sms_adr_l` (`adr_l_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='활동지역 중분류';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_adr_m`
--

LOCK TABLES `sms_adr_m` WRITE;
/*!40000 ALTER TABLE `sms_adr_m` DISABLE KEYS */;
INSERT INTO `sms_adr_m` VALUES ('11','11','종로구'),('11','12','중구'),('11','14','중구'),('12','11','중구'),('12','12','서구'),('12','14','동구'),('13','11','용산구'),('13','12','동구'),('13','14','미추홀구'),('14','11','성동구'),('14','12','영도구'),('14','14','연수구'),('15','11','광진구'),('15','12','부산진구'),('15','14','남동구'),('16','11','동대문구'),('16','12','동래구'),('16','14','부평구'),('17','11','중랑구'),('17','12','남구'),('17','14','계양구'),('18','11','성북구'),('18','12','북구'),('18','14','서구'),('19','11','강북구'),('19','12','강서구'),('19','14','강화군'),('20','11','도봉구'),('20','12','해운대구'),('20','14','옹진군'),('21','11','노원구'),('21','12','사하구'),('22','11','은평구'),('22','12','금정구'),('23','11','서대문구'),('23','12','연제구'),('24','11','마포구'),('24','12','수영구'),('25','11','양천구'),('25','12','사상구'),('26','11','강서구'),('26','12','기장군'),('27','11','구로구'),('28','11','금천구'),('29','11','영등포구'),('30','11','동작구'),('31','11','관악구'),('32','11','서초구'),('33','11','강남구'),('34','11','송파구'),('35','11','강동구');
/*!40000 ALTER TABLE `sms_adr_m` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_adr_s`
--

DROP TABLE IF EXISTS `sms_adr_s`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_adr_s` (
  `adr_s_id` char(2) NOT NULL COMMENT '주소 소분류 번호',
  `adr_m_id` char(2) NOT NULL COMMENT '주소 중분류 번호',
  `adr_l_id` char(2) NOT NULL COMMENT '주소 대분류 번호',
  `name` varchar(50) DEFAULT NULL COMMENT '읍동면',
  PRIMARY KEY (`adr_s_id`,`adr_m_id`,`adr_l_id`),
  KEY `FK_sms_adr_m_TO_sms_adr_s` (`adr_m_id`,`adr_l_id`),
  CONSTRAINT `FK_sms_adr_m_TO_sms_adr_s` FOREIGN KEY (`adr_m_id`, `adr_l_id`) REFERENCES `sms_adr_m` (`adr_m_id`, `adr_l_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='활동지역 소분류';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_adr_s`
--

LOCK TABLES `sms_adr_s` WRITE;
/*!40000 ALTER TABLE `sms_adr_s` DISABLE KEYS */;
INSERT INTO `sms_adr_s` VALUES ('11','11','14','신포동'),('11','15','14','구월동'),('11','16','14','부평동'),('11','19','12','대저동'),('11','22','12','서동'),('11','33','11','신사동'),('11','35','11','강일동'),('12','11','14','연안동'),('12','15','14','간석동'),('12','16','14','산곡동'),('12','19','12','강동동'),('12','22','12','금사회동동'),('12','33','11','논현동'),('12','35','11','상일동'),('13','11','14','신흥동'),('13','15','14','만수동'),('13','16','14','청천동'),('13','19','12','명지동'),('13','22','12','부곡동'),('13','33','11','압구정동'),('13','35','11','명일동'),('14','11','14','도원동'),('14','15','14','장수서창동'),('14','16','14','갈산동'),('14','19','12','가락동'),('14','22','12','장전동'),('14','33','11','청담동'),('14','35','11','고덕동'),('15','11','14','율목동'),('15','15','14','서창동'),('15','16','14','삼산동'),('15','19','12','녹산동'),('15','22','12','선두구동'),('15','33','11','삼성동'),('15','35','11','암사동'),('16','11','14','동인천동'),('16','15','14','남촌도림동'),('16','16','14','부개동'),('16','19','12','가덕도동'),('16','22','12','청룡노포동'),('16','33','11','대치동'),('16','35','11','천호동'),('17','11','14','북성동'),('17','15','14','논현동'),('17','16','14','일신동'),('17','22','12','구서동'),('17','33','11','역삼동'),('17','35','11','성내동'),('18','11','14','송월동'),('18','15','14','논현고잔동'),('18','16','14','십정동'),('18','22','12','금성동'),('18','33','11','도곡동'),('18','35','11','길동'),('19','11','14','영종동'),('19','33','11','개포동'),('19','35','11','둔촌동'),('20','11','14','운서동'),('20','33','11','세곡동'),('21','11','14','용유동'),('21','33','11','일원동'),('22','33','11','수서동');
/*!40000 ALTER TABLE `sms_adr_s` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_apl_std`
--

DROP TABLE IF EXISTS `sms_apl_std`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_apl_std` (
  `member_id` int(11) NOT NULL COMMENT '회원번호',
  `std_id` int(11) NOT NULL COMMENT '스터디번호',
  `dtrm` varchar(100) NOT NULL COMMENT '스터디 각오',
  `state` tinyint(1) NOT NULL DEFAULT 0 COMMENT '열람여부',
  `apl_date` date NOT NULL DEFAULT curdate() COMMENT '신청일',
  PRIMARY KEY (`member_id`,`std_id`),
  KEY `FK_sms_std_TO_sms_apl_std` (`std_id`),
  CONSTRAINT `FK_sms_member_TO_sms_apl_std` FOREIGN KEY (`member_id`) REFERENCES `sms_member` (`member_id`),
  CONSTRAINT `FK_sms_std_TO_sms_apl_std` FOREIGN KEY (`std_id`) REFERENCES `sms_std` (`std_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='신청 스터디';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_apl_std`
--

LOCK TABLES `sms_apl_std` WRITE;
/*!40000 ALTER TABLE `sms_apl_std` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_apl_std` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_board_cls`
--

DROP TABLE IF EXISTS `sms_board_cls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_board_cls` (
  `cls_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '게시판분류번호',
  `cls_name` varchar(50) NOT NULL COMMENT '분류명',
  PRIMARY KEY (`cls_id`),
  UNIQUE KEY `UIX_sms_board_cls` (`cls_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='게시판분류';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_board_cls`
--

LOCK TABLES `sms_board_cls` WRITE;
/*!40000 ALTER TABLE `sms_board_cls` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_board_cls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_conv`
--

DROP TABLE IF EXISTS `sms_conv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_conv` (
  `conv_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '편의시설번호',
  `name` varchar(50) NOT NULL COMMENT '편의시설명',
  PRIMARY KEY (`conv_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='편의시설';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_conv`
--

LOCK TABLES `sms_conv` WRITE;
/*!40000 ALTER TABLE `sms_conv` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_conv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_end_state_cls`
--

DROP TABLE IF EXISTS `sms_end_state_cls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_end_state_cls` (
  `end_state_cls_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '탈퇴추방완료분류번호',
  `name` varchar(50) NOT NULL COMMENT '이름',
  PRIMARY KEY (`end_state_cls_id`),
  UNIQUE KEY `UIX_sms_end_state_cls` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COMMENT='탈퇴추방완료분류';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_end_state_cls`
--

LOCK TABLES `sms_end_state_cls` WRITE;
/*!40000 ALTER TABLE `sms_end_state_cls` DISABLE KEYS */;
INSERT INTO `sms_end_state_cls` VALUES (1,'완료'),(3,'추방'),(2,'탈퇴');
/*!40000 ALTER TABLE `sms_end_state_cls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_member`
--

DROP TABLE IF EXISTS `sms_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_member` (
  `member_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '회원번호',
  `pwd` varchar(100) DEFAULT NULL COMMENT '암호',
  `email` varchar(40) NOT NULL COMMENT '이메일',
  `nick_name` varchar(50) NOT NULL COMMENT '닉네임',
  `join_date` date DEFAULT curdate() COMMENT '가입일',
  `name` varchar(50) NOT NULL COMMENT '이름',
  `rate` double NOT NULL DEFAULT 3 COMMENT '현재평점',
  `birth` date DEFAULT NULL COMMENT '생년월일',
  `tel` varchar(30) DEFAULT NULL COMMENT '전화',
  `photo` varchar(255) DEFAULT 'defaultphoto' COMMENT '사진',
  `admin` tinyint(1) NOT NULL DEFAULT 0 COMMENT '관리자여부',
  `adr_lms` char(6) DEFAULT NULL COMMENT '활동지역',
  `withdraw` tinyint(1) NOT NULL DEFAULT 0 COMMENT '탈퇴여부',
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UIX_sms_member` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COMMENT='회원';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_member`
--

LOCK TABLES `sms_member` WRITE;
/*!40000 ALTER TABLE `sms_member` DISABLE KEYS */;
INSERT INTO `sms_member` VALUES (1,'*89C6B530AA78695E257E55D63C00A6EC9AD3E977','admin@test.com','스터디부트','2019-06-24','관리자',3,'1993-05-16','010-1111-1111','defaultphoto',1,'111111',0),(2,'*89C6B530AA78695E257E55D63C00A6EC9AD3E977','tkdgus@naver.com','빠삐코오','2019-06-24','박상현',3,'1991-03-23','010-1234-1234','defaultphoto',0,'113321',0),(3,'*89C6B530AA78695E257E55D63C00A6EC9AD3E977','wlghks@naver.com','지환짱짱','2019-06-24','최지환',3,'1994-04-25','010-3333-3333','defaultphoto',0,'141517',0),(4,'*89C6B530AA78695E257E55D63C00A6EC9AD3E977','gmldnr@naver.com','노채팅선생','2019-06-24','지희욱',3,'1993-11-15','010-4444-4444','defaultphoto',0,'122213',0),(5,'*89C6B530AA78695E257E55D63C00A6EC9AD3E977','tkdals@naver.com','사십이피','2019-06-24','박상민',3,'1994-04-02','010-5555-5555','defaultphoto',0,'113516',0),(6,'*89C6B530AA78695E257E55D63C00A6EC9AD3E977','gusdn@naver.com','베라알바생','2019-06-24','임현우',3,'1993-12-02','010-4444-4444','defaultphoto',0,'141611',0),(7,'*89C6B530AA78695E257E55D63C00A6EC9AD3E977','eom@naver.com','자바엄티쳐','2019-06-24','엄진영',3,'1972-05-16','010-5555-5555','defaultphoto',0,'121914',0),(8,'*89C6B530AA78695E257E55D63C00A6EC9AD3E977','xodus@naver.com','멋진남자','2019-06-24','김태연',3,'1992-04-02','010-1111-1111','defaultphoto',0,'141116',0),(9,'*89C6B530AA78695E257E55D63C00A6EC9AD3E977','wndus@naver.com','주연배우','2019-06-24','이주연',3,'1993-08-20','010-1111-1111','defaultphoto',0,'122216',0),(10,'*89C6B530AA78695E257E55D63C00A6EC9AD3E977','elql1@naver.com','디비','2019-06-24','디비1',3,'1993-08-20','010-1111-1111','defaultphoto',0,'122216',0),(11,'*89C6B530AA78695E257E55D63C00A6EC9AD3E977','elql2@naver.com','디비','2019-06-24','디비2',3,'1993-08-20','010-1111-1111','defaultphoto',0,'132116',0),(12,'*89C6B530AA78695E257E55D63C00A6EC9AD3E977','elql3@naver.com','디비','2019-06-24','디비3',3,'1993-08-20','010-1111-1111','defaultphoto',0,'142215',0),(13,'*89C6B530AA78695E257E55D63C00A6EC9AD3E977','elql4@naver.com','디비','2019-06-24','디비4',3,'1993-08-20','010-1111-1111','defaultphoto',0,'122215',0);
/*!40000 ALTER TABLE `sms_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_member_arch`
--

DROP TABLE IF EXISTS `sms_member_arch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_member_arch` (
  `member_arch_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '회원자료실 번호',
  `member_id` int(11) NOT NULL COMMENT '회원번호',
  `file_path` varchar(255) NOT NULL COMMENT '파일경로',
  `rgstr_dt` datetime NOT NULL DEFAULT current_timestamp() COMMENT '등록일시',
  PRIMARY KEY (`member_arch_id`),
  UNIQUE KEY `UIX_sms_member_arch` (`file_path`),
  KEY `FK_sms_member_TO_sms_member_arch` (`member_id`),
  CONSTRAINT `FK_sms_member_TO_sms_member_arch` FOREIGN KEY (`member_id`) REFERENCES `sms_member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='회원 자료실';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_member_arch`
--

LOCK TABLES `sms_member_arch` WRITE;
/*!40000 ALTER TABLE `sms_member_arch` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_member_arch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_member_cls`
--

DROP TABLE IF EXISTS `sms_member_cls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_member_cls` (
  `member_id` int(11) NOT NULL COMMENT '회원번호',
  `cls_lms` char(6) NOT NULL COMMENT '관심분야',
  KEY `FK_sms_member_TO_sms_member_cls` (`member_id`),
  CONSTRAINT `FK_sms_member_TO_sms_member_cls` FOREIGN KEY (`member_id`) REFERENCES `sms_member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='관심분야';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_member_cls`
--

LOCK TABLES `sms_member_cls` WRITE;
/*!40000 ALTER TABLE `sms_member_cls` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_member_cls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_member_rate_info`
--

DROP TABLE IF EXISTS `sms_member_rate_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_member_rate_info` (
  `member_rate_info_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '회원평점 번호',
  `std_id` int(11) NOT NULL COMMENT '스터디번호',
  `member_id` int(11) NOT NULL COMMENT '회원번호',
  `confirm_member_id` int(11) NOT NULL COMMENT '평가한 회원 번호',
  `rate_cls` tinyint(1) NOT NULL DEFAULT 1 COMMENT '나갈때평가나간사람평가',
  `rate` double NOT NULL COMMENT '평점',
  `rate_dt` date NOT NULL DEFAULT curdate() COMMENT '평가일',
  PRIMARY KEY (`member_rate_info_id`),
  KEY `FK_sms_std_member_TO_sms_member_rate_info` (`std_id`,`member_id`),
  KEY `FK_sms_member_TO_sms_member_rate_info` (`confirm_member_id`),
  CONSTRAINT `FK_sms_member_TO_sms_member_rate_info` FOREIGN KEY (`confirm_member_id`) REFERENCES `sms_member` (`member_id`),
  CONSTRAINT `FK_sms_std_member_TO_sms_member_rate_info` FOREIGN KEY (`std_id`, `member_id`) REFERENCES `sms_std_member` (`std_id`, `member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='회원 평점 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_member_rate_info`
--

LOCK TABLES `sms_member_rate_info` WRITE;
/*!40000 ALTER TABLE `sms_member_rate_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_member_rate_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_member_rate_log`
--

DROP TABLE IF EXISTS `sms_member_rate_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_member_rate_log` (
  `rate_log_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '회원 평점 기록 번호',
  `member_id` int(11) NOT NULL COMMENT '회원번호',
  `rate` double NOT NULL COMMENT '평점',
  `update_dt` date NOT NULL DEFAULT curdate() COMMENT '갱신일',
  PRIMARY KEY (`rate_log_id`),
  KEY `FK_sms_member_TO_sms_member_rate_log` (`member_id`),
  CONSTRAINT `FK_sms_member_TO_sms_member_rate_log` FOREIGN KEY (`member_id`) REFERENCES `sms_member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='회원 평점 기록';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_member_rate_log`
--

LOCK TABLES `sms_member_rate_log` WRITE;
/*!40000 ALTER TABLE `sms_member_rate_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_member_rate_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_member_retire`
--

DROP TABLE IF EXISTS `sms_member_retire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_member_retire` (
  `std_id` int(11) NOT NULL COMMENT '스터디번호',
  `member_id` int(11) NOT NULL COMMENT '회원번호',
  `rate_require` tinyint(1) NOT NULL DEFAULT 1 COMMENT '평가필요여부',
  `std_rate_require_cnt` int(11) NOT NULL COMMENT '평가해줘야할회원수',
  PRIMARY KEY (`std_id`,`member_id`),
  CONSTRAINT `FK_sms_std_TO_sms_member_retire` FOREIGN KEY (`std_id`) REFERENCES `sms_std` (`std_id`),
  CONSTRAINT `FK_sms_std_member_TO_sms_member_retire` FOREIGN KEY (`std_id`, `member_id`) REFERENCES `sms_std_member` (`std_id`, `member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='탈퇴 회원 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_member_retire`
--

LOCK TABLES `sms_member_retire` WRITE;
/*!40000 ALTER TABLE `sms_member_retire` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_member_retire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_msg`
--

DROP TABLE IF EXISTS `sms_msg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_msg` (
  `msg_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '쪽지 번호',
  `send_id` int(11) NOT NULL COMMENT '보내는회원번호',
  `recv_id` int(11) NOT NULL COMMENT '받는회원번호',
  `titl` varchar(50) NOT NULL COMMENT '제목',
  `cont` text NOT NULL COMMENT '내용',
  `dt` datetime NOT NULL DEFAULT current_timestamp() COMMENT '일시',
  PRIMARY KEY (`msg_id`),
  KEY `FK_sms_member_TO_sms_msg2` (`send_id`),
  KEY `FK_sms_member_TO_sms_msg` (`recv_id`),
  CONSTRAINT `FK_sms_member_TO_sms_msg` FOREIGN KEY (`recv_id`) REFERENCES `sms_member` (`member_id`),
  CONSTRAINT `FK_sms_member_TO_sms_msg2` FOREIGN KEY (`send_id`) REFERENCES `sms_member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='쪽지';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_msg`
--

LOCK TABLES `sms_msg` WRITE;
/*!40000 ALTER TABLE `sms_msg` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_msg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_pick_std`
--

DROP TABLE IF EXISTS `sms_pick_std`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_pick_std` (
  `member_id` int(11) NOT NULL COMMENT '회원번호',
  `std_id` int(11) NOT NULL COMMENT '스터디번호',
  PRIMARY KEY (`member_id`,`std_id`),
  KEY `FK_sms_std_TO_sms_pick_std` (`std_id`),
  CONSTRAINT `FK_sms_member_TO_sms_pick_std` FOREIGN KEY (`member_id`) REFERENCES `sms_member` (`member_id`),
  CONSTRAINT `FK_sms_std_TO_sms_pick_std` FOREIGN KEY (`std_id`) REFERENCES `sms_std` (`std_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='찜한 스터디';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_pick_std`
--

LOCK TABLES `sms_pick_std` WRITE;
/*!40000 ALTER TABLE `sms_pick_std` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_pick_std` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_rest_day`
--

DROP TABLE IF EXISTS `sms_rest_day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_rest_day` (
  `space_id` int(11) NOT NULL COMMENT '공간 번호',
  `rest_day` date NOT NULL COMMENT '휴일',
  PRIMARY KEY (`space_id`,`rest_day`),
  CONSTRAINT `FK_sms_space_TO_sms_rest_day` FOREIGN KEY (`space_id`) REFERENCES `sms_space` (`space_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='공간휴일';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_rest_day`
--

LOCK TABLES `sms_rest_day` WRITE;
/*!40000 ALTER TABLE `sms_rest_day` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_rest_day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_rprt_inqry`
--

DROP TABLE IF EXISTS `sms_rprt_inqry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_rprt_inqry` (
  `rprt_inqry_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '번호',
  `cls_id` int(11) NOT NULL COMMENT '게시판분류번호',
  `inqry_id` int(11) NOT NULL COMMENT '문의자번호',
  `sspct_id` int(11) DEFAULT NULL COMMENT '피신고자번호',
  `send_dt` datetime NOT NULL DEFAULT current_timestamp() COMMENT '보낸 일시',
  `cont` text NOT NULL COMMENT '내용',
  PRIMARY KEY (`rprt_inqry_id`),
  KEY `FK_sms_member_TO_sms_rprt_inqry` (`inqry_id`),
  KEY `FK_sms_member_TO_sms_rprt_inqry2` (`sspct_id`),
  KEY `FK_sms_board_cls_TO_sms_rprt_inqry` (`cls_id`),
  CONSTRAINT `FK_sms_board_cls_TO_sms_rprt_inqry` FOREIGN KEY (`cls_id`) REFERENCES `sms_board_cls` (`cls_id`),
  CONSTRAINT `FK_sms_member_TO_sms_rprt_inqry` FOREIGN KEY (`inqry_id`) REFERENCES `sms_member` (`member_id`),
  CONSTRAINT `FK_sms_member_TO_sms_rprt_inqry2` FOREIGN KEY (`sspct_id`) REFERENCES `sms_member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='문의신고게시판';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_rprt_inqry`
--

LOCK TABLES `sms_rprt_inqry` WRITE;
/*!40000 ALTER TABLE `sms_rprt_inqry` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_rprt_inqry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_space`
--

DROP TABLE IF EXISTS `sms_space`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_space` (
  `space_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '공간 번호',
  `name` varchar(50) NOT NULL COMMENT '공간 이름',
  `adr_lms` char(6) NOT NULL COMMENT '공간 주소',
  `adr_dtl` varchar(255) NOT NULL COMMENT '공간 상세주소',
  `tel` varchar(30) NOT NULL COMMENT '연락처',
  `intro` text NOT NULL COMMENT '공간 소개말',
  PRIMARY KEY (`space_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='공간';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_space`
--

LOCK TABLES `sms_space` WRITE;
/*!40000 ALTER TABLE `sms_space` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_space` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_space_conv_info`
--

DROP TABLE IF EXISTS `sms_space_conv_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_space_conv_info` (
  `conv_id` int(11) NOT NULL COMMENT '편의시설번호',
  `space_id` int(11) NOT NULL COMMENT '공간 번호',
  `note` text DEFAULT NULL COMMENT '비고',
  PRIMARY KEY (`conv_id`,`space_id`),
  KEY `FK_sms_space_TO_sms_space_conv_info` (`space_id`),
  CONSTRAINT `FK_sms_conv_TO_sms_space_conv_info` FOREIGN KEY (`conv_id`) REFERENCES `sms_conv` (`conv_id`),
  CONSTRAINT `FK_sms_space_TO_sms_space_conv_info` FOREIGN KEY (`space_id`) REFERENCES `sms_space` (`space_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='공간편의시설';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_space_conv_info`
--

LOCK TABLES `sms_space_conv_info` WRITE;
/*!40000 ALTER TABLE `sms_space_conv_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_space_conv_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_space_photo`
--

DROP TABLE IF EXISTS `sms_space_photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_space_photo` (
  `space_photo_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '공간 사진 번호',
  `space_id` int(11) NOT NULL COMMENT '공간 번호',
  `photo` varchar(255) NOT NULL COMMENT '사진',
  PRIMARY KEY (`space_photo_id`),
  KEY `FK_sms_space_TO_sms_space_photo` (`space_id`),
  CONSTRAINT `FK_sms_space_TO_sms_space_photo` FOREIGN KEY (`space_id`) REFERENCES `sms_space` (`space_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='공간 사진';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_space_photo`
--

LOCK TABLES `sms_space_photo` WRITE;
/*!40000 ALTER TABLE `sms_space_photo` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_space_photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_space_review`
--

DROP TABLE IF EXISTS `sms_space_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_space_review` (
  `space_review_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '공간후기번호',
  `member_id` int(11) NOT NULL COMMENT '회원번호',
  `space_id` int(11) NOT NULL COMMENT '공간 번호',
  `rating` double NOT NULL COMMENT '별점',
  `review` text NOT NULL COMMENT '후기',
  `rgstr_dt` datetime NOT NULL DEFAULT current_timestamp() COMMENT '등록일시',
  PRIMARY KEY (`space_review_id`),
  KEY `FK_sms_space_TO_sms_space_review` (`space_id`),
  KEY `FK_sms_member_TO_sms_space_review` (`member_id`),
  CONSTRAINT `FK_sms_member_TO_sms_space_review` FOREIGN KEY (`member_id`) REFERENCES `sms_member` (`member_id`),
  CONSTRAINT `FK_sms_space_TO_sms_space_review` FOREIGN KEY (`space_id`) REFERENCES `sms_space` (`space_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='공간후기';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_space_review`
--

LOCK TABLES `sms_space_review` WRITE;
/*!40000 ALTER TABLE `sms_space_review` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_space_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_space_room`
--

DROP TABLE IF EXISTS `sms_space_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_space_room` (
  `space_room_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '스터디룸 번호',
  `space_id` int(11) NOT NULL COMMENT '공간 번호',
  `name` varchar(50) NOT NULL COMMENT '룸이름',
  `photo` varchar(255) NOT NULL COMMENT '룸 사진',
  `prsn` int(11) NOT NULL COMMENT '제한 인원',
  `price` int(11) NOT NULL COMMENT '예약 비용',
  PRIMARY KEY (`space_room_id`,`space_id`),
  KEY `FK_sms_space_TO_sms_space_room` (`space_id`),
  CONSTRAINT `FK_sms_space_TO_sms_space_room` FOREIGN KEY (`space_id`) REFERENCES `sms_space` (`space_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='스터디룸';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_space_room`
--

LOCK TABLES `sms_space_room` WRITE;
/*!40000 ALTER TABLE `sms_space_room` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_space_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_space_room_bkng`
--

DROP TABLE IF EXISTS `sms_space_room_bkng`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_space_room_bkng` (
  `space_bkng_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '스터디룸예약번호',
  `space_room_id` int(11) NOT NULL COMMENT '스터디룸 번호',
  `space_id` int(11) NOT NULL COMMENT '공간 번호',
  `std_id` int(11) NOT NULL COMMENT '스터디번호',
  `member_id` int(11) NOT NULL COMMENT '회원번호',
  `bkng_sdt` datetime NOT NULL COMMENT '시작 일시',
  `bkng_edt` datetime NOT NULL COMMENT '종료 일시',
  PRIMARY KEY (`space_bkng_id`),
  KEY `FK_sms_space_room_TO_sms_space_room_bkng` (`space_room_id`,`space_id`),
  KEY `FK_sms_std_member_TO_sms_space_room_bkng` (`std_id`,`member_id`),
  CONSTRAINT `FK_sms_space_room_TO_sms_space_room_bkng` FOREIGN KEY (`space_room_id`, `space_id`) REFERENCES `sms_space_room` (`space_room_id`, `space_id`),
  CONSTRAINT `FK_sms_std_member_TO_sms_space_room_bkng` FOREIGN KEY (`std_id`, `member_id`) REFERENCES `sms_std_member` (`std_id`, `member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='스터디룸 예약';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_space_room_bkng`
--

LOCK TABLES `sms_space_room_bkng` WRITE;
/*!40000 ALTER TABLE `sms_space_room_bkng` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_space_room_bkng` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_std`
--

DROP TABLE IF EXISTS `sms_std`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_std` (
  `std_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '스터디번호',
  `adr_lms` char(6) NOT NULL COMMENT '활동지역',
  `state` tinyint(1) NOT NULL DEFAULT 1 COMMENT '스터디 상태',
  `cls_lms` char(6) NOT NULL COMMENT '스터디분류',
  `name` varchar(50) NOT NULL COMMENT '스터디 이름',
  `photo` varchar(255) NOT NULL DEFAULT 'default' COMMENT '스터디 사진',
  `day` int(11) NOT NULL COMMENT '스터디 활동일',
  `sdt` date NOT NULL COMMENT '스터디 시작일',
  `edt` date NOT NULL COMMENT '스터디 종료일',
  `rcrtm_state` tinyint(1) NOT NULL DEFAULT 1 COMMENT '모집상태여부',
  `goal` varchar(100) NOT NULL COMMENT '스터디 목표',
  `rcrtm_apply` tinyint(1) DEFAULT NULL COMMENT '모집 선언',
  `cont` text NOT NULL COMMENT '스터디 설명',
  `prsn` int(11) NOT NULL COMMENT '스터디 최대인원',
  `now_prsn` int(11) NOT NULL DEFAULT 1 COMMENT '스터디 현재인원',
  `rate` double NOT NULL DEFAULT 0 COMMENT '스터디원 평균 평점',
  PRIMARY KEY (`std_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='스터디';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_std`
--

LOCK TABLES `sms_std` WRITE;
/*!40000 ALTER TABLE `sms_std` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_std` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_std_arch`
--

DROP TABLE IF EXISTS `sms_std_arch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_std_arch` (
  `std_arch_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '자료실번호',
  `std_id` int(11) NOT NULL COMMENT '스터디번호',
  `member_id` int(11) NOT NULL COMMENT '회원번호',
  `file_path` varchar(255) NOT NULL COMMENT '파일경로',
  `rgstr_dt` datetime NOT NULL DEFAULT current_timestamp() COMMENT '등록일시',
  PRIMARY KEY (`std_arch_id`),
  UNIQUE KEY `UIX_sms_std_arch` (`file_path`),
  KEY `FK_sms_std_member_TO_sms_std_arch` (`std_id`,`member_id`),
  CONSTRAINT `FK_sms_std_member_TO_sms_std_arch` FOREIGN KEY (`std_id`, `member_id`) REFERENCES `sms_std_member` (`std_id`, `member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='스터디자료실';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_std_arch`
--

LOCK TABLES `sms_std_arch` WRITE;
/*!40000 ALTER TABLE `sms_std_arch` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_std_arch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_std_atnd`
--

DROP TABLE IF EXISTS `sms_std_atnd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_std_atnd` (
  `std_atnd_id` int(11) NOT NULL COMMENT '스터디일정번호',
  `std_id` int(11) NOT NULL COMMENT '스터디번호',
  `member_id` int(11) NOT NULL COMMENT '회원번호',
  PRIMARY KEY (`std_atnd_id`,`std_id`,`member_id`),
  KEY `FK_sms_std_member_TO_sms_std_atnd` (`std_id`,`member_id`),
  CONSTRAINT `FK_sms_std_member_TO_sms_std_atnd` FOREIGN KEY (`std_id`, `member_id`) REFERENCES `sms_std_member` (`std_id`, `member_id`),
  CONSTRAINT `FK_sms_std_schdl_TO_sms_std_atnd` FOREIGN KEY (`std_atnd_id`) REFERENCES `sms_std_schdl` (`std_schdl_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='스터디출석';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_std_atnd`
--

LOCK TABLES `sms_std_atnd` WRITE;
/*!40000 ALTER TABLE `sms_std_atnd` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_std_atnd` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_std_board`
--

DROP TABLE IF EXISTS `sms_std_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_std_board` (
  `std_board_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '스터디게시판번호',
  `std_id` int(11) NOT NULL COMMENT '스터디번호',
  `member_id` int(11) NOT NULL COMMENT '회원번호',
  `ntc` tinyint(1) NOT NULL DEFAULT 0 COMMENT '공지사항여부',
  `title` varchar(100) NOT NULL COMMENT '제목',
  `cont` text NOT NULL COMMENT '내용',
  `rgstr_dt` datetime NOT NULL DEFAULT current_timestamp() COMMENT '등록일시',
  `vw_cnt` int(11) NOT NULL DEFAULT 0 COMMENT '조회수',
  PRIMARY KEY (`std_board_id`),
  KEY `FK_sms_std_member_TO_sms_std_board` (`std_id`,`member_id`),
  CONSTRAINT `FK_sms_std_member_TO_sms_std_board` FOREIGN KEY (`std_id`, `member_id`) REFERENCES `sms_std_member` (`std_id`, `member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='스터디 게시판';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_std_board`
--

LOCK TABLES `sms_std_board` WRITE;
/*!40000 ALTER TABLE `sms_std_board` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_std_board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_std_cls_l`
--

DROP TABLE IF EXISTS `sms_std_cls_l`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_std_cls_l` (
  `cls_l_id` char(2) NOT NULL COMMENT '대분류번호',
  `name` varchar(50) NOT NULL COMMENT '이름',
  PRIMARY KEY (`cls_l_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='스터디대분류';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_std_cls_l`
--

LOCK TABLES `sms_std_cls_l` WRITE;
/*!40000 ALTER TABLE `sms_std_cls_l` DISABLE KEYS */;
INSERT INTO `sms_std_cls_l` VALUES ('11','IT'),('12','서비스'),('13','금융'),('14','예체능'),('15','인문'),('16','공학'),('17','외국어');
/*!40000 ALTER TABLE `sms_std_cls_l` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_std_cls_m`
--

DROP TABLE IF EXISTS `sms_std_cls_m`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_std_cls_m` (
  `cls_m_id` char(2) NOT NULL COMMENT '중분류번호',
  `cls_l_id` char(2) NOT NULL COMMENT '대분류번호',
  `name` varchar(50) NOT NULL COMMENT '이름',
  PRIMARY KEY (`cls_m_id`,`cls_l_id`),
  KEY `FK_sms_std_cls_l_TO_sms_std_cls_m` (`cls_l_id`),
  CONSTRAINT `FK_sms_std_cls_l_TO_sms_std_cls_m` FOREIGN KEY (`cls_l_id`) REFERENCES `sms_std_cls_l` (`cls_l_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='스터디중분류';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_std_cls_m`
--

LOCK TABLES `sms_std_cls_m` WRITE;
/*!40000 ALTER TABLE `sms_std_cls_m` DISABLE KEYS */;
INSERT INTO `sms_std_cls_m` VALUES ('11','11','웹 개발'),('11','12','의료'),('11','13','재태크'),('11','14','체육'),('11','15','정치학'),('11','16','기계공학'),('11','17','영어'),('12','11','모바일 앱'),('12','12','패션'),('12','13','자산관리'),('12','14','미술'),('12','15','사회학'),('12','16','전기전자공학'),('12','17','중국어'),('13','11','게임'),('13','12','영업'),('13','14','음악'),('13','15','경제학'),('13','16','토목공학'),('13','17','일본어'),('14','11','기타'),('14','12','운수'),('14','15','사학'),('14','16','화학공학'),('14','17','독일어'),('15','15','철학'),('15','16','환경공학'),('15','17','불어'),('16','15','종교학'),('16','16','재료공학'),('16','17','아랍어'),('17','15','수학');
/*!40000 ALTER TABLE `sms_std_cls_m` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_std_cls_s`
--

DROP TABLE IF EXISTS `sms_std_cls_s`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_std_cls_s` (
  `cls_s_id` char(2) NOT NULL COMMENT '소분류번호',
  `cls_m_id` char(2) NOT NULL COMMENT '중분류번호',
  `cls_l_id` char(2) NOT NULL COMMENT '대분류번호',
  `name` varchar(50) NOT NULL COMMENT '이름',
  PRIMARY KEY (`cls_s_id`,`cls_m_id`,`cls_l_id`),
  KEY `FK_sms_std_cls_m_TO_sms_std_cls_s` (`cls_m_id`,`cls_l_id`),
  CONSTRAINT `FK_sms_std_cls_m_TO_sms_std_cls_s` FOREIGN KEY (`cls_m_id`, `cls_l_id`) REFERENCES `sms_std_cls_m` (`cls_m_id`, `cls_l_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='스터디소분류';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_std_cls_s`
--

LOCK TABLES `sms_std_cls_s` WRITE;
/*!40000 ALTER TABLE `sms_std_cls_s` DISABLE KEYS */;
INSERT INTO `sms_std_cls_s` VALUES ('11','11','11','웹사이트 제작'),('11','11','12','해부학'),('11','11','13','경매'),('11','11','14','생활 체육'),('11','11','16','생산설비'),('11','11','17','회화'),('11','12','11','네이티브앱'),('11','12','12','패션디자인'),('11','12','13','재무설계'),('11','12','14','입시 미술'),('11','12','16','집적회로'),('11','12','17','회화'),('11','13','11','2D'),('11','13','14','입시 음악'),('11','13','15','이론경제'),('11','14','11','블록체인'),('11','14','15','고고학'),('12','11','11','퍼블리싱'),('12','11','12','병리학'),('12','11','13','주식'),('12','11','14','입시 체육'),('12','11','16','로봇기계'),('12','11','17','문법'),('12','12','11','하이브리드앱'),('12','12','12','모델'),('12','12','13','보험'),('12','12','14','조각'),('12','12','16','통신'),('12','12','17','문법'),('12','13','11','3D'),('12','13','14','기타'),('12','13','15','실증경제'),('12','14','11','AR/VR'),('12','14','15','미술사학'),('13','11','11','보안'),('13','11','12','생화학'),('13','11','13','부동산'),('13','11','14','공시 체육'),('13','11','16','자동차기계'),('13','11','17','단어'),('13','12','11','UX/UI'),('13','12','12','코디네이션'),('13','12','14','회화'),('13','12','16','반도체'),('13','12','17','단어'),('13','13','11','서버'),('13','13','14','보컬'),('13','13','15','재정학'),('13','14','11','핀테크'),('13','14','15','한국사'),('14','11','11','기획'),('14','11','14','헬스'),('14','11','16','산업기계'),('14','11','17','자격증'),('14','12','14','공예'),('14','12','16','제어공학'),('14','12','17','자격증'),('14','13','15','산업조직론'),('14','14','15','세계사'),('15','11','11','UX/UI'),('15','11','17','수능'),('15','12','14','사진'),('15','12','17','수능');
/*!40000 ALTER TABLE `sms_std_cls_s` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_std_member`
--

DROP TABLE IF EXISTS `sms_std_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_std_member` (
  `std_id` int(11) NOT NULL COMMENT '스터디번호',
  `member_id` int(11) NOT NULL COMMENT '회원번호',
  `end_state_cls_id` int(11) DEFAULT NULL COMMENT '탙퇴추방완료분류번호',
  `join_date` date NOT NULL DEFAULT curdate() COMMENT '스터디 가입일',
  `end_date` date DEFAULT NULL COMMENT '스터디원 종료일',
  `leader` tinyint(1) NOT NULL DEFAULT 0 COMMENT '스터디장여부',
  `atn_pct` double DEFAULT 0 COMMENT '스터디 출석율',
  `arch_cnt` int(11) DEFAULT 0 COMMENT '업로드 횟수',
  PRIMARY KEY (`std_id`,`member_id`),
  KEY `FK_sms_member_TO_sms_std_member` (`member_id`),
  KEY `FK_sms_end_state_cls_TO_sms_std_member` (`end_state_cls_id`),
  CONSTRAINT `FK_sms_end_state_cls_TO_sms_std_member` FOREIGN KEY (`end_state_cls_id`) REFERENCES `sms_end_state_cls` (`end_state_cls_id`),
  CONSTRAINT `FK_sms_member_TO_sms_std_member` FOREIGN KEY (`member_id`) REFERENCES `sms_member` (`member_id`),
  CONSTRAINT `FK_sms_std_TO_sms_std_member` FOREIGN KEY (`std_id`) REFERENCES `sms_std` (`std_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='스터디회원';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_std_member`
--

LOCK TABLES `sms_std_member` WRITE;
/*!40000 ALTER TABLE `sms_std_member` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_std_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_std_schdl`
--

DROP TABLE IF EXISTS `sms_std_schdl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_std_schdl` (
  `std_schdl_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '스터디일정번호',
  `std_id` int(11) NOT NULL COMMENT '스터디번호',
  `member_id` int(11) NOT NULL COMMENT '회원번호',
  `space_bkng_id` int(11) DEFAULT NULL COMMENT '스터디룸예약번호',
  `name` varchar(50) NOT NULL COMMENT '이름',
  `schdl_sdt` datetime NOT NULL DEFAULT current_timestamp() COMMENT '시작 일시',
  `schdl_edt` datetime NOT NULL COMMENT '종료 일시',
  `memo` text DEFAULT NULL COMMENT '메모',
  PRIMARY KEY (`std_schdl_id`),
  KEY `FK_sms_std_member_TO_sms_std_schdl` (`std_id`,`member_id`),
  KEY `FK_sms_space_room_bkng_TO_sms_std_schdl` (`space_bkng_id`),
  CONSTRAINT `FK_sms_space_room_bkng_TO_sms_std_schdl` FOREIGN KEY (`space_bkng_id`) REFERENCES `sms_space_room_bkng` (`space_bkng_id`),
  CONSTRAINT `FK_sms_std_TO_sms_std_schdl` FOREIGN KEY (`std_id`) REFERENCES `sms_std` (`std_id`),
  CONSTRAINT `FK_sms_std_member_TO_sms_std_schdl` FOREIGN KEY (`std_id`, `member_id`) REFERENCES `sms_std_member` (`std_id`, `member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='스터디일정';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_std_schdl`
--

LOCK TABLES `sms_std_schdl` WRITE;
/*!40000 ALTER TABLE `sms_std_schdl` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_std_schdl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_tag`
--

DROP TABLE IF EXISTS `sms_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_tag` (
  `tag_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '태그번호',
  `space_id` int(11) NOT NULL COMMENT '공간 번호',
  `name` varchar(50) NOT NULL COMMENT '태그 이름',
  PRIMARY KEY (`tag_id`),
  KEY `FK_sms_space_TO_sms_tag` (`space_id`),
  CONSTRAINT `FK_sms_space_TO_sms_tag` FOREIGN KEY (`space_id`) REFERENCES `sms_space` (`space_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='태그';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_tag`
--

LOCK TABLES `sms_tag` WRITE;
/*!40000 ALTER TABLE `sms_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_tag` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-24 20:22:37
