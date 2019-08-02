ALTER TABLE images
ADD FOREIGN KEY (project_id) REFERENCES projects(id);