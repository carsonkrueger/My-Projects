import sys, math

maxInt = 100000
epsilon = sys.float_info.epsilon

def func1(x):
    return x**4 - 6*x**3 + 12*x**2 - 10*x + 3

def func2(x):
    return x**3 - 7*x**2 + 15*x - 9

def half(xu, xl, func):
    root = (xu + xl) / 2
    flag = False
    # func val at found root
    numIters = 0

    while (True):
        val = func(root)
        if (val < 0):
            xu = root
        elif (val > 0):
            xl = root
        elif (val == 0):
            print("FOUND ROOT", root)
        root = (xu + xl) / 2

def falsi(xu, xl, func):
    root = 0
    flag = 1
    numIters = 0

    while True:
        numIters += 1

        prevRoot = root
        root = (func(xu)*xl - func(xl)*xu)/(func(xu) - func(xl))
        ulp = math.ulp(root)

        if (func(xu) == 0 or (func(xu) < epsilon and func(xu) > -epsilon)):
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

        if ((func(xl) * func(xu)) > 0):
            print("ERROR: same sign", func(xl), func(xu))
            flag = -1
            return root, flag, func(root), numIters

        # func(root) is less than epsilon, 
        # or 2 consecutive roots are less than an ulp
        if (func(root) < epsilon and func(root) > -epsilon):
            print("epsilon")
            break
        elif (prevRoot-root <= ulp and prevRoot-root >= -ulp):
            print("ulp")
            break
        elif (numIters >= maxInt):
            print("Max 100000")
            break

        # move xu or xl
        if (func(root) > 0):
            xu = root
        elif (func(root) < 0):
            xl = root

    return root, flag, func(root), numIters


if __name__ == "__main__":
    b1 = [1.5, 2.5]
    b2 = [0, 1.5]

    r, f, fv, n = falsi(b1[0], b1[1], func1)
    print(r,f,fv,n, "\n")
    r, f, fv, n = falsi(b2[0], b2[1], func1)
    print(r,f,fv,n, "\n")
    r, f, fv, n = falsi(b1[0], b1[1], func2)
    print(r,f,fv,n, "\n")
    r, f, fv, n = falsi(b2[0], b2[1], func2)
    print(r,f,fv,n, "\n")