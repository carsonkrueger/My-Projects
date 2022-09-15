
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
    # print(math.ulp(a))

    # exp = 0
    # lowerBound = a
    # if (a >= 1):
    #     while (lowerBound <= b):
    #         lowerBound *= base
    #         exp += 1
    # elif (a < 1):
    #     while (lowerBound <= b):
    #         lowerBound /= base
    #         exp -= 1
    # print("num intervals", exp)

    ulpA = math.ulp(a)

    interval = a
    numIntervals = 0
    if a > 0:
        while interval < b:
            interval += ulpA
            numIntervals += 1
    else:
        print("hi")
        while interval > b:
            interval += ulpA
            numIntervals += 1

    print(numIntervals)

if __name__ == "__main__":
    ulps(-1,-1.0000000000000006)