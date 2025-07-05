-- Insert roles
INSERT INTO role (name) VALUES ('ROLE_ADMIN');
INSERT INTO role (name) VALUES ('ROLE_RESIDENT');

-- Insert admin user (password: admin123)
INSERT INTO user (username, password, full_name, email, phone) 
VALUES ('admin', 'admin123', 'Admin User', 'admin@society.com', '1234567890');

-- Assign admin role to admin user
INSERT INTO user_role (user_id, role_id) VALUES (1, 1);

-- Insert blocks
INSERT INTO block (name, description) VALUES ('A', 'Block A');
INSERT INTO block (name, description) VALUES ('B', 'Block B');
INSERT INTO block (name, description) VALUES ('C', 'Block C');

-- Insert flats
INSERT INTO flat (number, floor, area, block_id) VALUES ('101', 1, 800.0, 1);
INSERT INTO flat (number, floor, area, block_id) VALUES ('102', 1, 800.0, 1);
INSERT INTO flat (number, floor, area, block_id) VALUES ('201', 2, 900.0, 1);
INSERT INTO flat (number, floor, area, block_id) VALUES ('202', 2, 900.0, 1);
INSERT INTO flat (number, floor, area, block_id) VALUES ('101', 1, 800.0, 2);
INSERT INTO flat (number, floor, area, block_id) VALUES ('102', 1, 800.0, 2);

-- Insert facilities
INSERT INTO facility (name, description, location, capacity, is_available) 
VALUES ('Swimming Pool', 'Olympic size swimming pool', 'Near Clubhouse', 20, true);

INSERT INTO facility (name, description, location, capacity, is_available) 
VALUES ('Gym', 'Fully equipped gym', 'Clubhouse - Ground Floor', 15, true);

INSERT INTO facility (name, description, location, capacity, is_available) 
VALUES ('Party Hall', 'Air conditioned party hall', 'Clubhouse - First Floor', 50, true);