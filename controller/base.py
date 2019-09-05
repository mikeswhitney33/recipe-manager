import os
import re

class BaseController(object):
    def render_template(self, title, path, layout_path="views/layout.html"):
        if os.path.isdir(path):
            dir_path = path 
            body_path = os.path.join(path, 'index.html')
        else:
            dir_path = os.path.dirname(path)
            body_path = path
            

        with open(layout_path, 'r') as layout_file:
            layout_data = layout_file.read()
        tags = re.findall(r"\{\% [a-zA-Z0-9]*\.*[a-zA-Z0-9]* \%\}", layout_data)
        tag_bodies = [tag.split()[1] for tag in tags]
        for tag, body in zip(tags, tag_bodies):
            print(os.path.join(dir_path, body), os.path.exists(os.path.join(dir_path, body)))
            if body == 'title':
                layout_data = layout_data.replace(tag, title)
            elif body == "body":
                with open(body_path, 'r') as body_file:
                    body_data = body_file.read()
                    layout_data = layout_data.replace(tag, body_data)
            elif os.path.exists(os.path.join(dir_path, body)):
                
                with open(os.path.join(dir_path, body), 'r') as body_file:
                    body_data = body_file.read()
                    layout_data = layout_data.replace(tag, body_data)
            else:
                layout_data = layout_data.replace(tag, '')
        return layout_data

if __name__ == "__main__":
    c = BaseController()
    print(c.render_template("HOME", "views/home/", layout_path="views/layout.html"))
