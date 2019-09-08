class Ingredient(object):
    def __init__(self, name, amount):
        self.name = name
        self.amount = amount

    def __iter__(self):
        yield ('name', self.name)
        yield ('amount', self.amount)
