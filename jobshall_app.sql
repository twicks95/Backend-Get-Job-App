-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 23, 2021 at 12:02 PM
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
  `experience_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `experience_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `portfolios`
--

CREATE TABLE `portfolios` (
  `portfolio_id` int(11) DEFAULT NULL,
  `worker_id` int(11) NOT NULL,
  `portfolio_name` varchar(100) NOT NULL,
  `portfolio_link_repo` varchar(255) NOT NULL,
  `portfolio_image` varchar(255) NOT NULL,
  `portfolio_created_at` datetime DEFAULT current_timestamp(),
  `portfolio_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(10, '0', 'recruiter', 'Devante New goh', 'Jakarta, Indonesia', 'kaden56@concavi.com', 'kaden_concavi', 'Kaden Concavi', '072291564', '$2b$10$CyH3U3PadawkyVE2/Kru.e1F3r1mdwhtu2pZZhMcQp9hBxpfB/CJO', 'Hudson Ltd', 'Tech Company', 'Lorem ipsum dolor sit amet', '2021-05-22T07-39-19.832ZAsset 2@4x.png', '2021-05-22 08:35:43', '2021-05-22 15:00:26');

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
(1, 23, 'php', '2021-05-23 12:38:47', NULL),
(2, 24, 'php', '2021-05-23 12:39:01', NULL),
(3, 22, 'php. Java', '2021-05-23 12:40:20', NULL),
(4, 25, 'php.,Java. Javascript', '2021-05-23 12:46:51', NULL),
(5, 26, 'php , Java, Javascript, C++', '2021-05-23 12:47:13', NULL),
(6, 27, 'php ,  Javascript, C++', '2021-05-23 12:47:24', NULL),
(7, 28, 'Javascript, C++', '2021-05-23 12:47:34', NULL),
(8, 29, 'Javascript, C++, C#', '2021-05-23 12:47:59', NULL),
(9, 30, 'Golang, Javascript', '2021-05-23 12:48:26', NULL),
(10, 31, 'Golang, Javascript, PHP', '2021-05-23 12:48:43', NULL);

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
(22, '0', 'worker', 'Keith Young', '', 'freelance', '', '0135484986', 'nmurray@bookaholic.site', '$2b$10$9YXqgxR/MsXq/FdEyuJGp.ukC1GzbRJCuUM/eo2V8/i5VaeVfWAEK', '', '', '', '', '', '2021-05-22 09:02:47', NULL),
(23, '0', 'worker', 'Jonathan Young', '', 'freelance', '', '08636 399571', 'fmarshall@googl.win', '$2b$10$nUoFrVEOm/je8SrcKf9t.uzlKscORrZb3yDccIZI3tFcBw24f4If6', '', '', '', '', '', '2021-05-22 09:03:29', NULL),
(24, '0', 'worker', 'Aiden Marshall', '', 'freelance', '', '(0662) 262 0179', 'usmith@scamerahot.info', '$2b$10$iOxlsIqMaluG0Dawa7ImMObTUs3cj35cPvB5XsbT/K/Pb74sxdH02', '', '', '', '', '', '2021-05-22 09:03:58', NULL),
(25, '0', 'worker', 'Ray Cooper', '', 'freelance', '', '07498 01326', 'sbell@delaala.cd', '$2b$10$vMRdvH6tFi2ey4N.EM6c4eC.WO4zZVgs.iov9hZxT.feM9ksiuStu', '', '', '', '', '', '2021-05-22 09:04:21', NULL),
(26, '0', 'worker', 'Kaleb Paucek', '', 'freelance', '', '676-205-3934', 'gquigley@cupremplus.com', '$2b$10$6LqWBwzOUuwEf6ms4BMoheZi3.jy1HsIClDP18WUJgga9kv43gHei', '', '', '', '', '', '2021-05-22 09:04:47', NULL),
(27, '0', 'worker', 'Giles Bayer', '', 'freelance', '', '(309) 814-0622', 'twisozk@gmailni.com', '$2b$10$0ERiO3DQzfJeVIUiVXTRc.imFDidtGSSwhgCtEFf39ukcZ7scYOPi', '', '', '', '', '', '2021-05-22 09:05:10', NULL),
(28, '0', 'worker', 'Dereck Stark', '', 'freelance', '', '383-982-8610', 'kelleybrakus@homtaosi.com', '$2b$10$P5FCOHIcEkK.zmtqStWQ5.vebpZfRID4uvgxu0GXB07AmeaDxKq4.', '', '', '', '', '', '2021-05-22 09:05:34', NULL),
(29, '0', 'worker', 'Garrett Quitzon', '', 'freelance', '', '328-657-8815', 'sedrick60@halumail.com', '$2b$10$8hRgY8uJlmGSGbv1UBHGXui1zAW4ZO0ioZXSdDdfa84Or1hx.7tU.', '', '', '', '', '', '2021-05-22 09:05:55', NULL),
(30, '0', 'worker', 'Demario Donnelly', '', 'freelance', '', '+61258197969', 'oledner@poki.us', '$2b$10$Inn7aAQQCv.lBCI/GDYrB.DRCaswL/cyjTV3XT4i81x1eAWg0rPWK', '', '', '', '', '', '2021-05-22 09:06:14', NULL),
(31, '0', 'worker', 'Brendon Emmerich', '', 'freelance', '', '15907937', 'korbin55@kantuki.com', '$2b$10$4L1WWmML0HTyL6Y69EQUq.x6XBUjbhoKs8ri3ubnbkOGMfzsPQR4C', '', '', '', '', '', '2021-05-22 09:06:39', NULL),
(32, '0', 'worker', 'Remington Tremblay', '', 'freelance', '', '20366540', 'lazaro54@flcp929.com', '$2b$10$kJWGVRbCwuF7qi6TitBSMeKopf8dgtwwtHilqkwJcVBHPEg0mXlkK', '', '', '', '', '', '2021-05-22 09:07:03', NULL),
(33, '0', 'worker', 'Deven Hudson', '', 'freelance', '', '(08)-4534-0526', 'reillymara@billseo.com', '$2b$10$M..1.FRs5LHYi.WMLyi6mOXEudSwX5DQMzUIWdxGDeB0oK2iGuA2.', '', '', '', '', '', '2021-05-22 09:07:23', NULL),
(34, '0', 'worker', 'Dereck Johnson', '', NULL, '', '890911192', 'dereck.johnson@mail.com', '$2b$10$rYnks9duuOdwl.McmHw8meRfdXNRBccP.OcysqoUBhUN7lvpmDota', '', '', '', '', '', '2021-05-22 09:11:57', NULL),
(37, '1', 'worker', 'Teguh', '', NULL, '', '082324871066', 'teguh.wck95@gmail.com', '$2b$10$EV.ptJOvdZciYwXyoIVgD.ME28vUv0q1dXj24gTr5vU3ymlJDmRkG', '', '', '', '', '', '2021-05-22 10:35:47', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`experience_id`);

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
  MODIFY `experience_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recruiters`
--
ALTER TABLE `recruiters`
  MODIFY `recruiter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `skill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `workers`
--
ALTER TABLE `workers`
  MODIFY `worker_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
