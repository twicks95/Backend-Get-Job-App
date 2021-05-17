-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Bulan Mei 2021 pada 14.38
-- Versi server: 10.4.14-MariaDB
-- Versi PHP: 7.2.34

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
-- Struktur dari tabel `experiences`
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
-- Struktur dari tabel `portfolios`
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
-- Struktur dari tabel `recruiters`
--

CREATE TABLE `recruiters` (
  `recruiter_id` int(11) NOT NULL,
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

-- --------------------------------------------------------

--
-- Struktur dari tabel `skills`
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
-- Struktur dari tabel `workers`
--

CREATE TABLE `workers` (
  `worker_id` int(11) NOT NULL,
  `worker_name` varchar(100) NOT NULL,
  `worker_domicile` varchar(100) NOT NULL,
  `worker_status` enum('freelance','fulltime') NOT NULL,
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
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`experience_id`);

--
-- Indeks untuk tabel `recruiters`
--
ALTER TABLE `recruiters`
  ADD PRIMARY KEY (`recruiter_id`);

--
-- Indeks untuk tabel `workers`
--
ALTER TABLE `workers`
  ADD PRIMARY KEY (`worker_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `experiences`
--
ALTER TABLE `experiences`
  MODIFY `experience_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `recruiters`
--
ALTER TABLE `recruiters`
  MODIFY `recruiter_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `workers`
--
ALTER TABLE `workers`
  MODIFY `worker_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
