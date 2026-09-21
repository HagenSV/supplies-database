CREATE TABLE IF NOT EXISTS Category (
    category_id INTEGER PRIMARY KEY,
    category_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Location (
    location_id INTEGER PRIMARY KEY,
    location_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Item (
    item_id INTEGER PRIMARY KEY,
    item_name TEXT NOT NULL,
    category_id INTEGER,
    CONSTRAINT fk_Category FOREIGN KEY (category_id) REFERENCES Category(category_id)
);

CREATE TABLE IF NOT EXISTS Container (
    container_id INTEGER PRIMARY KEY,
    location_id INTEGER,
    CONSTRAINT fk_Location FOREIGN KEY (location_id) REFERENCES Location(location_id)
);

CREATE TABLE IF NOT EXISTS StoredItem (
    stored_item_id INTEGER PRIMARY KEY,
    item_id INTEGER NOT NULL,
    container_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    CONSTRAINT fk_Item FOREIGN KEY (item_id) REFERENCES Item(item_id),
    CONSTRAINT positive_quantity CHECK (quantity > 0)
);