ALTER TABLE projects
  RENAME COLUMN title TO name;

ALTER TABLE projects
  ADD COLUMN short_description VARCHAR(100) AFTER name;