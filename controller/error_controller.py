from controller.base import BaseController

class ErrorController(BaseController):
    def error_404(self):
        page = self.set_body(self.template, 'views/errors/404.html')
        page = self.add_css(page, '/static/css/error.css')
        return page
