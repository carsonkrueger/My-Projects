"""Driver code for stack.py and converts infix to postfix.
Also evals postfix for answer."""

from stack import Stack


def main():
    """Main function"""
    f = open("data.txt", "r")

    for line in f:

        # print(line.replace(" ", ""))
        # print("infix:", line)
        line = line.replace(" ", "").strip()
        print(eval_postfix(in2post(line)))


def eval_postfix(expr):
    """Evaluates postfix expression and returns answer"""
    stak = Stack()

    if expr == "" or expr == " " or expr == None:
        raise ValueError

    expr = expr.replace(" ", "").strip()

    for i in expr:
        if i.isdigit():
            stak.push(i)

        else:
            a = stak.pop()

            try:
                b = stak.pop()
            except:
                raise SyntaxError

            stak.push(str(eval(str(b) + i + str(a))))

    return float(stak.pop())


def in2post(expr):
    """Converst infix expression to postfix"""
    if not isinstance(expr, str):
        raise ValueError

    expr = expr.replace(" ", "").strip()

    stak = Stack()

    for i in expr:
        if stak.is_operand(i):
            stak.output.append(i)

        elif i == "(":
            stak.push(i)

        elif i == ")":
            while (not stak.is_empty()) and stak.top() != "(":
                a = stak.pop()
                stak.output.append(a)
            if not stak.is_empty() and stak.top() != "(":
                return -1
            else:
                try:
                    stak.pop()
                except:
                    raise SyntaxError

        # An operator is encountered
        else:
            while not stak.is_empty() and stak.top() != "(" and stak.check_prec(i):
                stak.output.append(stak.pop())
            stak.push(i)

    # pop all the operator from the stack
    while not stak.is_empty():
        stak.output.append(stak.pop())

    print("".join(stak.output))
    return "".join(stak.output)


if __name__ == "__main__":
    """Calls main function"""
    main()
