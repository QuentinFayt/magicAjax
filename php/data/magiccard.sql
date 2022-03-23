-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 23 mars 2022 à 11:50
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `card`
--

INSERT INTO `card` (`card_id`, `card_name`, `card_cost`, `card_color`, `card_legendary_state`, `card_type`, `card_subtype`, `card_effect`, `card_power`, `card_toughness`, `card_rarity`, `card_edition`) VALUES
(1, 'Animar, Soul of Elements', '1-Bu_1-R_1-G', 'Blue-Red-Green', 1, 'Creature', 'Elemental', 'Protected from white and from black\n\nWhenever you cast a creature spell, put a +1/+1 counter on Animar, Soul of Elements.\n\nCreature spells you cast cost -_1-N_- less to cast for each +1/+1 counter on Animar.', 1, 1, 'Mythic', 'Master 25'),
(2, 'Feather, the Redeemed', '1-R_2-W', 'Red-White', 1, 'Creature', 'Angel', 'Flying\nWhenever you cast an instant or a sorcery spell that targets a creature you control, exile that card instead of putting it to your graveyard as it resolves. If you do, return it to your hand at the beginning of the next end step.', 3, 4, 'Mythic', 'War of the Spark'),
(3, 'Atraxa, Praetors\' Voice', '1-G_1-W_1-Bu_1-B', 'Green-White-Blue-Black', 1, 'Creature', 'Angel Horror', 'Flying, vigilance, deathtouch, lifelink\nAt the beginning of your end step, proliferate. (Choose any number of permanents and/or players, then give each another counter of each kind already there.)', 4, 4, 'Mythic', 'Commander Anthology Volume 2'),
(4, 'Cabal Coffers', '', 'Black', 0, 'Land', '', '-_2-N_-, -_Tap_- : Add -_1-B_- for each swamps you control.', 0, 0, 'Mythic', 'Torment'),
(5, 'Urborg, Tomb of Yawgmoth', '', 'Black', 1, 'Land', '', 'Each land is a Swamp in addition to its other land types.', 0, 0, 'Mythic', 'Magic 2015 Core Set'),
(6, 'Zendikar Resurgent', '5-N_2-G', 'Green', 0, 'Enchantment', '', 'Whenever you tap a land for mana, add one mana of any type that land produced. \n(The types of mana are white, blue, black, red, green, and colorless.)\nWhenever you cast a creature spell, draw a card.', 0, 0, 'Rare', 'Oath of the Gatewatch'),
(7, 'Electrodominance', 'X-N_2-R', 'Red', 0, 'Instant', '', 'Electrodominance deals -_X_- damage to any target. You may cast a spell with mana value -_X_- or less from your hand without paying its mana cost.', 0, 0, 'Rare', 'Ravnica Allegiance'),
(8, 'Omniscience', '7-N_3-Bu', 'Blue', 0, 'Enchantment', '', 'You may cast spells from your hand without paying their mana costs.', 0, 0, 'Mythic', 'Core Set 2019'),
(9, 'Steelshaper\'s Gift', '1-W', 'White', 0, 'Sorcery', '', 'Search your library for an Equipment card, reveal that card, put it into your hand, then shuffle.', 0, 0, 'Uncommon', 'Fifth Dawn'),
(10, 'Sword of Feast and Famine', '3-N', 'ColorLess', 0, 'Artifact', 'Equipment', 'Equipped creature gets +2/+2 and has protection from black and from green.\nWhenever equipped creature deals combat damage to a player, that player discards a card and you untap all lands you control.\nEquip -_2-N_-', 0, 0, 'Mythic', 'Mirrodin Besieged');
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
