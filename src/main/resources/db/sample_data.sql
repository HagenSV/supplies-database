INSERT INTO Category(category_name) VALUES
("Pool"), ("Bedding");

INSERT INTO Item(item_name, category_id) VALUES
("Sleeping Bag", 2),
("Pool Noodle", 1),
("Flashlight", NULL);

INSERT INTO Location(location_name) VALUES
("Attic"), ("Basement"), ("Garage");

INSERT INTO Container(location_id) VALUES
(1), (2), (2), (3), (3);

INSERT INTO StoredItem(item_id, container_id, quantity) VALUES
(1, 2, 1),
(3, 3, 5),
(3, 1, 2),
(2, 3, 3),
(2, 2, 3);