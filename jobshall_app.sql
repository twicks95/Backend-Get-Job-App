-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2021 at 05:25 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jobshall_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

CREATE TABLE `experiences` (
  `experience_id` int(11) NOT NULL,
  `worker_id` int(11) NOT NULL,
  `experience_company` varchar(100) NOT NULL,
  `experience_position` varchar(100) NOT NULL,
  `experience_date_start` date NOT NULL,
  `experience_date_end` date NOT NULL,
  `experience_desc` varchar(255) NOT NULL,
  `experience_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `experience_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `experiences`
--

INSERT INTO `experiences` (`experience_id`, `worker_id`, `experience_company`, `experience_position`, `experience_date_start`, `experience_date_end`, `experience_desc`, `experience_created_at`, `experience_updated_at`) VALUES
(1, 38, 'sada222', 'sadasd', '2021-05-15', '2021-08-21', 'z1', '0000-00-00 00:00:00', '2021-05-23 19:08:00'),
(2, 39, '123', '123', '2021-05-23', '2021-09-30', 'a', '2021-05-23 19:16:30', NULL),
(3, 40, '123', '123', '2021-05-01', '2021-05-31', '2133', '2021-05-23 20:01:57', NULL),
(4, 40, 'dfsd', 'wqeq', '2021-05-06', '2021-05-27', 'qweqwe', '2021-05-23 20:13:19', NULL),
(6, 42, '123', '123', '2021-05-01', '2021-05-25', '123', '2021-05-23 23:44:48', NULL),
(7, 41, 'PT.Arkademy', 'Web developer', '2020-11-09', '2021-05-24', 'Aku', '2021-05-24 00:10:24', NULL),
(8, 45, '123', '123', '2021-05-01', '2021-05-28', 'sq', '2021-05-24 08:03:21', NULL),
(9, 46, '123', '12312', '2021-05-01', '2021-06-30', '123', '2021-05-24 08:06:40', NULL),
(10, 49, 'Arkademy', 'Web', '2020-08-10', '2021-05-24', 'Arkademy', '2021-05-24 09:31:02', NULL),
(12, 53, 'Arka', 'Demy', '2020-03-24', '2021-09-29', 'A', '2021-05-24 11:56:18', NULL),
(13, 53, 'qweqw', 'Front1', '2021-04-14', '2021-08-24', 'A', '2021-05-24 12:01:07', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `portfolios`
--

CREATE TABLE `portfolios` (
  `portfolio_id` int(11) NOT NULL,
  `worker_id` int(11) NOT NULL,
  `portfolio_name` varchar(100) NOT NULL,
  `portfolio_link_repo` varchar(255) NOT NULL,
  `portfolio_image` varchar(255) NOT NULL,
  `portfolio_created_at` datetime DEFAULT current_timestamp(),
  `portfolio_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `portfolios`
--

INSERT INTO `portfolios` (`portfolio_id`, `worker_id`, `portfolio_name`, `portfolio_link_repo`, `portfolio_image`, `portfolio_created_at`, `portfolio_updated_at`) VALUES
(1, 38, 'asd', '123', '', '2021-05-23 17:11:32', NULL),
(2, 38, '123', '123', '', '2021-05-23 19:08:09', NULL),
(3, 0, 'asd', 'asddsa', '', NULL, '2021-05-24 07:46:16'),
(5, 40, 'sabisabi', 'dfgdf', '2021-05-23T15-13-29.996Zpostman.png', NULL, '2021-05-23 22:13:30'),
(17, 40, 'sad', 'sadas', '2021-05-23T14-14-28.334Zpostman.png', '2021-05-23 21:14:28', NULL),
(24, 40, '', '', '2021-05-23T15-33-14.265Zasdsadasd.png', '2021-05-23 22:33:14', NULL),
(25, 40, '', '', '2021-05-23T15-34-23.142Zpostman.png', '2021-05-23 22:34:23', NULL),
(27, 42, 'asd', 'asddsa', '2021-05-23T16-42-45.118Z121231232.png', NULL, '2021-05-23 23:42:45'),
(28, 42, '123', '1231', '2021-05-23T16-44-57.085Z220px-Bootstrap_logo.svg.png', '2021-05-23 23:44:57', NULL),
(29, 41, 'Jobshall', 'www.google.com', '2021-05-23T17-10-46.890Zhtml.png', '2021-05-24 00:10:46', NULL),
(30, 0, '', '', '', '2021-05-24 07:46:19', NULL),
(31, 39, '', '', '', '2021-05-24 07:49:34', NULL),
(32, 39, '', '', '2021-05-24T00-49-47.456ZUntitled.png', '2021-05-24 07:49:48', NULL),
(33, 45, 'asd', '1', '2021-05-24T01-00-17.406ZUntitled.png', '2021-05-24 08:00:17', NULL),
(34, 46, '213', '213', '2021-05-24T01-06-47.479Zq.png', '2021-05-24 08:06:47', NULL),
(36, 53, 'asd', 'ssAsasd', '2021-05-24T04-53-49.383ZUntitled.png', '2021-05-24 11:53:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `recruiters`
--

CREATE TABLE `recruiters` (
  `recruiter_id` int(11) NOT NULL,
  `recruiter_verfication` varchar(100) NOT NULL DEFAULT '0',
  `role` varchar(100) NOT NULL DEFAULT 'recruiter',
  `recruiter_name` varchar(100) NOT NULL,
  `recruiter_domicile` varchar(100) NOT NULL,
  `recruiter_email` varchar(50) NOT NULL,
  `recruiter_instagram` varchar(20) NOT NULL,
  `recruiter_linked_id` varchar(20) NOT NULL,
  `recruiter_phone` varchar(20) NOT NULL,
  `recruiter_password` varchar(255) NOT NULL,
  `recruiter_company` varchar(100) NOT NULL,
  `recruiter_field_company` varchar(100) NOT NULL,
  `recruiter_description` varchar(255) NOT NULL,
  `recruiter_image` varchar(255) NOT NULL,
  `recruiter_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `recruiter_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recruiters`
--

INSERT INTO `recruiters` (`recruiter_id`, `recruiter_verfication`, `role`, `recruiter_name`, `recruiter_domicile`, `recruiter_email`, `recruiter_instagram`, `recruiter_linked_id`, `recruiter_phone`, `recruiter_password`, `recruiter_company`, `recruiter_field_company`, `recruiter_description`, `recruiter_image`, `recruiter_created_at`, `recruiter_updated_at`) VALUES
(10, '0', 'recruiter', 'Devante New goh', 'Jakarta, Indonesia', 'kaden56@concavi.com', 'kaden_concavi', 'Kaden Concavi', '072291564', '$2b$10$CyH3U3PadawkyVE2/Kru.e1F3r1mdwhtu2pZZhMcQp9hBxpfB/CJO', 'Hudson Ltd', 'Tech Company', 'Lorem ipsum dolor sit amet', '2021-05-22T07-39-19.832ZAsset 2@4x.png', '2021-05-22 08:35:43', '2021-05-22 15:00:26'),
(11, '0', 'recruiter', 'test', '', '123@gmail.com', '', '', '123', '$2b$10$ta91L1rGlZhIqa.0hdZzS.uSJHwiSwLLT4OBBVZi3CP.k.vojZdX.', '123', '123', '', '', '2021-05-23 17:20:50', NULL),
(12, '0', 'recruiter', 'test', '', 'test111@gmail.com', '', '', '123', '$2b$10$pD42Tm1g/mY.6xLd.F1X5OWhJBpauNSXTDI7W1AlaZpinF1oPg7e.', '123', '123', '', '', '2021-05-23 19:28:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `skill_id` int(11) NOT NULL,
  `worker_id` int(11) NOT NULL,
  `skill_name` varchar(100) NOT NULL,
  `skill_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `skill_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`skill_id`, `worker_id`, `skill_name`, `skill_created_at`, `skill_updated_at`) VALUES
(17, 40, '123', '2021-05-23 19:59:58', NULL),
(18, 40, '123123', '2021-05-23 20:12:19', NULL),
(20, 42, '123', '2021-05-23 23:44:13', NULL),
(21, 41, 'Javascript', '2021-05-24 00:09:29', NULL),
(22, 41, 'php', '2021-05-24 00:09:33', NULL),
(23, 41, 'golang', '2021-05-24 00:09:37', NULL),
(24, 39, '123', '2021-05-24 07:52:12', NULL),
(25, 45, '123', '2021-05-24 07:58:27', NULL),
(26, 46, '123', '2021-05-24 08:06:25', NULL),
(27, 48, '123', '2021-05-24 08:53:28', NULL),
(29, 49, 'Golang', '0000-00-00 00:00:00', '2021-05-24 10:07:18'),
(31, 11, 'Java', '2021-05-24 09:52:35', NULL),
(34, 53, '123', '2021-05-24 11:51:31', NULL),
(35, 59, 'PHP', '2021-06-30 14:15:57', NULL),
(36, 61, 'Java', '2021-06-30 16:37:02', NULL),
(39, 49, 'Java', '2021-07-01 14:38:59', NULL),
(40, 49, 'Ruby', '2021-07-01 14:39:02', '2021-07-01 16:30:11'),
(41, 59, 'Javascript', '2021-07-01 16:19:21', NULL),
(42, 59, 'Golang', '2021-07-01 16:19:25', NULL),
(43, 49, 'Swift', '2021-07-01 16:30:19', NULL),
(44, 49, 'Html', '2021-07-01 16:30:23', NULL),
(45, 62, 'React', '2021-07-01 16:48:51', NULL),
(108, 63, 'EOL', '2021-07-01 17:18:52', NULL),
(109, 64, 'Title Insurance', '2021-07-01 17:18:52', NULL),
(110, 65, 'NYMEX', '2021-07-01 17:18:52', NULL),
(111, 66, 'DTI', '2021-07-01 17:18:52', NULL),
(112, 67, 'RTF', '2021-07-01 17:18:52', NULL),
(113, 68, 'Urban', '2021-07-01 17:18:52', NULL),
(114, 69, 'HCS12', '2021-07-01 17:18:52', NULL),
(115, 70, 'Siding', '2021-07-01 17:18:52', NULL),
(116, 71, 'XNA', '2021-07-01 17:18:52', NULL),
(117, 72, 'dtSearch', '2021-07-01 17:18:52', NULL),
(118, 73, 'MyBatis', '2021-07-01 17:18:52', NULL),
(119, 74, 'GPS Devices', '2021-07-01 17:18:52', NULL),
(120, 75, 'Sap Fm', '2021-07-01 17:18:52', NULL),
(121, 76, 'Sports Injuries', '2021-07-01 17:18:52', NULL),
(122, 77, 'DVD', '2021-07-01 17:18:52', NULL),
(123, 78, 'JSONP', '2021-07-01 17:18:52', NULL),
(124, 79, 'Mixed Signal', '2021-07-01 17:18:52', NULL),
(125, 80, 'Utility Locating', '2021-07-01 17:18:52', NULL),
(126, 81, 'MXG', '2021-07-01 17:18:52', NULL),
(127, 82, 'PPO', '2021-07-01 17:18:52', NULL),
(128, 83, 'InDesign', '2021-07-01 17:18:52', NULL),
(129, 84, 'TBB', '2021-07-01 17:18:52', NULL),
(130, 85, 'Guerrilla Marketing', '2021-07-01 17:18:52', NULL),
(131, 86, 'Kantar', '2021-07-01 17:18:52', NULL),
(132, 87, 'GMAT', '2021-07-01 17:18:52', NULL),
(133, 88, 'GSS', '2021-07-01 17:18:53', NULL),
(134, 89, 'CGEIT', '2021-07-01 17:18:53', NULL),
(135, 90, 'AAR', '2021-07-01 17:18:53', NULL),
(136, 91, 'AJAX', '2021-07-01 17:18:53', NULL),
(137, 92, 'Web Analytics', '2021-07-01 17:18:53', NULL),
(138, 93, 'GIS systems', '2021-07-01 17:18:53', NULL),
(139, 94, 'xPC Target', '2021-07-01 17:18:53', NULL),
(140, 95, 'QA Automation', '2021-07-01 17:18:53', NULL),
(141, 96, 'TSCM', '2021-07-01 17:18:53', NULL),
(142, 97, 'Swing', '2021-07-01 17:18:53', NULL),
(143, 98, 'NICE Call Recording', '2021-07-01 17:18:53', NULL),
(144, 99, 'Zimbra', '2021-07-01 17:18:53', NULL),
(145, 100, 'Product Launch', '2021-07-01 17:18:53', NULL),
(146, 101, 'JVM', '2021-07-01 17:18:53', NULL),
(147, 102, 'On Location', '2021-07-01 17:18:53', NULL),
(148, 103, 'HLA', '2021-07-01 17:18:53', NULL),
(149, 104, 'Urbanism', '2021-07-01 17:18:53', NULL),
(150, 105, 'SFP', '2021-07-01 17:18:53', NULL),
(151, 106, 'Study Abroad Programs', '2021-07-01 17:18:53', NULL),
(152, 107, 'TPM', '2021-07-01 17:18:53', NULL),
(153, 108, 'UC4', '2021-07-01 17:18:53', NULL),
(154, 109, 'Newspapers', '2021-07-01 17:18:53', NULL),
(155, 110, 'JDA', '2021-07-01 17:18:53', NULL),
(156, 111, 'Due Diligence', '2021-07-01 17:18:53', NULL),
(157, 112, 'nDo', '2021-07-01 17:18:53', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `workers`
--

CREATE TABLE `workers` (
  `worker_id` int(11) NOT NULL,
  `worker_verfication` varchar(100) NOT NULL DEFAULT '0',
  `role` varchar(100) NOT NULL DEFAULT 'worker',
  `worker_name` varchar(100) NOT NULL,
  `worker_domicile` varchar(100) NOT NULL,
  `worker_status` enum('freelance','fulltime') DEFAULT NULL,
  `worker_job_desk` varchar(100) NOT NULL,
  `worker_phone` varchar(20) NOT NULL,
  `worker_email` varchar(50) NOT NULL,
  `worker_password` varchar(255) NOT NULL,
  `worker_instagram` varchar(20) NOT NULL,
  `worker_github` varchar(20) NOT NULL,
  `worker_gitlab` varchar(20) NOT NULL,
  `worker_description` varchar(255) NOT NULL,
  `worker_image` varchar(255) NOT NULL,
  `worker_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `worker_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `workers`
--

INSERT INTO `workers` (`worker_id`, `worker_verfication`, `role`, `worker_name`, `worker_domicile`, `worker_status`, `worker_job_desk`, `worker_phone`, `worker_email`, `worker_password`, `worker_instagram`, `worker_github`, `worker_gitlab`, `worker_description`, `worker_image`, `worker_created_at`, `worker_updated_at`) VALUES
(49, '0', 'worker', 'alfin12', 'bogor', 'fulltime', 'Front End', '123', 'alfin@gmail.com', '$2b$10$iozUjpckKAcq8rH5FbL0AOBUyGgtFtkch91Kfb3wph8lsI.DJgMP2', 'alfin', 'alfin', 'alfin', 'alfin', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-05-24 09:06:50', '2021-07-01 01:26:06'),
(59, '0', 'worker', 'Foas', 'jakarta', 'freelance', 'sad', '122', 'asd@123', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', '123', '123', '3123', '12312', '2021-06-30T10-09-31.950Z2162.jpg', '2021-06-30 16:21:24', '2021-06-30 10:09:31'),
(61, '0', 'worker', 'Zasa', 'Zimbwabe', 'freelance', 'sad', '122', 'asd@123', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', '123', '123', '3123', '12312', '2021-06-30T10-09-31.950Z2162.jpg', '2021-06-30 16:21:24', '2021-06-30 10:09:31'),
(62, '0', 'worker', 'Gaga', 'Sudan', 'freelance', 'sad', '122', 'asd@1233', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', '123', '123', '3123', '12312', '2021-06-30T10-09-31.950Z2162.jpg', '2021-06-30 16:21:24', '2021-06-30 10:09:31'),
(63, '1', 'worker', 'Hamish Ferrick', 'Chengjiao', 'fulltime', 'Operator', '3356200708', 'hferrick0@ucsd.edu', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'hferrick0', 'hferrick0', 'hferrick0', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:00', NULL),
(64, '1', 'worker', 'Giovanna Fugere', 'Qingshan', 'freelance', 'Safety Technician III', '3564428276', 'gfugere1@time.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'gfugere1', 'gfugere1', 'gfugere1', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:00', NULL),
(65, '1', 'worker', 'Ken Egre', 'Pārūn', 'fulltime', 'Marketing Assistant', '5066800227', 'kegre2@omniture.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'kegre2', 'kegre2', 'kegre2', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:00', NULL),
(66, '1', 'worker', 'Loralie Garfoot', 'Saint-Pierre-des-Corps', 'freelance', 'Financial Advisor', '3721347590', 'lgarfoot3@dedecms.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'lgarfoot3', 'lgarfoot3', 'lgarfoot3', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:00', NULL),
(67, '1', 'worker', 'Coleen Botcherby', 'Pingshui', 'freelance', 'Software Test Engineer IV', '1058279690', 'cbotcherby4@usatoday.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'cbotcherby4', 'cbotcherby4', 'cbotcherby4', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:00', NULL),
(68, '1', 'worker', 'Ruttger Piers', 'Longkali', 'fulltime', 'Actuary', '6785636331', 'rpiers5@berkeley.edu', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'rpiers5', 'rpiers5', 'rpiers5', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:00', NULL),
(69, '1', 'worker', 'Mimi Bissatt', 'Kodyma', 'fulltime', 'Marketing Manager', '7686787576', 'mbissatt6@hc360.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'mbissatt6', 'mbissatt6', 'mbissatt6', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:00', NULL),
(70, '1', 'worker', 'Julietta Sidnall', 'Belomorsk', 'freelance', 'Sales Representative', '3132428911', 'jsidnall7@globo.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'jsidnall7', 'jsidnall7', 'jsidnall7', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:00', NULL),
(71, '1', 'worker', 'Phylys Mallinder', '‘Ibwayn', 'freelance', 'Nurse', '9442049129', 'pmallinder8@rakuten.co.jp', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'pmallinder8', 'pmallinder8', 'pmallinder8', 'Fusce consequat. Nulla nisl. Nunc nisl.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:00', NULL),
(72, '1', 'worker', 'Ardenia Coaker', 'São Bento', 'freelance', 'Director of Sales', '3172280181', 'acoaker9@webs.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'acoaker9', 'acoaker9', 'acoaker9', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:00', NULL),
(73, '1', 'worker', 'Sylvia Cloney', 'Ica', 'freelance', 'Systems Administrator II', '6914188381', 'scloneya@intel.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'scloneya', 'scloneya', 'scloneya', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:01', NULL),
(74, '1', 'worker', 'Noelyn Mayhead', 'Ruilin', 'fulltime', 'Assistant Media Planner', '4733042873', 'nmayheadb@redcross.org', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'nmayheadb', 'nmayheadb', 'nmayheadb', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:01', NULL),
(75, '1', 'worker', 'Florina Lytle', 'Nobinobi', 'freelance', 'Software Engineer II', '6056348277', 'flytlec@usnews.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'flytlec', 'flytlec', 'flytlec', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:01', NULL),
(76, '1', 'worker', 'Abramo Calbrathe', 'Pont-Rouge', 'freelance', 'Cost Accountant', '8845108009', 'acalbrathed@dagondesign.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'acalbrathed', 'acalbrathed', 'acalbrathed', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:01', NULL),
(77, '1', 'worker', 'Eustace Hartley', 'Sychëvo', 'freelance', 'GIS Technical Architect', '8586965434', 'ehartleye@mayoclinic.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'ehartleye', 'ehartleye', 'ehartleye', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:01', NULL),
(78, '1', 'worker', 'Lucius Pays', 'Yanghou', 'freelance', 'Director of Sales', '9562433657', 'lpaysf@newsvine.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'lpaysf', 'lpaysf', 'lpaysf', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:01', NULL),
(79, '1', 'worker', 'Carce Aucock', 'Chimanimani', 'fulltime', 'Software Engineer II', '3273834677', 'caucockg@berkeley.edu', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'caucockg', 'caucockg', 'caucockg', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:01', NULL),
(80, '1', 'worker', 'Herculie Garth', 'Chemal', 'fulltime', 'Office Assistant II', '6666959957', 'hgarthh@umich.edu', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'hgarthh', 'hgarthh', 'hgarthh', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:01', NULL),
(81, '1', 'worker', 'Betti Malins', 'Lamu', 'freelance', 'Internal Auditor', '2062509143', 'bmalinsi@storify.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'bmalinsi', 'bmalinsi', 'bmalinsi', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:01', NULL),
(82, '1', 'worker', 'Fonz Mottini', 'Fier-Çifçi', 'fulltime', 'Junior Executive', '3195302320', 'fmottinij@nsw.gov.au', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'fmottinij', 'fmottinij', 'fmottinij', 'Fusce consequat. Nulla nisl. Nunc nisl.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:01', NULL),
(83, '1', 'worker', 'Liuka Wiggans', 'Floridablanca', 'fulltime', 'Senior Cost Accountant', '7681014389', 'lwiggansk@latimes.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'lwiggansk', 'lwiggansk', 'lwiggansk', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:01', NULL),
(84, '1', 'worker', 'Andras Corderoy', 'Suraż', 'fulltime', 'Administrative Officer', '2964083612', 'acorderoyl@google.co.uk', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'acorderoyl', 'acorderoyl', 'acorderoyl', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:01', NULL),
(85, '1', 'worker', 'Leda Stanlack', 'Stepnogorsk', 'freelance', 'Quality Control Specialist', '9275143951', 'lstanlackm@mapquest.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'lstanlackm', 'lstanlackm', 'lstanlackm', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:01', NULL),
(86, '1', 'worker', 'Jamesy Lightewood', 'Zhentou', 'fulltime', 'Senior Editor', '7841584014', 'jlightewoodn@pagesperso-orange.fr', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'jlightewoodn', 'jlightewoodn', 'jlightewoodn', 'Fusce consequat. Nulla nisl. Nunc nisl.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:01', NULL),
(87, '1', 'worker', 'Ag Cranston', 'Gununganyar', 'fulltime', 'Programmer II', '2626717112', 'acranstono@bloglovin.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'acranstono', 'acranstono', 'acranstono', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:01', NULL),
(88, '1', 'worker', 'Lilyan Cavie', 'Mae Sai', 'freelance', 'Account Representative I', '7603480566', 'lcaviep@nifty.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'lcaviep', 'lcaviep', 'lcaviep', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:01', NULL),
(89, '1', 'worker', 'Ermentrude Shelford', 'Kozy', 'fulltime', 'Senior Cost Accountant', '8349989941', 'eshelfordq@macromedia.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'eshelfordq', 'eshelfordq', 'eshelfordq', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:01', NULL),
(90, '1', 'worker', 'Reeva Van Niekerk', 'Auna', 'freelance', 'Operator', '4944958492', 'rvanr@sciencedaily.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'rvanr', 'rvanr', 'rvanr', 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:01', NULL),
(91, '1', 'worker', 'Collen Faulo', 'Chamalières', 'fulltime', 'VP Accounting', '3454422507', 'cfaulos@ebay.co.uk', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'cfaulos', 'cfaulos', 'cfaulos', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:01', NULL),
(92, '1', 'worker', 'Inger Siemantel', 'Lyon', 'fulltime', 'Financial Advisor', '4565263360', 'isiemantelt@opera.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'isiemantelt', 'isiemantelt', 'isiemantelt', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:01', NULL),
(93, '1', 'worker', 'Hanna Tenbrug', 'Kangalassy', 'freelance', 'General Manager', '6102454976', 'htenbrugu@skype.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'htenbrugu', 'htenbrugu', 'htenbrugu', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:01', NULL),
(94, '1', 'worker', 'Morganne Teasdale', 'Springfield', 'fulltime', 'Staff Accountant II', '4133306464', 'mteasdalev@intel.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'mteasdalev', 'mteasdalev', 'mteasdalev', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:02', NULL),
(95, '1', 'worker', 'Annamaria Tiernan', 'Shicong', 'freelance', 'Business Systems Development Analyst', '1553242672', 'atiernanw@hatena.ne.jp', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'atiernanw', 'atiernanw', 'atiernanw', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:02', NULL),
(96, '1', 'worker', 'Caressa Childs', 'Yermolino', 'fulltime', 'Accountant III', '1941807381', 'cchildsx@geocities.jp', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'cchildsx', 'cchildsx', 'cchildsx', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:02', NULL),
(97, '1', 'worker', 'Oby Commusso', 'Yihe', 'freelance', 'Cost Accountant', '6375047579', 'ocommussoy@usnews.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'ocommussoy', 'ocommussoy', 'ocommussoy', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:02', NULL),
(98, '1', 'worker', 'Elisabetta De Carlo', 'Vredenburg', 'freelance', 'Payment Adjustment Coordinator', '3257993661', 'edez@live.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'edez', 'edez', 'edez', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:02', NULL),
(99, '1', 'worker', 'Cordi Philo', 'Ospina', 'fulltime', 'Senior Editor', '8363331425', 'cphilo10@google.co.jp', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'cphilo10', 'cphilo10', 'cphilo10', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:02', NULL),
(100, '1', 'worker', 'Dorise Delhay', 'Javalera', 'freelance', 'Senior Quality Engineer', '1034640736', 'ddelhay11@icq.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'ddelhay11', 'ddelhay11', 'ddelhay11', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:02', NULL),
(101, '1', 'worker', 'Brooke Caddie', 'Manna', 'fulltime', 'Junior Executive', '1015711890', 'bcaddie12@moonfruit.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'bcaddie12', 'bcaddie12', 'bcaddie12', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:02', NULL),
(102, '1', 'worker', 'Leonardo McCafferky', 'Yuxi', 'freelance', 'VP Accounting', '1686106025', 'lmccafferky13@elegantthemes.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'lmccafferky13', 'lmccafferky13', 'lmccafferky13', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:02', NULL),
(103, '1', 'worker', 'Roscoe Doe', 'Komorniki', 'freelance', 'Occupational Therapist', '3468581765', 'rdoe14@t.co', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'rdoe14', 'rdoe14', 'rdoe14', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:02', NULL),
(104, '1', 'worker', 'Anitra Albiston', 'Cape Coast', 'freelance', 'Tax Accountant', '9537657988', 'aalbiston15@exblog.jp', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'aalbiston15', 'aalbiston15', 'aalbiston15', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:02', NULL),
(105, '1', 'worker', 'Lanni Grammer', 'Taganak', 'freelance', 'Financial Advisor', '8076535544', 'lgrammer16@tumblr.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'lgrammer16', 'lgrammer16', 'lgrammer16', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:02', NULL),
(106, '1', 'worker', 'Dewitt Muzzini', 'Guáimaro', 'freelance', 'Programmer IV', '9286723156', 'dmuzzini17@bbc.co.uk', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'dmuzzini17', 'dmuzzini17', 'dmuzzini17', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:02', NULL),
(107, '1', 'worker', 'Ottilie Augur', 'Jamālpur', 'freelance', 'Human Resources Manager', '7039833603', 'oaugur18@meetup.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'oaugur18', 'oaugur18', 'oaugur18', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:02', NULL),
(108, '1', 'worker', 'Hazel Zupa', 'Dapaong', 'fulltime', 'Nurse', '9497935543', 'hzupa19@about.me', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'hzupa19', 'hzupa19', 'hzupa19', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '2021-05-24T02-30-09.101Z220px-Bootstrap_logo.svg.png', '2021-07-01 17:05:02', NULL),
(109, '1', 'worker', 'Care Attwool', 'Nu’erbage', 'freelance', 'Payment Adjustment Coordinator', '7104871856', 'cattwool1a@gizmodo.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'cattwool1a', 'cattwool1a', 'cattwool1a', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:02', NULL),
(110, '1', 'worker', 'Bendicty Peregrine', 'Wudabao', 'freelance', 'Sales Representative', '4009151815', 'bperegrine1b@jalbum.net', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'bperegrine1b', 'bperegrine1b', 'bperegrine1b', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:02', NULL),
(111, '1', 'worker', 'Odette Angric', 'Makoba', 'freelance', 'Marketing Assistant', '5071292535', 'oangric1c@twitter.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'oangric1c', 'oangric1c', 'oangric1c', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:02', NULL),
(112, '1', 'worker', 'Jessica Nucator', 'Klyuchevskiy', 'fulltime', 'Marketing Manager', '1006748363', 'jnucator1d@yolasite.com', '$2b$10$zmt2njUShQnXBUkMK/GjyOm7eqwUfYhqyWFtuxBigzzf7fV7rern.', 'jnucator1d', 'jnucator1d', 'jnucator1d', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', '2021-06-30T10-09-31.950Z2162.jpg', '2021-07-01 17:05:02', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`experience_id`);

--
-- Indexes for table `portfolios`
--
ALTER TABLE `portfolios`
  ADD PRIMARY KEY (`portfolio_id`);

--
-- Indexes for table `recruiters`
--
ALTER TABLE `recruiters`
  ADD PRIMARY KEY (`recruiter_id`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`skill_id`);

--
-- Indexes for table `workers`
--
ALTER TABLE `workers`
  ADD PRIMARY KEY (`worker_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `experiences`
--
ALTER TABLE `experiences`
  MODIFY `experience_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `portfolios`
--
ALTER TABLE `portfolios`
  MODIFY `portfolio_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `recruiters`
--
ALTER TABLE `recruiters`
  MODIFY `recruiter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `skill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT for table `workers`
--
ALTER TABLE `workers`
  MODIFY `worker_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
