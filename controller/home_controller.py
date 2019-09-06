from controller.base import BaseController

import cherrypy

class HomeController(BaseController):
    @cherrypy.expose
    def index(self):
        page = self.set_body(self.template, 'views/home/index.html')
        page = self.add_js(page, '/static/js/recipe-list.js')
        return page

    @cherrypy.expose
    def add(self):
        page = self.set_body(self.template, 'views/home/add.html')
        page = self.add_js(page, '/static/js/recipe-add.js')
        page = self.add_css(page, '/static/css/recipe-add.css')
        return page

    @cherrypy.expose
    def edit(self, recipe_id):
        if recipe_id.isdigit():
            page = self.set_body(self.template, 'views/home/add.html')
            page = self.add_js(page, '/static/js/recipe-add.js')
            page = self.add_js(page, '/static/js/recipe-edit.js')
            page = self.add_css(page, '/static/css/recipe-add.css')
            return page 
        else:
            raise cherrypy.HTTPRedirect('/')

    @cherrypy.expose
    def view(self, recipe_id=""):
        if recipe_id.isdigit():
            page = self.set_body(self.template, 'views/home/view.html')
            page = self.add_js(page, '/static/js/recipe-view.js')
            page = self.add_css(page, '/static/css/recipe-view.css')
            return page
        else:
            raise cherrypy.HTTPRedirect('/')
