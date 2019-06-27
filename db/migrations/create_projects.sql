CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(300) unique,
  slug VARCHAR(300) unique,
  description TEXT
);

CREATE TABLE IF NOT EXISTS tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tag_name VARCHAR(100) unique,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tool_name VARCHAR(100) unique,
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

