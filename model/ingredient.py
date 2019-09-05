class Ingredient(object):
    def __init__(self, name, amount):
        self.name = name
        self.amount = amount

    def __iter__(self):
        yield ('name', self.name)
        yield ('amount', self.amount)

    def __repr__(self):
        return """{{
            "name":{},
            "amount":{}
        }}""".format(self.name, self.amount)