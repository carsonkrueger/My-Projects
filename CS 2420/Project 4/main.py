from stack import Stack


def main():
    f = open("data.txt", "r")

    for line in f:
        stk = Stack()
        # print(line.replace(" ", ""))
        # print("infix:", line)
        line = line.replace(" ", "").strip()
        stk.in2post(line)


if __name__ == "__main__":
    main()
