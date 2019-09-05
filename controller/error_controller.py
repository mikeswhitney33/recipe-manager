from controller.base import BaseController

class ErrorController(BaseController):
    def error_404(self):
        return self.render_template('404 - Not Found', 'views/errors/404.html')