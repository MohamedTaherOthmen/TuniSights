CREATE DATABASE TuniSights;
USE TuniSights;

CREATE TABLE guides (
  id SERIAL PRIMARY KEY,
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

CREATE TABLE tourists (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  country VARCHAR(100) NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tourists (
  first_name,
  last_name,
  email,
  phone_number,
  country,
  password_hash
) VALUES (
  'Mohamed Taher',
  'Othman',
  'mohamedtaher.othman@gmail.com',
  '+21612345678',
  'Tunisia',
  '12345'
);



