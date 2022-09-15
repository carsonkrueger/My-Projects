
import sys

import sys
import math

def ulps(a,b):
    base = sys.float_info.radix
    eps = sys.float_info.epsilon
    prec = sys.float_info.mant_dig
    inf = math.inf
    # print(sys.float_info)
    
    if ((a < 0 and b > 0) or (a > 0 and b < 0)):
        return inf
    elif (a == inf or b == inf):
        return inf

    # swap if a is greater than b
    if (a > b):
        tempA = a
        a = b
        b = tempA

    # find exponent
    exp = 0
    lub = 1
    while (lub < b):
        lub *= base
        exp += 1
    # print(exp)

    # ulps
    ulpA = math.ulp(a)
    ulpB = math.ulp(b)
    expA = math.frexp(ulpA)[1]
    expB = math.frexp(ulpB)[1]

    numUlps = 0
    intervalExp = expA
    lowerBound = a

    while (intervalExp <= expB):
        upperBound = 2**(51+intervalExp+1)
        intervalUlp = math.ulp(lowerBound)

        # if upperbound goes beyond b, set b as the upperbound
        if (upperBound > b):
            upperBound = b

        # adds number of ulps in this interval to total ulps
        numUlps += (upperBound - lowerBound)/intervalUlp
        lowerBound = upperBound
        intervalExp += 1

    # same exponent
    # elif (expA == expB):
    #     numUlps = (b - a)/ulpA

    return numUlps

if __name__ == "__main__":
    print(ulps(15.0, 100.0))
    print(ulps(1.0, 1.0000000000000006))
    print(ulps(1.0, 2.0))

    # for i in range (0,20):
    #     print(i, ":", math.frexp(i)[1])