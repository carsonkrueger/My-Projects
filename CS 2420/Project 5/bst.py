from os import error
from main import Pair

class Node:
    """Node Class"""
    def __init__(self, pair = ""):
        """Initializes Node"""
        self.pair = pair # Holds a Pair()
        self.left = None # Holds next Node()
        self.right = None # Holds next Node()
        

class BST:
    """BST Class"""
    def __init__(self):
        """Initializes BST"""
        self.root = None # Holds a Node
        self.height = 0
        self.syze = 0
    
    def is_empty(self):
        """Return True if empty, False otherwise. """
        if self.root == None:
            return True
        return False

    def size(self):
        """Return the number of items in the tree. """
        return self.syze

    def height(self):
        """Return the height of the tree, which is the length of the path from the root to 
        its deepest leaf. """
        pass

    def add(self, item, root = None):
        """Add item to its proper place in the tree. Return the modified tree. """
        if root is None:
            root = self.root

        #print("TEST", root.pair.letter)
        #item.letter = item.letter.lower()
        
        if not item.letter.isalpha() and not item.letter.isnumeric():
            return

        elif self.is_empty():
            self.root = Node(item)
            #print("\nRoot empty, added:", item)

        elif root.right == None and item.letter > root.pair.letter:
            self.syze += 1
            root.right = Node(item)
            #print(item, ", Added Node right of:", root.pair.letter)
        
        elif root.left == None and item.letter < root.pair.letter:
            self.syze += 1
            root.left = Node(item)
            #print(item, ", Added Node left of:", root.pair.letter)

        elif item.letter > root.pair.letter:
            self.add(item, root.right)

        elif item.letter < root.pair.letter:
            self.add(item, root.left)

        elif item.letter == root.pair.letter:
            root.pair.count += 1
            #print(item, ", Incremented:", root.pair.letter)

        else:
            raise error


    def remove(self, item):
        """Remove item from the tree. Return the modified tree. """
        

    def find(self, item, root = None):
        """Return the matched item. If item is not in the tree, raise a ValueError. """
        if root is None:
            root = self.root
                
        if not item.letter.isalpha() or self.is_empty():
            # print("DID NOT FIND:", item)
            raise ValueError
            
        if item.letter > root.pair.letter:
            if root.right == None:
                raise ValueError
            self.find(item, root.right)

        elif item.letter < root.pair.letter:
            if root.left == None:
                raise ValueError
            self.find(item, root.left)

        elif item.letter == root.pair.letter:
            # print(item, ", Found:", root.pair.letter)
            return root.pair

        else:
            # print("DID NOT FIND:", item)
            raise ValueError


    def inorder(self):
        """Return a list with the data items in order of inorder traversal. """
        root = self.root
        lyst = []

        def printInorder(root):

            if root:
                printInorder(root.left)
                lyst.append(root.pair.letter)
                printInorder(root.right)

        printInorder(root)
        return lyst
        
    
    def preorder(self):
        """Return a list with the data items in order of preorder traversal. """
        root = self.root
        lyst = []

        def printPreorder(root):

            if root:
                lyst.append(root.pair.letter),
                printPreorder(root.left)
                printPreorder(root.right)

        printPreorder(root)
        return lyst

    def postorder(self):
        """Return a list with the data items in order of postorder traversal. """
        root = self.root
        lyst = []

        def printPostorder(root):
 
            if root:
                printPostorder(root.left)
                printPostorder(root.right)
                lyst.append(root.pair.letter)

        printPostorder(root)
        return lyst

    def rebalance():
        """rebalance the tree. Return the modified tree. """