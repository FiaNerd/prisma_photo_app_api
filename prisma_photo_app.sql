-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Värd: localhost:8889
-- Tid vid skapande: 22 feb 2023 kl 16:35
-- Serverversion: 5.7.34
-- PHP-version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `prisma_photo_app`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `Album`
--

CREATE TABLE `Album` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `Album`
--

INSERT INTO `Album` (`id`, `title`, `user_id`) VALUES
(4, 'your life', 1),
(8, 'patch my album', 8),
(10, 'someone elses life', 8),
(11, 'verkar funka', 8);

-- --------------------------------------------------------

--
-- Tabellstruktur `Photo`
--

CREATE TABLE `Photo` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `Photo`
--

INSERT INTO `Photo` (`id`, `title`, `url`, `comment`, `user_id`) VALUES
(2, 'evergrey live', 'https://evergrey.net/wp-content/uploads/2022/03/Evergrey-2022-cover-art-3000x3000-1.jpg', 'Gött', 1),
(4, 'evergrey live', 'https://evergrey.net/wp-content/uploads/2022/03/Evergrey-2022-cover-art-3000x3000-1.jpg', 'Gött', 1),
(8, 'nissan', 'https://evergrey.net/wp-content/uploads/2022/03/Evergrey-2022-cover-art-3000x3000-1.jpg', 'se om det går', 8),
(10, 'hej2', 'https://evergrey.net/wp-content/uploads/2022/03/Evergrey-2022-cover-art-3000x3000-1.jpg', 'se om det går', 8),
(11, 'test', 'https://evergrey.net/wp-content/uploads/2022/03/Evergrey-2022-cover-art-3000x3000-1.jpg', 'se om det går', 8),
(12, 'seom det uppdateras', 'https://evergrey.net/wp-content/uploads/2022/03/Evergrey-2022-cover-art-3000x3000-1.jpg', 'Gött', 8),
(13, 'piggsvin', 'https://images.aftonbladet-cdn.se/v2/images/4c5f9402-597a-49a0-8491-a3e65d9e8984?fit=crop&format=auto&h=800&q=50&w=600&s=30324a11e8d316e37f52a74d1a31c17a24591156', 'A strange Piggsvin', 1);

-- --------------------------------------------------------

--
-- Tabellstruktur `User`
--

CREATE TABLE `User` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `User`
--

INSERT INTO `User` (`id`, `email`, `password`, `first_name`, `last_name`) VALUES
(1, 'user@nomail.com', '$2b$10$j.Jtl/0J4U2DbdIV1K4BceZ2Tf8PjoOImGPGMv15ZrIjs1OPwvqw2', 'pigg', 'svin'),
(2, 'hell_boy@nomail.com', '$2b$10$2AlO.DWIa4Yx9WaK6ryQhOTW8N7BS3gbp/y9NxyXUHFK73COV0sTm', 'pigg', 'svin'),
(3, '2hell_boy@nomail.com', '$2b$10$ySJ0IV9hdkEIMn6gBNCBqen0oLTw6dEVGZhh6.alKRo7OlTEDIRBS', 'pigg', 'svin'),
(4, 'hell_boy2@nomail.com', '$2b$10$1maDnaYWadhamMHduWgWjOqM5ejz6tmzI1fMoTzNwhOKrnX9sp0Hi', 'pigg', 'svin'),
(5, 'hell_boy3@nomail.com', '$2b$10$CUd2H8agenB6DA18DZH0UOVuWrRHe18QTWWpQJX.Iaw/uitJheLUa', 'pigg', 'svin'),
(6, 'hell_boy4@nomail.com', '$2b$10$3YjRf/v0NdWuFAy4kLfgmeez9FWulNs8WjMrOkixep1kjaht.EHCq', 'pigg', 'svin'),
(7, 'hell_boy5@nomail.com', '$2b$10$RkEkffqZTFduaRjq1R749.JMOlw0n/pLDSzblfBZVwctvhGyfeu7e', 'pigg', 'svin'),
(8, 'hallow@nomail.com', '$2b$10$iX04bNsHh10.dZOD7hFPYOVgHHgwxM35ofAqlB4DeVhthtu5k36LG', 'linder', 'mann'),
(9, 'hallow8@nomail.com', '$2b$10$8gGqND45l.aW0JbY3piGE.N1mh/CedfM8gqbTUOBDyV35kQ1UR9XW', 'linder', 'mann'),
(10, 'hallow9@nomail.com', '$2b$10$ruP1GUh5qmw16FFn.oyl3etjVwqc5PCXeiwhNP6l0YD/3NsG.r8nm', 'linder', 'mann'),
(11, 'hallow91@nomail.com', '$2b$10$JK3kEQa3cE1ZL1rB4q.eFut5Q2WNYl2QqNJ9HEb0vXD/67dFf8HjC', 'linder', 'mann'),
(12, 'devel6667@nomail.com', '$2b$10$3OUgqOp07WbnhzYllURPn.Ki.hBQwCaSANt2Q9xtBYUtQfqdDmOiS', 'devel', 'hell'),
(13, 'devel666@nomail.com', '$2b$10$UzFULCx64OasIF0xwD4X5eJIb7M4LR2Qgcgs1EjVZixEe/HuovXCq', 'devel', 'hell');

-- --------------------------------------------------------

--
-- Tabellstruktur `_AlbumToPhoto`
--

CREATE TABLE `_AlbumToPhoto` (
  `A` int(10) UNSIGNED NOT NULL,
  `B` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `_AlbumToPhoto`
--

INSERT INTO `_AlbumToPhoto` (`A`, `B`) VALUES
(4, 4);

-- --------------------------------------------------------

--
-- Tabellstruktur `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('b5dc0503-a16e-4c4d-84f6-711573c8fb83', 'baedf4521df16b85b293d36964d5ce6d5225f2fd945845e8132882f3cc9f53d8', '2023-02-20 18:59:50.684', '20230220185950_init', NULL, NULL, '2023-02-20 18:59:50.455', 1);

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `Album`
--
ALTER TABLE `Album`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Album_user_id_fkey` (`user_id`);

--
-- Index för tabell `Photo`
--
ALTER TABLE `Photo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Photo_user_id_fkey` (`user_id`);

--
-- Index för tabell `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Index för tabell `_AlbumToPhoto`
--
ALTER TABLE `_AlbumToPhoto`
  ADD UNIQUE KEY `_AlbumToPhoto_AB_unique` (`A`,`B`),
  ADD KEY `_AlbumToPhoto_B_index` (`B`);

--
-- Index för tabell `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `Album`
--
ALTER TABLE `Album`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT för tabell `Photo`
--
ALTER TABLE `Photo`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT för tabell `User`
--
ALTER TABLE `User`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `Album`
--
ALTER TABLE `Album`
  ADD CONSTRAINT `Album_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON UPDATE CASCADE;

--
-- Restriktioner för tabell `Photo`
--
ALTER TABLE `Photo`
  ADD CONSTRAINT `Photo_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON UPDATE CASCADE;

--
-- Restriktioner för tabell `_AlbumToPhoto`
--
ALTER TABLE `_AlbumToPhoto`
  ADD CONSTRAINT `_AlbumToPhoto_A_fkey` FOREIGN KEY (`A`) REFERENCES `Album` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_AlbumToPhoto_B_fkey` FOREIGN KEY (`B`) REFERENCES `Photo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
