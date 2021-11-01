from os import error
from main import Pair

class Node:
    """Node Class"""
    def __init__(self, val = ""):
        """Initializes Node"""
        self.val = Pair(val) # Holds a Pair()
        self.left = None # Holds next Node()
        self.right = None # Holds next Node()

class BST:
    """BST Class"""
    def __init__(self) -> None:
        """Initializes BST"""
        self.root = None # Holds a Node
    
    def is_empty(self):
        """Return True if empty, False otherwise. """
        if self.root == None:
            return True
        return False

    def size():
        """Return the number of items in the tree. """

    def height():
        """Return the height of the tree, which is the length of the path from the root to 
    its deepest leaf. """

    def add(self, item, root = None):
        """Add item to its proper place in the tree. Return the modified tree. """
        if root is None:
            root = self.root

        #print("TEST", root.val.letter)
        item = item.lower()
        
        if not item.isalpha():
            return

        elif self.is_empty():
            self.root = Node(item)
            print("\nRoot empty, added:", item)

        elif root.right == None and item > root.val.letter:
            root.right = Node(item)
            print(", Added Node right of:", root.val.letter)

        
        elif root.left == None and item < root.val.letter:
            root.left = Node(item)
            print(", Added Node left of:", root.val.letter)

        elif item > root.val.letter:
            self.add(item, root.right)

        elif item < root.left.val.letter:
            self.add(item, root.left)

        elif item == root.val.letter:
            root.right.val.count += 1
            print(", Incremented:", item)

        elif item == root.left.val.letter:
            root.left.val.count += 1
            print(", Incremented:", item)

        else:
            raise error


    def remove(item):
        """Remove item from the tree. Return the modified tree. """

    def find(item):
        """Return the matched item. If item is not in the tree, raise a ValueError. """

    def inorder():
        """Return a list with the data items in order of inorder traversal. """
    
    def preorder():
        """Return a list with the data items in order of preorder traversal. """

    def postorder():
        """Return a list with the data items in order of postorder traversal. """

    def rebalance():
        """rebalance the tree. Return the modified tree. """