import cherrypy

from model import *
import json

@cherrypy.expose
class RecipeWebService(object):
    def __init__(self, db):
        self.db = db

    @cherrypy.tools.accept(media='text/plain')
    def GET(self, recipe_id=""):
        if recipe_id.isdigit():
            recipe_id = int(recipe_id)
            recipe = self.db.get_recipe(recipe_id)
            return json.dumps(dict(recipe))
        else:
            rows = self.db.get_recipe_names()
            rows = [{"recipe_id":rid,"name":name} for rid, name in rows]
            return json.dumps(rows)

    def POST(self, recipe_name, recipe_yield, recipe_desc, ingredient_names=[], ingredient_amounts=[], steps=[]):
        recipe = Recipe(recipe_name, recipe_yield, recipe_desc)
        if type(ingredient_names) is not list:
            ingredient_names = [ingredient_names]
        if type(ingredient_amounts) is not list:
            ingredient_names = [ingredient_amounts]
        for ing_name, ing_amount in zip(ingredient_names, ingredient_amounts):
            recipe.add_ingredient(Ingredient(ing_name, ing_amount))
        if type(steps) is not list:
            steps = [steps]
        for step in steps:
            recipe.add_step(step)
        recipe_id = self.db.add_recipe(recipe)
        return repr(recipe_id)

    def DELETE(self, recipe_id=""):
        if recipe_id.isdigit():
            recipe_id = int(recipe_id)
            self.db.remove_recipe(recipe_id)
        else:
            raise cherrypy.HTTPError(403)

    def PUT(self, recipe_id="", **kwargs):
        if recipe_id.isdigit():
            recipe_id = int(recipe_id)
            recipe = Recipe(kwargs['recipe_name'], kwargs['recipe_yield'], kwargs['recipe_desc'])
            if 'ingredient-name' in kwargs and 'ingredient-amount' in kwargs:
                for ing_name, ing_amount in zip(kwargs['ingredient-name'], kwargs['ingredient-amount']):
                    recipe.add_ingredient(Ingredient(ing_name, ing_amount))
            if 'step' in kwargs:
                for step in kwargs['step']:
                    recipe.add_step(step)
            self.db.remove_recipe(recipe_id)
            recipe_id = self.db.add_recipe(recipe)
            return repr(recipe_id)
        else:
            raise cherrypy.HTTPError(403)
        # if recipe_id.isdigit():
        #     recipe_id = int(recipe_id)
        #     self.db.remove_recipe(recipe_id)
        #     recipe = Recipe(kwargs['recipe_name'], kwargs['recipe_yield'], kwargs['recipe_desc'])
        #     if 'ingredient-name' in kwargs and 'ingredient-amount' in kwargs:
        #         for ing_name, ing_amount in zip(kwargs['ingredient-name'], kwargs['ingredient-amount']):
        #             recipe.add_ingredient(Ingredient(ing_name, ing_amount))
        #     if 'step' in kwargs:
        #         for step in kwargs['step']:
        #             recipe.add_step(step)
        #     recipe_id = self.db.add_recipe(recipe)
        #     return recipe_id
        # else:
        #     print(recipe_id, kwargs)
        #     raise cherrypy.HTTPError(403)
