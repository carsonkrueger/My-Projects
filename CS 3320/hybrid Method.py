from re import X
import sys, math

minNum = math.ulp(0)
epsilon = sys.float_info.epsilon

def func1(x):
    return x * math.cos(x) + math.sin(x)

def func2(x):
    return math.e**(-x) - x

def falsi(xu, xl, func):
    root = 0

    # if ((func(xl) * func(xu)) > 0):
    #     print("ERROR: same sign:", func(xl), func(xu))
    #     root = None
    #     return root
    # elif (func(xu) == 0 or (func(xu) < epsilon and func(xu) > -epsilon)):
    #     print("xu is a root")
    #     root = xu
    #     return root
    # elif (func(xl) == 0 or (func(xl) < epsilon and func(xl) > -epsilon)):
    #     print("xl is a root")
    #     root = xl
    #     return root

    # prevRoot = root
    if (func(xu) - func(xl) == 0): print(func(xu), func(xl))
    root = (func(xu)*xl - func(xl)*xu)/(func(xu) - func(xl))
    # ulp = math.ulp(root)

    # if ((func(xl) * func(xu)) < 0):
    #     xu = root
    # else:
    #     xl = root

    # func(root) is less than epsilon, 
    # or 2 consecutive roots are less than an ulp
    # if (abs(func(root)) <= epsilon):
    #     print("epsilon")
    # elif (abs(prevRoot-root) <= ulp):
    #     print("ulp")

    return root

def bisect(xu, xl, func):
    c = (xu-xl)/2
    # fofc = func(c)

    # if (fofc < 0):
    #     xl = c
    # elif (fofc > 0):
    #     xu = c

    return c

def secant(prev, cur, func):
    # if (cur-prev == 0): print("YOOOO")
    nextCur = cur - (func(cur))/((func(cur)-func(prev))/(cur-prev))
    return nextCur

def newton(c, func, dfunc):
    return c - func(c)/dfunc(c)

def swap(c, d):
    temp = c
    c = d
    d = temp
    return c, d

def checkWithinUlp(x, f, numIters):
    if (abs(f(x)) <= minNum):
        print("Num Iterations:", numIters)
        return True
    return False

def zero2(a, b, f):
    numIters = 0

    if (checkWithinUlp(a, f, numIters)): return a
    if (checkWithinUlp(b, f, numIters)): return b

    while numIters < 10000:
        numIters += 1
        # first, falsi method
        # c = falsi(a, b, f)
        if (f(a) - f(b) == 0): return a
        c = (f(a)*b - f(b)*a)/(f(a) - f(b))

        # if same sign
        if (f(a) * f(b) > 0): 
            # a, c
            if (c<=a or c>=b):
                d = bisect(a, b, f)
                if (checkWithinUlp(d, f, numIters)): return d
            else:
                d = secant(a, c, f)
                if (checkWithinUlp(d, f, numIters)): return d
        # not same sign
        else:
            # b, c
            d = secant(b, c, f)
            if (checkWithinUlp(d, f, numIters)): return d

        # c is outside interval [a,b]
        if (d<=a or d>=b):
            d = bisect(a, b, f)
            if (checkWithinUlp(d, f, numIters)): return d
        
        # swap to make c lower
        if (c > d): c, d = swap(c,d)

        # check [c,d] length is less than half of [a,b] length
        if (d-c > (b-a)/2):
            d = bisect(a, b, f)
            if (checkWithinUlp(d, f, numIters)): return d

        # # check if within an ulp of zero
        # if (checkWithinUlp(c, f, numIters)): return c
        # if (checkWithinUlp(d, f, numIters)): return d

        a = c
        b = d

def zero(a, b, f):
    numIters = 0
    # d = 0
    
    if (checkWithinUlp(a, f, numIters)): return a
    if (checkWithinUlp(b, f, numIters)): return b

    while numIters < 10000:
        while numIters < 10000:
            numIters += 1

            c = falsi(-10, 10, f)

            if (checkWithinUlp(c, f, numIters)): return c
            if (abs(f(c) - f(b)) <= minNum): return c

            if c <= a or c >= b:
                break

            d = secant(a, c, f)

            if (checkWithinUlp(d, f, numIters)): return d
            if (abs(f(c) - f(d)) <= minNum): return c

            if (d<=a or d>=b):
                break
            if (d-c > (b-a)/2):
                break

            a = c
            b = d
        
        x = bisect(a, b, f)

        if (checkWithinUlp(x, f, numIters)): return x

        if x < 0:
            a = x
        elif x > 0:
            b = x
        
        if (abs(f(a) - f(b)) <= minNum): return a

    print("reached max, interval:", [c,d])
    print("f(c):", f(c), "f(d):", f(d))

if __name__ == "__main__":
    print(zero(2, 3, func1))
    print(zero(4, 5, func1))
    print(zero(0, 1, func2))
