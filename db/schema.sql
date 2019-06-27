CREATE DATABASE IF NOT EXISTS myportfolio_db;

use myportfolio_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(40) UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(300) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(40) UNIQUE,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(300) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT,
  url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  admin_id INT NOT NULL,
  title VARCHAR(500) UNIQUE,
  slug VARCHAR(500) UNIQUE,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  FOREIGN KEY(admin_id)
    REFERENCES admins(id)
);

CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT,
  admin_id INT,
  content TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  FOREIGN KEY(post_id)
    REFERENCES posts(id),
  FOREIGN KEY(user_id)
    REFERENCES users(id),
  FOREIGN KEY(admin_id)
    REFERENCES admins(id)
);

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(300) unique,
  short_description VARCHAR(100),
  slug VARCHAR(300) unique,
  description TEXT
);

CREATE TABLE IF NOT EXISTS tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) unique,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) unique,
  image_id INT,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(image_id)
    REFERENCES images(id)
);

CREATE TABLE IF NOT EXISTS project_tags (
  tag_id INT NOT NULL,
  project_id INT NOT NULL,
  FOREIGN KEY(tag_id) REFERENCES tags(id),
  FOREIGN KEY(project_id) REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS project_tools (
  tool_id INT NOT NULL,
  project_id INT NOT NULL,
  FOREIGN KEY(tool_id) REFERENCES tools(id),
  FOREIGN KEY(project_id) REFERENCES projects(id)
);