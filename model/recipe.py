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

    def __iter__(self):
        yield ('name', self.name)
        yield('yield', self.yld)
        yield('description', self.desc)
        yield('ingredients', [dict(ing) for ing in self.ingredients])
        yield ('steps', self.steps)

    def __repr__(self):
        return """{{
    "name":{},
    "yield":{},
    "description":{},
    "ingredients":{},
    "steps":{}
}}""".format(self.name, self.yld, self.desc, self.ingredients, self.steps)

if __name__ == "__main__":
    from ingredient import Ingredient
    import json
    recipe = Recipe("cake", "3 dozen", "makes a cake")
    recipe.add_ingredient(Ingredient("sugar", "1 cup"))
    recipe.add_ingredient(Ingredient("flour", "2 cups"))
    recipe.add_step("put stuff together and bake")

    print(json.dumps(dict(recipe)))