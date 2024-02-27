-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2024 at 05:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webusers`
--

-- --------------------------------------------------------

--
-- Table structure for table `webusers`
--

CREATE TABLE `webusers` (
  `id` int(11) NOT NULL,
  `u_email` varchar(255) NOT NULL,
  `u_firstname` varchar(50) NOT NULL,
  `u_lastname` varchar(50) NOT NULL,
  `u_password` varchar(60) NOT NULL,
  `is_approved` tinyint(1) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `u_username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `webusers`
--

INSERT INTO `webusers` (`id`, `u_email`, `u_firstname`, `u_lastname`, `u_password`, `is_approved`, `is_admin`, `u_username`) VALUES
(1, 'bob@odu.edu', 'bob', 'test', '123', 0, 0, 'webUser1'),
(2, 'john@odu.edu', 'john', 'test', '123', 0, 0, 'webUser2'),
(3, 'joeYo@odu.edu', 'jack', 'test', '123', 0, 0, 'joeYo'),
(4, 'hillary@odu.edu', 'hillary', 'test', '$2b$10$tIIJ5I.Lc55sCBQXHHmSpOKAKTDyJ4GW1iKQhL4Z00XdtT6sZDjwS', 0, 0, 'webUser5'),
(5, 'hashley@odu.edu', 'hashley', 'hastingtest', '$2b$10$9XhpF6z5dg4weLZ.NycNEeUt3o4R6M456A1FR96BX9dsc9JrnW5oW', 0, 0, 'HASH'),
(6, 'emailHashTest@odu.edu', 'emailHash', 'test', '$2b$10$/mC1s9whl804uhjnqcaG5.Wx.oUqe8wC3Z9t8.TFL12149hN.At32', 0, 0, 'emailHash');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `webusers`
--
ALTER TABLE `webusers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `webusers`
--
ALTER TABLE `webusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
