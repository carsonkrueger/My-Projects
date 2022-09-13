
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

    # print(math.ulp(a))

    exp = 0
    lowerBound = a
    if (a >= 1):
        while (lowerBound <= b):
            lowerBound *= base
            exp += 1
    elif (a < 1):
        while (lowerBound <= b):
            lowerBound /= base
            exp -= 1

    print("num intervals", exp)

    # y=a
    # yPlusOne = y+1
    # while (yPlusOne-y == 1):
    #     y*=5
    #     yPlusOne = y+1

    # print(y)

    # #Find Base
    # x = 1
    # while(y+x == y):
    #     x += 1

    # base = int((y+x)-y)
    # print(base)

if __name__ == "__main__":
    ulps(1,26)