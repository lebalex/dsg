-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               6.0.6-alpha-community - MySQL Community Server (GPL)
-- ОС Сервера:                   Win32
-- HeidiSQL Версия:              9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Дамп структуры базы данных dsg_db
CREATE DATABASE IF NOT EXISTS `dsg_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
create user 'dsg'@'localhost' identified by 'jysb87td';
grant all privileges on dsg_db.* to 'dsg'@'localhost';

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы dsg_db.dsg_categ: ~4 rows (приблизительно)
/*!40000 ALTER TABLE `dsg_categ` DISABLE KEYS */;
INSERT INTO `dsg_categ` (`id`, `name`, `img`, `description`, `active`) VALUES
	(1, 'DQ200', 'dq200.jpg', NULL, 1),
	(2, 'DQ250', 'dq250.jpg', NULL, 1),
	(3, 'DL501', 'dl501.jpg', NULL, 1),
	(4, 'DQ500', 'dq500.jpg', NULL, 1);
/*!40000 ALTER TABLE `dsg_categ` ENABLE KEYS */;


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
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы dsg_db.dsg_products: ~49 rows (приблизительно)
/*!40000 ALTER TABLE `dsg_products` DISABLE KEYS */;
INSERT INTO `dsg_products` (`id_categ`, `id`, `name`, `oem`, `count`, `coast`, `img`, `description`, `active`) VALUES
	(1, 1, 'Гидравл. Масло в Мех-рон', 'G004000m2', 3, NULL, NULL, NULL, b'1'),
	(1, 2, 'Прокладка под Мехатрон', '0AM927377', 2, NULL, NULL, NULL, b'1'),
	(1, 3, 'Прокладка под Мехатрон', 'a09m72737', 5, NULL, NULL, NULL, b'1'),
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
	(3, 37, 'Манжетное уплотнение', 'WHT004741', 1, NULL, NULL, NULL, b'1'),
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
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
