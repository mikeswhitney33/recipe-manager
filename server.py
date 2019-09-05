import os, os.path
import random
import string

import cherrypy

from controller import HomeController


class RecipeManager(object):
    @cherrypy.expose
    def index(self):
        c = HomeController()
        return c.index()


if __name__ == '__main__':
    conf = {
        '/': {
            'tools.sessions.on': True,
            'tools.staticdir.root': os.path.abspath(os.getcwd())
        },
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './static'
        }
    }
    cherrypy.quickstart(RecipeManager(), '/', conf)
