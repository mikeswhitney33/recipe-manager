from model import Ingredient

class Recipe(object):
    def __init__(self, name, yld, desc, notes, ingredients=[], steps=[]):
        self.name = name
        self.yld = yld
        self.desc = desc
        self.notes = notes
        self.ingredients = [Ingredient(x['name'], x['amount']) for x in ingredients]
        self.steps = steps

    def add_ingredient(self, ingredient):
        self.ingredients.append(ingredient)

    def add_step(self, step):
        self.steps.append(step)

    def __iter__(self):
        yield ('name', self.name)
        yield('yield', self.yld)
        yield('description', self.desc)
        yield('notes', self.notes)
        yield('ingredients', [dict(ing) for ing in self.ingredients])
        yield ('steps', self.steps)
