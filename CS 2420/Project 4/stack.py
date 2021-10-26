"""Creates stack objects"""

class Stack:
    """Class creates stack objects"""
    def __init__(self):
        # Initializes the stack object
        self.shape = 0
        self.array = []
        self.output = []
        self.precedence = ['-', '+', '/', '*']

    def is_empty(self):
        """Returns True if stack is empty"""
        if self.shape <= 0:
            return True
        return False

    def size(self):
        """Returns size of stack"""
        return self.shape

    def top(self):
        """Returns the top or last element in stack"""
        if self.is_empty():
            raise IndexError
        return self.array[self.shape-1]

    def pop(self):
        """Pops and returns top element"""
        if self.is_empty():
            raise IndexError
            
        self.shape = self.shape - 1
        #return self.array.pop()
        last = self.array.pop()
        try:
            return float(last)
        except:
            return last

    def push(self, next_op):
        """Pushes element onto the top of the stack"""
        self.shape += 1
        self.array.append(str(next_op))

    def clear(self):
        """Clears the stack"""
        self.shape = 0
        self.array = []
        self.output = []

    def is_operand(self, next_char):
        """Checks if ch is an operand (number)"""
        return next_char.isdigit()

    def check_prec(self, next_char):
        """Compares precedence of top elem and ch elem
        Returns True if ch top elem precedence is higher"""
        op_prec = self.precedence.index(self.top())
        next_op_prec = self.precedence.index(next_char)

        return True if op_prec >= next_op_prec else False
