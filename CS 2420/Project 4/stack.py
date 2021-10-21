class Stack():
    def __init__(self):
        # initializes stuff
        self.stack = []
        self.siz = 0

    def push(self, item):
        # push an item onto the stack. Size increases by 1.
        self.stack.append(str(item))
        self.siz += 1

    def pop(self):
        # remove the top item from the stack and return it. Raise an IndexError if the stack is empty.
        if self.siz <= 0:
            raise IndexError
        else:
            self.siz -= 1
            return self.stack.pop()

    def top(self):
        # return the item on top of the stack without removing it. Raise an IndexError if the stack is empty.
        if self.siz <= 0:
            raise IndexError
        else:
            temp = self.pop()
            self.push(temp)
            return temp

    def siz(self):
        # return the number of items on the stack.
        return self.siz

    def clear(self):
        # empty the stack.
        self.siz = 0
        self.stack = []

    def eval_postfix(self, expr):
        # evaluate a Postfix Expression
        # 1. Initialize a stack
        # 2. if next input is a number:
        # Read the next input and push it onto the stack
        # else:
        # Read the next character, which is an operator symbol
        # Use top and pop to get the two numbers off the top of the stack
        # Combine these two numbers with the operation
        # Push the result onto the stack
        # 3. goto #2 while there is more of the expression to read
        # 4. there should be one element on the stack, which is the result. Return this.
        pass

    def in2post(self, expr):
        # Infix to Postfix Pseudocode
        print("LINE", expr)

        for i in expr:
            i = str(i)
            # print("\"", i, "\"")

            if i == "(":
                # 2. if the next input is a left parenthesis:
                # Read the left parenthesis and push it onto the stack
                self.push(i)

            elif i.isdigit():
                # else if the next input is a number or operand:
                # Read the operand (or number) and write it to the output
                print(i, end="")
                # stack.push(i)

            elif i in ["-", "+", "/", "*"]:
                # else if the next input is an operator:
                print("HELLO", i, self.siz())
                while self.siz() > 0 and self.top() != "(" and self.check_precedence(self.top(), i):
                    # while (stack is not empty AND stack's top is not left parenthesis AND
                    # stack's top is an operation with equal or higher precedence than the next input symbol):
                    print(self.pop())  # Print and pop the stack's top
                self.push(i)  # Push the next operation symbol onto the stack

            else:
                # Read and discard the next input symbol (should be a right parenthesis)
                print(self.pop())  # Print the top operation and pop it

                while self.top() is not "(":
                    # while stack's top is not a left parenthesis:
                    # Print next symbol on stack and pop stack
                    print(self.pop(), end="")
                self.pop()
                # Pop and discard the last left parenthesis

                # 3. Goto #2 while there is more of the expression to read

                # 4. Print and pop any remaining operations on the stack
                # There should be no remaining left parentheses
        print("")

    def check_precedence(self, op, next_op):
        # arguement op must be higher or equal precedence to return True
        pemdas = ["-", "+", "/", "*", "(", ")"]
        op_prec = pemdas.index(op)
        next_op_prec = pemdas.index(next_op)

        if op_prec >= next_op_prec:
            return True
        else:
            return False
