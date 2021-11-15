'''
Project: BST
Author: Carson Krueger
Course: 2420
Date: 10/28/21

Description:

Lessons Learned:

'''
from pathlib import Path
from string import whitespace, punctuation
import string


class Pair:
    ''' Encapsulate letter,count pair as a single entity.

    Realtional methods make this object comparable
    using built-in operators. 
    '''

    def __init__(self, letter, count=1):
        self.letter = letter
        self.count = count

    def __eq__(self, other):
        return self.letter == other.letter

    def __hash__(self):
        return hash(self.letter)

    def __ne__(self, other):
        return self.letter != other.letter

    def __lt__(self, other):
        return self.letter < other.letter

    def __le__(self, other):
        return self.letter <= other.letter

    def __gt__(self, other):
        return self.letter > other.letter

    def __ge__(self, other):
        return self.letter >= other.letter

    def __repr__(self):
        return f'({self.letter}, {self.count})'

    def __str__(self):
        return f'({self.letter}, {self.count})'


def make_tree():
    from bst import BST

    bst = BST()
    f = open("around-the-world-in-80-days-3.txt")

    for line in f:
        #line.translate(str.maketrans('', '', string.punctuation))
        for letter in line:
            #print(letter.lower(), end="")
            bst.add(Pair(letter))

    return bst


def main():
    ''' Program kicks off here.'''
    bst = make_tree()
    # print(bst.inorder())
    # bst.remove(Pair('h'))
    # print(bst.inorder())
    # bst.rebalance()
    # print(bst.inorder())


if __name__ == "__main__":
    main()
