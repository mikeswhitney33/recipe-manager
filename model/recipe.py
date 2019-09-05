class Recipe(object):
    def __init__(self, name, yld, desc):
        self.name = name
        self.yld = yld 
        self.desc = desc 
        self.ingredients = []
        self.steps = []

    def add_ingredient(self, ingredient):
        self.ingredients.append(ingredient)

    def add_step(self, step):
        self.steps.append(step)