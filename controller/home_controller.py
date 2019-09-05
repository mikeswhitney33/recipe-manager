from controller.base import BaseController

import cherrypy

class HomeController(BaseController):
    @cherrypy.expose
    def index(self):
        page = self.render_template("Home", 'views/home/index.html')
        page = page.replace('</html>', '<script type="text/javascript" src="/static/js/recipe-list.js"></script></html>')
        return page

    # @cherrypy.expose
    # def edit(self, recipe_id=""):
    #     if recipe_id.isdigit():
    #         return self.render_template("Edit Recipe", "views/home/edit.html")
    #     else:
    #         raise cherrypy.HTTPRedirect('/')

    @cherrypy.expose
    def add(self):
        return self.render_template("Add Recipe", "views/home/add.html")

    @cherrypy.expose
    def view(self, recipe_id=""):
        if recipe_id.isdigit():
            page = self.render_template("View Recipe", 'views/home/view.html')
            page = page.replace('</html>', '<script type="text/javascript" src="/static/js/recipe-view.js"></script></html>')
            return page
        else:
            raise cherrypy.HTTPRedirect('/')
