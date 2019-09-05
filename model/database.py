import sqlite3
from model import *

CREATE_RECIPES_SQL = """
CREATE TABLE IF NOT EXISTS recipes (
    recipe_id INTEGER PRIMARY KEY, 
    name TEXT NOT NULL, 
    yield TEXT,
    description TEXT)
"""

CREATE_INGREDIENTS_SQL = """
CREATE TABLE IF NOT EXISTS ingredients(
    ingredient_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    amount TEXT NOT NULL,
    recipe_id INTEGER,
    FOREIGN KEY (recipe_id)
    REFERENCES recipes (recipe_id) 
       ON UPDATE CASCADE
       ON DELETE CASCADE)
"""

CREATE_STEPS_SQL = """
CREATE TABLE IF NOT EXISTS steps (
    step_id INTEGER PRIMARY KEY,
    description TEXT NOT NULL,
    recipe_id INTEGER,
    FOREIGN KEY (recipe_id)
    REFERENCES recipes (recipe_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE)
"""

class Database(object):
    __db_path = "db/recipe.db"
    def __init__(self):
        with sqlite3.connect(self.__db_path) as conn:
            cur = conn.cursor()
            cur.execute(CREATE_RECIPES_SQL)
            cur.execute(CREATE_INGREDIENTS_SQL)
            cur.execute(CREATE_STEPS_SQL)
            conn.commit()
    
    def get_recipe_names(self):
        with sqlite3.connect(self.__db_path) as conn:
            cur = conn.cursor()
            cur.execute("SELECT recipe_id, name FROM recipes")
            return cur.fetchall()

    def get_recipe(self, recipe_id):
        with sqlite3.connect(self.__db_path) as conn:
            cur = con.cursor()
            cur.execute("SELECT * FROM recipes WHERE recipe_id=?", recipe_id)
            recipe_id, name, yld, desc = cur.fetchone()
            recipe = Recipe(name, yld, desc)
            cur.execute("SELECT * FROM ingredients WHERE recipe_id=?", recipe_id)
            ingredient_data = cur.fetchall()
            for ingredient_id, ingredient_name, ingredient_amount in ingredient_data:
                recipe.add_ingredient(Ingredient(ingredient_name, ingredient_amount))
            cur.execute("SELECT * FROM steps WHERE recipe_id=?", recipe_id)
            step_data = cur.fetchall()
            for step_id, step in step_data:
                recipe.add_step(step)
            return recipe

    def add_recipe(self, recipe):
        with sqlite3.connect(self.__db_path) as conn:
            cur = conn.cursor()
            cur.execute("INSERT INTO recipes (name, yield, description) VALUES (?, ?, ?)", recipe.name, recipe.yld, recipe.desc)
            recipe_id = cur.lastrowid
            for ingredient in recipe.ingredients:
                cur.execute("INSERT INTO ingredients (name, amount, recipe_id) VALUES (?, ?, ?)", ingredient.name, ingredient.amount, recipe_id)
            for step in recipe.steps:
                cur.execute("INSERT INTO steps (description, recipe_id) VALUES (?, ?)", step, recipe_id)
            conn.commit()

    def remove_recipe(self, recipe_id):
        with sqlite3.connect(self.__db_path) as conn:
            cur = conn.cursor()
            cur.execute("DELETE FROM recipes WHERE recipe_id = ?", recipe_id)
            conn.commit()
