CREATE TABLE IF NOT EXISTS recipes (
    recipe_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    yield TEXT,
    description TEXT);

CREATE TABLE IF NOT EXISTS ingredients(
    ingredient_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    amount TEXT NOT NULL,
    recipe_id INTEGER,
    FOREIGN KEY (recipe_id)
    REFERENCES recipes (recipe_id)
       ON UPDATE CASCADE
       ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS steps (
    step_id INTEGER PRIMARY KEY,
    description TEXT NOT NULL,
    recipe_id INTEGER,
    FOREIGN KEY (recipe_id)
    REFERENCES recipes (recipe_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE);
