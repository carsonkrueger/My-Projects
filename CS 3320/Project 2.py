import sys
import math

def ulps(a,b):
    base = sys.float_info.radix
    eps = sys.float_info.epsilon
    prec = sys.float_info.mant_dig
    inf = math.inf
    
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

    print(expA, "\n", expB)

    numUlps = 0
    # intervalExp = expA
    # lowerBound = a

    # while (intervalExp <= expB):
    #     upperBound = 2**((prec-2)+intervalExp+1)
    #     intervalUlp = math.ulp(lowerBound)

    #     # if upperbound goes beyond b, set b as the upperbound
    #     if (upperBound > b):
    #         upperBound = b

    #     # adds number of ulps in this interval to total ulps
    #     numUlps += (upperBound - lowerBound)/intervalUlp
    #     lowerBound = upperBound
    #     intervalExp += 1

    return numUlps

if __name__ == "__main__":
    # ulps(0,20)
    print(math.frexp(.2)[1],math.frexp(30)[1])
    # print(ulps(-1.0, -1.0000000000000003)) #1 
    # print(ulps(1.0, 1.0000000000000003))   #1 
    # print(ulps(1.0, 1.0000000000000004))   #2 
    # print(ulps(1.0, 1.0000000000000005))   #2 
    # print(ulps(1.0, 1.0000000000000006))   #3 
    # print(ulps(0.9999999999999999, 1.0))   #1 
    # print(ulps(0.4999999999999995, 2.0)) #9007199254741001 
    # print(ulps(0.5000000000000005, 2.0)) #9007199254740987 
    # print(ulps(0.5, 2.0)) #9007199254740992 
    # print(ulps(1.0, 2.0)) #4503599627370496 
    # print(2.0**52)        # 4503599627370496.0 
    # print(ulps(-1.0, 1.0)) #inf 
    # print(ulps(-1.0, 0.0)) #inf 
    # print(ulps(0.0, 1.0))  #inf 
    # print(ulps(5.0, math.inf)) #inf 
    # print(ulps(15.0, 100.0))  # 12103423998558208
