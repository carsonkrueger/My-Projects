import sys, math

maxInt = 10000
epsilon = sys.float_info.epsilon

def falsi(xu, xl, func):
    root = 0
    flag = 1
    numIters = 0

    if ((func(xl) * func(xu)) > 0):
        print("ERROR: same sign:", func(xl), func(xu))
        flag = -1
        root = None
        return root, flag, None, numIters
    elif (func(xu) == 0 or (func(xu) < epsilon and func(xu) > -epsilon)):
        print("xu is a root")
        root = xu
        flag = 0
        numIters = 0
        return root, flag, func(root), numIters
    elif (func(xl) == 0 or (func(xl) < epsilon and func(xl) > -epsilon)):
        print("xl is a root")
        root = xl
        flag = 0
        numIters = 0
        return root, flag, func(root), numIters

    while True:
        numIters += 1

        prevRoot = root
        root = (func(xu)*xl - func(xl)*xu)/(func(xu) - func(xl))
        ulp = math.ulp(root)

        if ((func(xl) * func(xu)) < 0):
            xu = root
        else:
            xl = root

        # func(root) is less than epsilon, 
        # or 2 consecutive roots are less than an ulp
        # if (func(root) <= epsilon and func(root) >= -epsilon):
        #     print("epsilon")
        #     break
        if (prevRoot-root <= ulp and prevRoot-root >= -ulp):
            print("ulp")
            break
        elif (numIters >= maxInt):
            print("Max", maxInt)
            break

    return root, flag, func(root), numIters

def bisect(xu, xl, func):
    root = 0
    numIters = 0

    while True:
        c = (xu-xl)/2
        fofc = func(c)
        ulp = math.ulp(c)
        numIters += 1

        if (abs(fofc) <= ulp): # found root
            return c
        elif (fofc < 0):
            xl = c
        elif (fofc > 0):
            xu = c

        if (numIters >= maxInt):
            print("max iterations reached")
            return c


if __name__ == "__main__":
    pass