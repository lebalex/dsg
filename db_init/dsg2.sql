-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               6.0.6-alpha-community - MySQL Community Server (GPL)
-- Операционная система:         Win32
-- HeidiSQL Версия:              11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Дамп структуры базы данных dsg_db
DROP DATABASE IF EXISTS `dsg_db`;
CREATE DATABASE IF NOT EXISTS `dsg_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `dsg_db`;

-- Дамп структуры для таблица dsg_db.dsg_categ
DROP TABLE IF EXISTS `dsg_categ`;
CREATE TABLE IF NOT EXISTS `dsg_categ` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `img` varchar(250) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы dsg_db.dsg_categ: ~7 rows (приблизительно)
/*!40000 ALTER TABLE `dsg_categ` DISABLE KEYS */;
INSERT INTO `dsg_categ` (`id`, `name`, `img`, `description`, `active`) VALUES
	(1, 'DQ200', 'dq200.jpg', NULL, 1),
	(2, 'DQ250', 'dq250.jpg', NULL, 1),
	(3, 'DL501', 'dl501.jpg', NULL, 1),
	(4, 'DQ500', 'dq500.jpg', NULL, 1),
	(5, 'Test', '1577759_img.jpg', NULL, 0),
	(6, 'Ghb', '8484192_img.jpg', NULL, 0),
	(7, 'DSS', '4931641_img.jpg', NULL, 0);
/*!40000 ALTER TABLE `dsg_categ` ENABLE KEYS */;

-- Дамп структуры для таблица dsg_db.dsg_favouritet
DROP TABLE IF EXISTS `dsg_favouritet`;
CREATE TABLE IF NOT EXISTS `dsg_favouritet` (
  `id_user` int(11) NOT NULL,
  `id_product` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы dsg_db.dsg_favouritet: ~6 rows (приблизительно)
/*!40000 ALTER TABLE `dsg_favouritet` DISABLE KEYS */;
INSERT INTO `dsg_favouritet` (`id_user`, `id_product`) VALUES
	(5, 2),
	(5, 10),
	(5, 1),
	(5, 21),
	(16, 1),
	(16, 3);
/*!40000 ALTER TABLE `dsg_favouritet` ENABLE KEYS */;

-- Дамп структуры для таблица dsg_db.dsg_orders
DROP TABLE IF EXISTS `dsg_orders`;
CREATE TABLE IF NOT EXISTS `dsg_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL DEFAULT '0',
  `date_order` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(250) DEFAULT NULL,
  `exec` smallint(6) NOT NULL DEFAULT '0',
  `descript_manager` varchar(250) DEFAULT NULL,
  `date_manager` timestamp NULL DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы dsg_db.dsg_orders: ~16 rows (приблизительно)
/*!40000 ALTER TABLE `dsg_orders` DISABLE KEYS */;
INSERT INTO `dsg_orders` (`id`, `id_user`, `date_order`, `description`, `exec`, `descript_manager`, `date_manager`) VALUES
	(15, 16, '2020-10-08 05:47:50', '', 0, 'null', '2020-10-16 00:22:36'),
	(16, 16, '2020-10-14 03:05:59', '', 0, NULL, NULL),
	(17, 16, '2020-10-14 03:08:49', '', 0, NULL, NULL),
	(18, 16, '2020-10-14 03:12:53', '', 0, NULL, NULL),
	(19, 16, '2020-10-14 03:16:41', '', 1, 'null', '2020-10-16 00:22:26'),
	(20, 16, '2020-10-14 03:19:40', '', 2, 'null', '2020-10-16 00:22:42'),
	(21, 16, '2020-10-16 03:34:46', '', 0, NULL, NULL),
	(22, 16, '2020-10-16 03:35:35', '', 0, NULL, NULL),
	(23, 16, '2020-10-16 03:37:37', '', 0, NULL, NULL),
	(24, 16, '2020-10-16 03:44:58', '', 0, NULL, NULL),
	(25, 16, '2020-10-16 03:45:14', '', 0, NULL, NULL),
	(26, 16, '2020-10-16 03:46:33', '', 0, NULL, NULL),
	(27, 16, '2020-10-16 03:47:53', '', 1, 'null', '2020-10-16 20:24:39'),
	(28, 16, '2020-10-16 08:26:30', '', 3, 'null', '2020-10-21 17:02:17'),
	(29, 16, '2020-10-19 07:29:57', '', 0, NULL, NULL),
	(30, 16, '2020-11-09 12:31:02', '', 0, NULL, NULL);
/*!40000 ALTER TABLE `dsg_orders` ENABLE KEYS */;

-- Дамп структуры для таблица dsg_db.dsg_order_details
DROP TABLE IF EXISTS `dsg_order_details`;
CREATE TABLE IF NOT EXISTS `dsg_order_details` (
  `id_order` int(11) NOT NULL,
  `id_products` int(11) NOT NULL,
  `count` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы dsg_db.dsg_order_details: ~24 rows (приблизительно)
/*!40000 ALTER TABLE `dsg_order_details` DISABLE KEYS */;
INSERT INTO `dsg_order_details` (`id_order`, `id_products`, `count`, `price`) VALUES
	(15, 1, 3, 1200.00),
	(19, 1, 1, 1212.50),
	(19, 2, 1, NULL),
	(20, 1, 3, 1212.50),
	(20, 2, 1, NULL),
	(21, 1, 1, 1212.50),
	(21, 2, 1, NULL),
	(22, 1, 1, 1212.50),
	(22, 2, 1, NULL),
	(23, 1, 1, 1212.50),
	(23, 2, 1, NULL),
	(24, 1, 1, 1212.50),
	(24, 2, 1, NULL),
	(25, 1, 1, 1212.50),
	(25, 2, 1, NULL),
	(26, 1, 1, 1212.50),
	(26, 2, 1, NULL),
	(27, 1, 1, 1212.50),
	(27, 2, 1, NULL),
	(28, 1, 1, 1212.50),
	(29, 1, 1, 1212.50),
	(29, 2, 1, 3492.00),
	(30, 1, 1, 1212.50),
	(30, 3, 1, 119.31);
/*!40000 ALTER TABLE `dsg_order_details` ENABLE KEYS */;

-- Дамп структуры для таблица dsg_db.dsg_products
DROP TABLE IF EXISTS `dsg_products`;
CREATE TABLE IF NOT EXISTS `dsg_products` (
  `id_categ` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `oem` varchar(100) NOT NULL,
  `count` int(11) DEFAULT NULL,
  `coast` decimal(10,2) DEFAULT NULL,
  `img` varchar(250) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `active` bit(1) NOT NULL DEFAULT '',
  UNIQUE KEY `id_categ_id_name_oem` (`id_categ`,`id`,`name`,`oem`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы dsg_db.dsg_products: ~51 rows (приблизительно)
/*!40000 ALTER TABLE `dsg_products` DISABLE KEYS */;
INSERT INTO `dsg_products` (`id_categ`, `id`, `name`, `oem`, `count`, `coast`, `img`, `description`, `active`) VALUES
	(1, 1, 'Гидравл. Масло в Мех-рон', 'G004000m2', 3, 1250.00, '4906312_img.jpg;7088929_img.png', 'Тут может быть описание товара 12', b'1'),
	(1, 2, 'Прокладка под Мехатрон', '0AM927377', 2, 3601.00, NULL, '', b'1'),
	(1, 3, 'Прокладка под Мехатрон', 'a09m72737', 5, 123.00, '1567078_img.png', '', b'1'),
	(1, 4, 'Комплект сцепления 0AM с 2009', '602 0001 00', 2, NULL, NULL, NULL, b'1'),
	(1, 5, 'Комплект сцепления 0AM с 2011', '602 0006 00', 2, NULL, NULL, NULL, b'1'),
	(1, 6, 'Масло КП DQ 200(запр.2 L)', 'G055512A2', 4, NULL, NULL, NULL, b'1'),
	(1, 7, 'Винты с цилиндрической головкой', 'WHT 001 922', 4, NULL, NULL, NULL, b'1'),
	(1, 8, 'Винт с цилиндрической головкой с внутренней головкой с несколькими зубьями', '01X 301 127 c', 17, NULL, NULL, NULL, b'1'),
	(1, 9, 'Уплотнительная крышка', '0AM 301 212A', 1, NULL, NULL, NULL, b'1'),
	(1, 10, 'Винт с цилиндрической головкой с внутренней головкой с несколькими зубьями', 'N 911 743 01', 25, NULL, NULL, NULL, b'1'),
	(1, 11, 'Уплотнение вала', '0AM 301 733 L', 1, NULL, NULL, NULL, b'1'),
	(1, 12, 'Винт с цилиндрической головкой с внутренним шестигранником', '02E 409 359', 20, NULL, NULL, NULL, b'1'),
	(1, 13, 'стопорное', 'N 106 616 01', 1, NULL, NULL, NULL, b'1'),
	(1, 14, 'Стопорное кольцо приводного вала', '02E 311 467', 1, NULL, NULL, NULL, b'1'),
	(1, 15, 'Винт с цилиндрической головкой с внутренней головкой с несколькими зубьями', 'N 101 961 03', 25, NULL, NULL, NULL, b'1'),
	(1, 16, 'Сдвиг вилка 6. / р.', '0AM 311 562 K', 1, NULL, NULL, NULL, b'1'),
	(1, 17, 'герметики', 'D 176 600 M1', 1, NULL, NULL, NULL, b'1'),
	(1, 18, 'Винтовая пробка', 'N 100 371 05', 1, NULL, NULL, NULL, b'1'),
	(1, 19, 'Игольчатый подшипник', '06B 105 313 ​​D', 1, NULL, NULL, NULL, b'1'),
	(1, 50, '123', '', 3, 12333.00, NULL, '', b'0'),
	(1, 51, 'qwerty', '123-09', 123, 11111.00, '9521485_img.jpg', '', b'1'),
	(2, 20, 'Комплект сцепления', '02E398029B', 2, NULL, NULL, NULL, b'1'),
	(2, 21, 'Фильтр АКП', '02E305051C', 2, NULL, NULL, NULL, b'1'),
	(2, 22, 'Кольцо под фильтр АКП', 'N91084501', 2, NULL, NULL, NULL, b'1'),
	(2, 23, 'Масло КП DQ 250 (запр.5,2 L)', 'G052182 A2', 12, NULL, NULL, NULL, b'1'),
	(3, 24, 'Уплотнительное кольцо вала', '0B5311113F', 2, NULL, NULL, NULL, b'1'),
	(3, 25, 'Уплотнительное кольцо сетчатого фильтра АКПП AUDI', 'wht003379', 2, NULL, NULL, NULL, b'1'),
	(3, 26, 'Кольцо уплотнительное сцепления 233*2,5 (ав)', '0B5323525B', 2, NULL, NULL, NULL, b'1'),
	(3, 27, 'Корпус фильтра', '0B5325060C', 2, NULL, NULL, NULL, b'1'),
	(3, 28, 'Многодисковая фрикционная муфта для кп dsg7 0b5', '0B5141030E', 2, NULL, NULL, NULL, b'1'),
	(3, 29, 'Шарикоподшипник, рад', '0B5323263G', 2, NULL, NULL, NULL, b'1'),
	(3, 30, 'Фильтр акпп с прокладкой', '1 001 370 003', 2, NULL, NULL, NULL, b'1'),
	(3, 31, 'уплотнит. кольцо', 'N0138275', 2, NULL, NULL, NULL, b'1'),
	(3, 32, 'Масло DSG 0B5', 'G052529A2', 14, NULL, NULL, NULL, b'1'),
	(3, 33, 'Винт с внутренним', 'WHT 002 459', 28, NULL, NULL, NULL, b'1'),
	(3, 34, 'Датчики акпп', '0B5 927 321 L', 1, NULL, NULL, NULL, b'1'),
	(3, 35, 'Манжетное уплотнение', '0B5 301 227 C', 1, NULL, NULL, NULL, b'1'),
	(3, 36, 'Герметик', 'AMV 188 001 02', 1, NULL, NULL, NULL, b'1'),
	(3, 37, 'Манжетное уплотнение', 'WHT004741', 1, 200.00, NULL, '', b'1'),
	(3, 38, 'БОЛТ Стальной', 'WHT001958b', 25, NULL, NULL, NULL, b'1'),
	(3, 39, 'Болт центр вал.', 'WHT001955', 1, NULL, NULL, NULL, b'1'),
	(3, 40, 'Масло мех. 0B5', 'G055532A2', 5, NULL, NULL, NULL, b'1'),
	(3, 41, 'Винт м6х45', 'n10405702', 12, NULL, NULL, NULL, b'1'),
	(3, 42, 'Трубка маслопровода', '0B5315105TA', 2, NULL, NULL, NULL, b'1'),
	(3, 43, 'Трубка маслопровода', '0B5315105TC', 2, NULL, NULL, NULL, b'1'),
	(3, 44, 'Уплотнительное кольцо 22x27', 'N0138271', 2, NULL, NULL, NULL, b'1'),
	(3, 45, 'ремкомплект печатных плат DSG 0B5', '0B5398048D', 2, NULL, NULL, NULL, b'1'),
	(3, 46, 'Корпус разъёма под плоские контакты', '8K0 973 702', 3, NULL, NULL, NULL, b'1'),
	(3, 47, 'Комплект одинарных проводов', '000 979 025 EA', 5, NULL, NULL, NULL, b'1'),
	(3, 48, 'термоусадка VAG', '979940', 10, NULL, NULL, NULL, b'1'),
	(3, 49, 'Клапан электромагнитный', '4H0121671D', 3, NULL, NULL, NULL, b'1');
/*!40000 ALTER TABLE `dsg_products` ENABLE KEYS */;

-- Дамп структуры для таблица dsg_db.dsg_users
DROP TABLE IF EXISTS `dsg_users`;
CREATE TABLE IF NOT EXISTS `dsg_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL DEFAULT '0',
  `phone` varchar(200) NOT NULL DEFAULT '0',
  `email` varchar(200) NOT NULL DEFAULT '0',
  `pwd` varchar(200) DEFAULT '0',
  `registr` bit(1) NOT NULL DEFAULT '\0',
  `dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `discont` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы dsg_db.dsg_users: ~2 rows (приблизительно)
/*!40000 ALTER TABLE `dsg_users` DISABLE KEYS */;
INSERT INTO `dsg_users` (`id`, `name`, `phone`, `email`, `pwd`, `registr`, `dt`, `discont`) VALUES
	(16, 'Александр', '+79647552701', 'lebalex@mail.ru', 'fa585d89c851dd338a70dcf535aa2a92fee7836dd6aff1226583e88e0996293f16bc009c652826e0fc5c706695a03cddce372f139eff4d13959da6f1f5d3eabe', b'1', '2020-10-08 05:47:50', 3),
	(17, 'Федор', '123', 'fdf@mail.ru', '043e34a704b33e08d927e54bd45800259e2280970f0dfd01bc72b15e0935445c25bb878989a43812ce27a31e42a03f8d1585e685d03dcc636a658e2b352f847e', b'1', '2020-10-19 04:46:08', 0);
/*!40000 ALTER TABLE `dsg_users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
