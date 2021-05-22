-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2021 at 04:16 PM
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
(9, '1', 'recruiter', 'asd1', '', 'rifqiziyad4@gmail.com', '', '', 'asd', '$2b$10$2djrkOATfmfDPQUb26w6G.4kIj72oa3IcRwNKHNhOHssX1BbcEPdq', 'asd', 'asdas', '', '', '2021-05-20 16:23:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `skill_id` int(11) DEFAULT NULL,
  `worker_id` int(11) NOT NULL,
  `skill_name` varchar(100) NOT NULL,
  `skill_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `skill_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `worker_status` enum('freelance','fulltime') NOT NULL,
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
(1, '1', 'worker', 'Rifqi', 'Tangerang Selatan', 'fulltime', '', '08374245', 'rifqi@rifqi.com', 'adasdsa', 'asd', 'asd', '', '', '', '2021-05-17 20:50:38', NULL),
(2, '0', 'worker', 'asd', 'ads', '', '', 'asd', 'asd', 'asd', 'sda', 'asd', 'asd', 'dsad', '2021-05-18T02-45-51.019Zcard-movie1.png', '2021-05-18 09:45:51', NULL),
(3, '0', 'worker', 'gf', 'fgdfgfdg', '', '', 'dfg', 'df', 'fdgdf', 'fgfd', 'fsd', 'dj', 'sdf', '2021-05-18T07-23-15.778Zdefault.jpg', '2021-05-18 14:23:15', NULL),
(4, '0', 'worker', 'rifqi', 'fgdfgfdg', '', 'web developer', 'dfg', 'df', 'fdgdf', 'fgfd', 'fsd', 'dj', 'sdf', '2021-05-21T14-14-33.563Zblackwidow.png', '2021-05-18 14:24:19', '2021-05-21 14:14:33'),
(21, '1', 'worker', 'asd1', '', 'freelance', '', 'asd', 'rifqiimtinan@gmail.com', '$2b$10$UWghHvwxKETRq9e2R2QKqu1wi6rvOtRrGs5HB.rSOygZNeAVlKlre', '', '', '', '', '', '2021-05-20 16:21:12', NULL);

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
  MODIFY `recruiter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `workers`
--
ALTER TABLE `workers`
  MODIFY `worker_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
