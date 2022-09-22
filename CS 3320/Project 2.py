import sys
import math
from struct import *

base = sys.float_info.radix
eps = sys.float_info.epsilon
prec = sys.float_info.mant_dig
inf = math.inf

def sign(x):
    return binary(x)[0]
    # if (x < 0):
    #     return -1
    # elif (x > 0):
    #     return 1
    # elif (x == 0):
    #     return 0

def exponent(x):
    expA = math.frexp(x)[1]
    if (x == 0): return 0
    exp = ((prec-2)+expA+1)
    return expA-1

def fraction(x):
    # print("-TESTING- ", end="")
    return math.frexp(x)[0]

def mantissa(x):
    # print("-TESTING-", end="")
    # return (fraction(x) + 1)
    return math.frexp(x)[0] * 2

def is_posinfinity(x):
    if (x == inf): return True
    return 
    
def is_neginfinity(x):
    if (x == -inf): return True
    return False

def ulp(a):
    # expA = math.frexp(a)[1]
    # nextInterval = 2**((prec-2)+expA+1)
    # return ulps(a,nextInterval)
    return math.ulp(a)

def ulps(a,b):
    if ((a <= 0 and b >= 0) or (a >= 0 and b <= 0)):
        return inf
    elif (a == inf or b == inf):
        return inf

    # swap if a is greater than b
    if (a > b):
        tempA = a
        a = b
        b = tempA

    # ulps
    ulpA = math.ulp(a)
    ulpB = math.ulp(b)

    # exponents
    expA = math.frexp(ulpA)[1]
    expB = math.frexp(ulpB)[1]

    numUlps = 0
    intervalExp = expA
    lowerBound = a

    while (intervalExp <= expB):
        upperBound = 2**((prec-2)+intervalExp+1)
        intervalUlp = math.ulp(lowerBound)

        # if upperbound goes beyond b, set b as the upperbound
        if (upperBound > b):
            upperBound = b

        # adds number of ulps in this interval to total ulps
        numUlps += (upperBound - lowerBound)/intervalUlp
        lowerBound = upperBound
        intervalExp += 1

    return numUlps

def binary(num):
    return ''.join('{:0>8b}'.format(c) for c in pack('!f', num))

def decimal(num):
    pass

if __name__ == "__main__":
    y = 6.5 
    # print(binary(y))
    # subMin = np.nextafter(0,1) //subMin = 5e-324 
    print(sign(y)) #1 
    print(sign(0.0)) # 0 
    print(sign(-y)) # -1 
    print(sign(-0.0)) #0 
    print(exponent(y)) # 2 
    print(exponent(16.6)) # 4 
    print(fraction(0.0)) #0.0 
    print(mantissa(y)) #1.625 
    print(mantissa(0.0)) #0.0 
    # var1 = float(‘nan’) 
    # print(exponent(var1)) # 1024 
    print(exponent(0.0)) # 0 
    # print(exponent(subMin)) # -1022 
    print(is_posinfinity(math.inf)) # True 
    print(is_neginfinity(math.inf)) # False 
    print(not is_posinfinity(-math.inf)) #True 
    print(is_neginfinity(-math.inf)) #True 
    print(ulp(y)) # 8.881784197001252e-16 
    print(ulp(1.0)) # 2.220446049250313e-16 
    print(ulp(0.0)) # 5e-324 
    # print(ulp(subMin)) # 5e-324 
    print(ulp(1.0e15)) # 0.125 
    print(ulps(1,2)) # 4503599627370496
