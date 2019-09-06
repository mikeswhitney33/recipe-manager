import os
import re

class BaseController(object):
    def __init__(self, template_path='views/layout.html'):
        with open(template_path, 'r') as template_file:
            self.template = template_file.read()

    def add_js(self, page, js_path):
        page = page.replace('</html>', '<script type="text/javascript" src="{}"></script></html>'.format(js_path))
        return page 
    
    def add_css(self, page, css_path):
        page = page.replace('</head>', '<link rel="stylesheet" href="{}"></head>'.format(css_path))
        return page 

    def set_title(self, page, title):
        page = page.replace("<title></title>", "<title>{}</title>".format(title))
        return page

    def set_body(self, page, path_to_body):
        with open(path_to_body, 'r') as body_file:
            page = page.replace("{% body %}", body_file.read())
            return page


if __name__ == "__main__":
    c = BaseController()
    print(c.render_template("HOME", "views/home/", layout_path="views/layout.html"))
