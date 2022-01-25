"""Binary Search Tree"""
from os import error
from main import Pair


class Node:
    """Node Class"""

    def __init__(self, pair=""):
        """Initializes Node"""
        self.pair = pair  # Holds a Pair()
        self.left = None  # Holds next Node()
        self.right = None  # Holds next Node()


class BST:
    """BST Class"""

    def __init__(self, lyst=None):
        """Initializes BST"""
        self.root = None  # Holds a Node
        self.syze = 0

        if lyst is not None:
            self.build_tree(lyst)

    def build_tree(self, lyst):
        for pair in lyst:
            self.add(pair)

    def is_empty(self):
        """Return True if empty, False otherwise."""
        if self.root is None:
            return True
        return False

    def clear(self):
        self.root = None
        self.syze = 0

    def size(self):
        """Return the number of items in the tree."""
        return self.syze

    def height(self, root=""):
        """Return the height of the tree, which is the length of the path from the root to
        its deepest leaf."""
        if root == "":
            root = self.root

        if root is None:
            return 0

        else:
            left_height = self.height(root.left)
            right_height = self.height(root.right)

            if left_height > right_height:
                return left_height + 1
            else:
                return right_height + 1

    def add(self, item, root=None):
        """Add item to its proper place in the tree. Return the modified tree."""
        if root is None:
            root = self.root

        # print("TEST", root.pair.letter)
        # item.letter = item.letter.lower()

        if not item.letter.isalpha() and not item.letter.isnumeric():
            return

        elif self.is_empty():
            self.root = Node(item)
            self.syze += 1
            # print("\nRoot empty, added:", item)

        elif root.right is None and item.letter > root.pair.letter:
            self.syze += 1
            root.right = Node(item)
            # print(item, ", Added Node right of:", root.pair.letter)

        elif root.left is None and item.letter < root.pair.letter:
            self.syze += 1
            root.left = Node(item)
            # print(item, ", Added Node left of:", root.pair.letter)

        elif item.letter > root.pair.letter:
            self.add(item, root.right)

        elif item.letter < root.pair.letter:
            self.add(item, root.left)

        elif item.letter == root.pair.letter:
            root.pair.count += 1
            # print(item, ", Incremented:", root.pair.letter)

        else:
            raise error

    def remove(self, item, root=""):
        """Remove item from the tree. Return the modified tree."""
        lyst = self.preorder()
        lyst.remove(item)
        self.clear()
        self.build_tree(lyst)

    def find(self, item, root=None):
        """Return the matched item. If item is not in the tree, raise a ValueError."""
        if root is None:
            root = self.root

        if not item.letter.isalpha() or self.is_empty():
            # print("DID NOT FIND:", item)
            raise ValueError

        if item.letter > root.pair.letter:
            if root.right is None:
                raise ValueError
            self.find(item, root.right)

        elif item.letter < root.pair.letter:
            if root.left is None:
                raise ValueError
            self.find(item, root.left)

        elif item.letter == root.pair.letter:
            # print(item, ", Found:", root.pair.letter)
            return root.pair

        else:
            # print("DID NOT FIND:", item)
            raise ValueError

    def inorder(self):
        """Return a list with the data items in order of inorder traversal."""
        root = self.root
        lyst = []

        def printInorder(root):

            if root:
                printInorder(root.left)
                lyst.append(root.pair)
                printInorder(root.right)

        printInorder(root)
        return lyst

    def preorder(self):
        """Return a list with the data items in order of preorder traversal."""
        root = self.root
        lyst = []

        def printPreorder(root):

            if root:
                lyst.append(root.pair),
                printPreorder(root.left)
                printPreorder(root.right)

        printPreorder(root)
        return lyst

    def postorder(self):
        """Return a list with the data items in order of postorder traversal."""
        root = self.root
        lyst = []

        def printPostorder(root):

            if root:
                printPostorder(root.left)
                printPostorder(root.right)
                lyst.append(root.pair)

        printPostorder(root)
        return lyst

    def rebalance(self, lo="", hi="", root=""):
        """balances the tree"""
        if lo == "" and hi == "":
            lyst = self.inorder()
            lo = lyst[: len(lyst) // 2]
            hi = lyst[len(lyst) // 2 :]
            self.clear()
            self.root = Node(hi[0])
            hi.remove(hi[0])

        if len(lo) > 1:
            lo_midpoint = len(lo) // 2
            print(lo[lo_midpoint])
            self.add(lo[lo_midpoint])
            lo.remove(lo[lo_midpoint])
            self.rebalance(lo[:lo_midpoint], lo[lo_midpoint:])

        if len(hi) > 1:
            hi_midpoint = len(hi) // 2
            self.add(hi[hi_midpoint])
            hi.remove(hi[hi_midpoint])
            self.rebalance(hi[:hi_midpoint], hi[hi_midpoint:])
