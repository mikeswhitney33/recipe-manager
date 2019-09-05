from controller.base import BaseController 

import cherrypy

class HomeController(BaseController):
    @cherrypy.expose
    def index(self):
        return self.render_template("Home", 'views/home/index.html')