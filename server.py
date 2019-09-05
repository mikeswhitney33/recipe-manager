import os, os.path
import random
import string
import argparse

import cherrypy

from controller import HomeController, ErrorController
from model import RecipeWebService, Database


def error_page_404(status, message, traceback, version):
    return ErrorController().error_404()


def start_server():
    parser = argparse.ArgumentParser()
    parser.add_argument('--host', default='0.0.0.0', type=str)
    parser.add_argument('--port', default=8080, type=int)
    args = parser.parse_args()

    server_conf = {
        'server.socket_host':args.host,
        'server.socket_port':args.port
    }

    site_conf = {
        '/':{
            'tools.staticdir.root':os.path.abspath(os.getcwd())
        },
        '/recipes': {
            'request.dispatch':cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on':True,
            'tools.response_headers.headers':[('Content-Type', 'text/plain')]
        },
        '/static':{
            'tools.staticdir.on':True,
            'tools.staticdir.dir':'./static'
        }
    }
    home = HomeController()
    home.recipes = RecipeWebService(Database())
    cherrypy.tree.mount(home, '/', site_conf)
    cherrypy.config.update(server_conf)
    cherrypy.config.update({'error_page.404':error_page_404})
    cherrypy.engine.start()

if __name__ == '__main__':
    start_server()
