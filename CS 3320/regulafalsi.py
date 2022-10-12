import sys, math

maxInt = 1000000
epsilon = sys.float_info.epsilon

def func1(x):
    return x**4 - 6*x**3 + 12*x**2 - 10*x + 3

def func2(x):
    return x**3 - 7*x**2 + 15*x - 9

def func3(x):
    return x**4 - 3*x**2 - 75*x - 10000

def func4(x):
    return math.e**x - 3*x

price = 79990
p = price - (price * .1)
n = 7 * 12

def func5(x):
    return p * (x * (1 + x)**n)/((1+x)**n - 1) - 1000

# def bisection(xu, xl, func):
#     root = (xu + xl) / 2
#     flag = False
#     # func val at found root
#     numIters = 0

#     while (True):
#         val = func(root)
#         if (val < 0):
#             xu = root
#         elif (val > 0):
#             xl = root
#         elif (val == 0):
#             print("FOUND ROOT", root)
#         root = (xu + xl) / 2

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


if __name__ == "__main__":
    # b1 = [1.5, 2.5]
    # b2 = [0, 1.5]

    # xr, fl, fv, it = falsi(b1[0], b1[1], func1)
    # print(xr,fl,fv,it, "\n")
    # xr, fl, fv, it = falsi(b2[0], b2[1], func1)
    # print(xr,fl,fv,it, "\n")
    # xr, fl, fv, it = falsi(b1[0], b1[1], func2)
    # print(xr,fl,fv,it, "\n")
    # xr, fl, fv, it = falsi(b2[0], b2[1], func2)
    # print(xr,fl,fv,it, "\n")

    b3 = [9,12]
    xr, fl, fv, it = falsi(b3[0], b3[1], func3)
    print(xr,fl,fv,it, "\n")

    b4 = [1,2]
    xr, fl, fv, it = falsi(b4[0], b4[1], func4)
    print(xr,fl,fv,it, "\n")

    b5 = [.04/12, .05/12]
    xr, fl, fv, it = falsi(b5[0], b5[1], func5)
    print(xr,fl,fv,it, "\n")