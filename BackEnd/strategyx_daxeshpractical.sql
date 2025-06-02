-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2025 at 09:56 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `strategyx_daxeshpractical`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `Product_Name` varchar(255) NOT NULL,
  `Product_Image` varchar(255) NOT NULL,
  `Product_Description` varchar(255) NOT NULL,
  `Category` varchar(255) NOT NULL,
  `Product_Price` double NOT NULL,
  `Product_Quantity` int(11) NOT NULL,
  `Status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `userId`, `Product_Name`, `Product_Image`, `Product_Description`, `Category`, `Product_Price`, `Product_Quantity`, `Status`) VALUES
(1, 7, ' PlayStation 5', '/productImages/1748800997064-51afJC92cgL._SX522_.jpg', 'Slim Design: With PS5, players get powerful gaming technology packed inside a sleek and compact console design. 1TB of Storage: Keep your favorite games ready and waiting for you to jump in and play with 1TB of SSD storage built in. Ultra-High Speed SSD: ', 'Video Game', 599.99, 10, 'In Stock'),
(2, 7, 'Boat Airdopes 141, Low Latency', '/productImages/1748801218987-71RFdy6y6LL._SX522_.jpg', 'Playback- Enjoy an extended break on weekends with your favourite episodes on stream, virtue of a playback time of up to 42 hours including the 6 hours nonstop playtime for earbuds.\r\nLow Latency- Our BEAST mode makes Airdopes 141 a partner in entertainmen', 'Earphones', 499, 45, 'In Stock'),
(3, 7, 'Minniq STORE 1/32 Merceedes ', '/productImages/1748801308526-61BUPUVOy7L._SX522_.jpg', ' Made of high-quality materials, these cars are durable, safe, non-toxic and lead-free toys. Can be moved. You can trust the quality and use it safely without worrying about your child ’s safety.\r\nThis stunning toy car with open doors is made with alloy a', 'Toy', 450, 20, 'In Stock'),
(4, 7, 'Noise Twist Round dial Smart Watch', '/productImages/1748801387728-61uF50OZzuL._SX679_.jpg', '1.38\" TFT display: Featuring a vibrant round display and a stylish metallic finish, the smartwatch offers a premium on-screen experience.;Tru SyncTM: Hassle-free pairing, stable connectivity and lower battery consumption combine to provide the most advanc', 'SmartWatch', 199, 60, 'In Stock'),
(5, 9, 'APES Fusion Style Wireless Headphone,', '/productImages/1748801564551-41Us2aSOdFL._SX300_SY300_QL70_FMwebp_.webp', 'Memory foam + Sweatproof fabric Earcups, Fit and comfort; Detachable fabric ear-cup for washable; Low power consumption technology applied, headphones with built-in 500mAh battery can continually play more than 50 hours.', 'Headphones', 450, 200, 'In Stock');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `email`, `password`) VALUES
(7, 'daxesh.devganiya@gmail.com', '$2b$10$tUJ7tP/rtYNrcvIQVFOoJeUnrj.hDQqjvWrvGDEWU6uSl.S5kvHjC'),
(8, 'piyu.dev@gmail.com', '$2b$10$WzBCq7zTbCGn9FV71iBzZOWSWfxBBzNIFYcj7kb4lHV45EmSG..66'),
(9, 'daxu.devganiya@gmail.com', '$2b$10$ZS9DGwDjC4qlaTQwCyx3puxUwW3nnQfYOIlc5oa15TSN127cvI9te');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
