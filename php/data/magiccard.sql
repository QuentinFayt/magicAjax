-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 18 mars 2022 à 10:45
-- Version du serveur : 8.0.27
-- Version de PHP : 8.0.13

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `magiccard`
--
CREATE DATABASE IF NOT EXISTS `magiccard` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `magiccard`;

-- --------------------------------------------------------

--
-- Structure de la table `card`
--

DROP TABLE IF EXISTS `card`;
CREATE TABLE IF NOT EXISTS `card` (
  `card_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `card_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `card_cost` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `card_color` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `card_legendary_state` tinyint(1) NOT NULL DEFAULT '0',
  `card_type` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `card_subtype` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `card_effect` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `card_power` tinyint UNSIGNED NOT NULL DEFAULT '0',
  `card_toughness` tinyint UNSIGNED NOT NULL DEFAULT '0',
  `card_rarity` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `card_edition` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`card_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `card`
--

INSERT INTO `card` (`card_id`, `card_name`, `card_cost`, `card_color`, `card_legendary_state`, `card_type`, `card_subtype`, `card_effect`, `card_power`, `card_toughness`, `card_rarity`, `card_edition`) VALUES
(1, 'Animar, Soul of Elements', '1Bu1R1G', 'Blue-Red-Green', 1, 'Creature', 'Elemental', 'Protected from white and from black\r\n\r\nWhenever you cast a creature spell, put a +1/+1 counter on Animar, Soul of Elements.\r\n\r\nCreature spells you cast cost 1N less to cast for each +1/+1 counter on Animar.', 1, 1, 'Mythic', 'Master 25'),
(2, 'Feather, the Redeemed', '1R2W', 'Red-White', 1, 'Creature', 'Angel', 'Flying\r\nWhenever you cast an instant or a sorcery spell that targets a creature you control, exile that card instead of putting it to your graveyard as it resolves. If you do, return it to your hand at the beginning of the next end step.', 3, 4, 'Mythic', 'War of the Spark'),
(3, 'Atraxa, Praetors\' Voice', '1G1W1Bu1B', 'Green-White-Blue-Black', 1, 'Creature', 'Angel Horror', 'Flying, vigilance, deathtouch, lifelink\r\nAt the beginning of your end step, proliferate. (Choose any number of permanents and/or players, then give each another counter of each kind already there.)', 4, 4, 'Mythic', 'Commander Anthology Volume 2'),
(4, 'Cabal Coffers', '', 'None', 0, 'Land', '', '2N, Tap-it : Add 1 Black for each swamps you control.', 0, 0, 'Mythic', 'Torment'),
(5, 'Urborg, Tomb of Yawgmoth', '', 'None', 1, 'Land', '', 'Each land is a Swamp in addition to its other land types.', 0, 0, 'Mythic', 'Magic 2015 Core Set');
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
