-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1:3306
-- Tid vid skapande: 04 okt 2020 kl 00:02
-- Serverversion: 8.0.21
-- PHP-version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `card`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `card`
--

DROP TABLE IF EXISTS `card`;
CREATE TABLE IF NOT EXISTS `card` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `card`
--

INSERT INTO `card` (`id`, `type`, `text`, `tag`) VALUES
(1, 'NORMAL', 'Let the group view your search history or finish your drink.', 'SFW'),
(2, 'NORMAL', 'Dm your last ex \"I still love you\" or finish your drink.', 'SFW'),
(3, 'EXTREME', 'Spin a bottle and make out with the person it points to. Both of you must do this, take two shots, or quit playing.', 'NSFW,2P'),
(4, 'NORMAL', 'Pick someone to act out a sex position with or both of you must finish your drinks', 'NSFW,2P'),
(5, 'NORMAL', 'Take off three articles of clothing or finish your drink.', 'NSFW,CLOTHES'),
(6, 'NORMAL', 'Apply eyeliner with a black marker and blush with a red one or finish your drink.', 'SFW,MARKER'),
(7, 'NORMAL', 'Drink an entire bottle of water in less then 20 seconds or drink.', 'SFW'),
(8, 'EXTREME', 'Pick someone in the group to unzip their pants with your teeth. Both of you must do this, take two shots, or quit playing.', 'NSFW,2P'),
(9, 'NORMAL', 'Spin around 10 times then try to walk in a straight line or drink tree times.', 'SFW'),
(10, 'NORMAL', 'Take a shot of hot souce or finish yout drink. If the host doesn\'t have hot souce, they finish their drink.', 'SFW,FOOD'),
(11, 'HARD', 'Dm your crush or finish your drink.', 'SFW,PHONE');

-- --------------------------------------------------------

--
-- Tabellstruktur `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
CREATE TABLE IF NOT EXISTS `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumpning av Data i tabell `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20201002183024', '2020-10-02 18:30:38', 38),
('DoctrineMigrations\\Version20201002220045', '2020-10-02 22:01:11', 109);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
