CREATE DATABASE IF NOT EXISTS TuniSights;
USE TuniSights;

CREATE TABLE IF NOT EXISTS guides (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  city VARCHAR(100) NOT NULL,
  language_spoken VARCHAR(100) NOT NULL,
  bio TEXT,
  experience_years INT CHECK (experience_years >= 0 AND experience_years <= 50),
  profile_picture_url TEXT,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tourists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  country VARCHAR(100) NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  plan_name VARCHAR(255),
  description TEXT,
  price DECIMAL(10,2),
  guide_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (guide_id) REFERENCES guides(id) ON DELETE CASCADE
);

ALTER TABLE tunisights.plans ADD COLUMN duration INT AFTER price;
ALTER TABLE tunisights.plans ADD COLUMN image_url TEXT AFTER duration;
ALTER TABLE tunisights.plans ADD COLUMN status TEXT AFTER image_url;

ALTER TABLE tunisights.plans
ADD COLUMN city VARCHAR(255) AFTER plan_name;

CREATE TABLE bookings (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  plan_id INT NOT NULL,
  tourist_id INT NOT NULL,
  booking_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  tour_date DATE NOT NULL,
  participants INT NOT NULL DEFAULT 1,
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  notes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (plan_id) REFERENCES plans (id),
  FOREIGN KEY (tourist_id) REFERENCES tourists (id)
);

ALTER TABLE tunisights.bookings 
ADD COLUMN guide_id INT AFTER tourist_id,
ADD CONSTRAINT fk_guide FOREIGN KEY (guide_id) REFERENCES guides(id);
