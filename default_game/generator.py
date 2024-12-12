import random
from .complexity import ComplexityClassifier
#num = random.choice([i for i in range(self.n) if i != 0])
class Generator:
    def __init__(self, rang=(1,999), negative=True, signs=('+', '-', '/', '*'), amount=9999, infi=True):
        print(signs)
        self.n = negative
        if not self.n:
            self.rang = rang
        else:
            self.rang = (-max(rang), max(rang))
        if signs == 'random':
            self.signs = ('+', '-', '/', '*')
        else:
            self.signs = signs
        self.amount = amount
        self.infi = infi
        self.classifier = ComplexityClassifier()


    def main(self):
        ans = []
        if not self.infi:
            for i in range(self.amount):
                ans.append(self.gen())
            return ans
        else:
            while True:
                return [self.gen()]


    def gen(self):
        sign = random.choice(self.signs)
        if sign == '/' or sign=='-':
            res = random.choice([i for i in range(self.rang[0], self.rang[1]) if i != 0])
            num2 = random.choice([i for i in range(self.rang[0], self.rang[1]) if i != 0])
            if sign == '/':
                num1 = res*num2
            else:
                num2 = abs(random.choice([i for i in range(self.rang[0], self.rang[1]) if i != 0]))
                num1 = random.choice([i for i in range(self.rang[0], self.rang[1]) if i != 0])
                if not self.n:
                    num1, num2 = (max(num1,num2),min(num1,num2))
                res = num1 - num2

        else:
            num1 = random.choice([i for i in range(self.rang[0], self.rang[1]) if i != 0])
            num2 = random.choice([i for i in range(self.rang[0], self.rang[1]) if i != 0])
            if sign == '+':
                num2 = abs(num2)
            res = eval(f'{num1}{sign}{num2}')
        if sign == '*':
            return [f'{num1} * {num2}', res, self.classifier.complexity(f'{num1} * {num2}')]
        elif sign=='/':
            return [f'{num1} % {num2}', res, self.classifier.complexity(f'{num1} % {num2}')]
        else:
            return [f'{num1} {sign} {num2}',res, self.classifier.complexity(f'{num1} {sign} {num2}')]