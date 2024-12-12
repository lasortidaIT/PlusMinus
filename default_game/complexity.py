import pickle
from sklearn.ensemble import RandomForestClassifier


class ComplexityClassifier:

    def __init__(self):
        self.model = pickle.load(open('models/model.sav', 'rb'))

    def complexity(self, text):
        signs = ['*', '+', '-', '%']
        first, sign, second = text.split(' ')
        first, second = int(first), int(second)
        data = [first, second, False, False, False, False]
        data[signs.index(sign) + 2] = True

        answer = self.model.predict([data])
        comlplex = ['hard', 'normal', 'easy']

        return comlplex[answer[0]]