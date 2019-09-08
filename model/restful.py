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

    @cherrypy.tools.json_in()
    def POST(self):
        try:
            args = cherrypy.request.json
            recipe = Recipe(**args)
            recipe_id = self.db.add_recipe(recipe)

            return json.dumps({
                "status":"success",
                "recipe_id":recipe_id
            })
        except Exception as err:
            print(err)
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
            recipe_id = args.pop('recipe_id')
            recipe = Recipe(**args)
            self.db.remove_recipe(recipe_id)
            recipe_id = self.db.add_recipe(recipe)

            return json.dumps({
                "status":"success",
                "recipe_id":recipe_id
            })
        except:
            raise cherrypy.HTTPError(403)
