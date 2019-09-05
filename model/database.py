import sqlite3
try:
    from model import *
except ModuleNotFoundError:
    from recipe import Recipe
    from ingredient import Ingredient


class Database(object):
    __db_path = "db/recipe.db"
    __schema_path = "db/schema.sql"
    def __init__(self):
        with sqlite3.connect(self.__db_path) as conn:
            with open(self.__schema_path, 'r') as schema_file:
                schema = schema_file.read()
            schema = [scheme for scheme in schema.replace('\n', '').split(';') if len(scheme) > 0]
            cur = conn.cursor()
            for scheme in schema:
                cur.execute(scheme)
            conn.commit()

    def get_recipe_names(self):
        with sqlite3.connect(self.__db_path) as conn:
            cur = conn.cursor()
            cur.execute("SELECT recipe_id, name FROM recipes")
            return cur.fetchall()

    def get_recipe(self, recipe_id):
        with sqlite3.connect(self.__db_path) as conn:
            cur = conn.cursor()
            cur.execute("SELECT * FROM recipes WHERE recipe_id=?", (recipe_id,))
            row = cur.fetchone()
            if row is None:
                return None
            recipe_id, name, yld, desc = row
            recipe = Recipe(name, yld, desc)
            cur.execute("SELECT name, amount FROM ingredients WHERE recipe_id=?", (recipe_id,))
            ingredient_data = cur.fetchall()
            for ingredient_name, ingredient_amount in ingredient_data:
                recipe.add_ingredient(Ingredient(ingredient_name, ingredient_amount))
            cur.execute("SELECT description FROM steps WHERE recipe_id=?", (recipe_id,))
            step_data = cur.fetchall()
            for step in step_data:
                recipe.add_step(step)
            return recipe

    def add_recipe(self, recipe):
        with sqlite3.connect(self.__db_path) as conn:
            cur = conn.cursor()
            cur.execute("INSERT INTO recipes (name, yield, description) VALUES (?, ?, ?)", (recipe.name, recipe.yld, recipe.desc))
            recipe_id = cur.lastrowid
            for ingredient in recipe.ingredients:
                cur.execute("INSERT INTO ingredients (name, amount, recipe_id) VALUES (?, ?, ?)", (ingredient.name, ingredient.amount, recipe_id))
            for step in recipe.steps:
                cur.execute("INSERT INTO steps (description, recipe_id) VALUES (?, ?)", (step, recipe_id))
            conn.commit()
            return cur.lastrowid

    def remove_recipe(self, recipe_id):
        with sqlite3.connect(self.__db_path) as conn:
            cur = conn.cursor()
            cur.execute("DELETE FROM recipes WHERE recipe_id = ?", (recipe_id,))
            cur.execute("DELETE FROM ingredients WHERE recipe_id = ?", (recipe_id,))
            cur.execute("DELETE FROM steps WHERE recipe_id = ?", (recipe_id,))
            conn.commit()

if __name__ == "__main__":
    # with open("db/schema.sql", 'r') as f:
    #     schema = [scheme for scheme in f.read().replace('\n', '').split(';') if len(scheme) > 0]
    # print(schema)
    db = Database()
    recipe = Recipe("cake", "3 dozen", "makes a cake")
    recipe.add_ingredient(Ingredient("sugar", "1 cup"))
    recipe.add_ingredient(Ingredient("flour", "2 cups"))
    recipe.add_step("put stuff together and bake")
    recipe_id = db.add_recipe(recipe)
    print(db.get_recipe_names())
    db.remove_recipe(recipe_id)
