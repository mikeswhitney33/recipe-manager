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
            print(json.dumps(dict(recipe)))
            return json.dumps(dict(recipe))
        else:
            rows = self.db.get_recipe_names()
            rows = [{"recipe_id":rid,"name":name} for rid, name in rows]
            return json.dumps(rows)

    @cherrypy.tools.json_in()
    def POST(self):
        try:
            args = cherrypy.request.json
            recipe = Recipe(args['recipe_name'], args['recipe_yield'], args['recipe_desc'], args['recipe_notes'])
            for ing_name, ing_amount in zip(args['ingredient_names'], args['ingredient_amounts']):
                recipe.add_ingredient(Ingredient(ing_name, ing_amount))
            for step in args['steps']:
                recipe.add_step(step)
            recipe_id = self.db.add_recipe(recipe)

            return json.dumps({
                "status":"success",
                "recipe_id":recipe_id
            })
        except:
            raise cherrypy.HTTPError(403)


    def DELETE(self, recipe_id=""):
        if recipe_id.isdigit():
            recipe_id = int(recipe_id)
            self.db.remove_recipe(recipe_id)
        else:
            raise cherrypy.HTTPError(403)

    @cherrypy.tools.json_in()
    def PUT(self):
        try:
            args = cherrypy.request.json
            print(args)
            recipe_id = args['recipe_id']
            recipe = Recipe(args['recipe_name'], args['recipe_yield'], args['recipe_desc'], args['recipe_notes'])
            for ing_name, ing_amount in zip(args['ingredient_names'], args['ingredient_amounts']):
                recipe.add_ingredient(Ingredient(ing_name, ing_amount))
            for step in args['steps']:
                recipe.add_step(step)
            self.db.remove_recipe(recipe_id)
            recipe_id = self.db.add_recipe(recipe)

            return json.dumps({
                "status":"success",
                "recipe_id":recipe_id
            })
        except:
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
