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

    def POST(self, **kwargs):
        recipe = Recipe(kwargs['recipe_name'], kwargs['recipe_yield'], kwargs['recipe_desc'])
        if 'ingredient-name' in kwargs and 'ingredient-amount' in kwargs:
            for ing_name, ing_amount in zip(kwargs['ingredient-name'], kwargs['ingredient-amount']):
                recipe.add_ingredient(Ingredient(ing_name, ing_amount))
        if 'step' in kwargs:
            for step in kwargs['step']:
                recipe.add_step(step)
        if kwargs['form-type'] == 'add':
            self.db.add_recipe(recipe)
        raise cherrypy.HTTPRedirect('/')

    def DELETE(self, recipe_id=""):
        if recipe_id.isdigit():
            recipe_id = int(recipe_id)
            self.db.remove_recipe(recipe_id)
            return "success"
        else:
            return "failure"
