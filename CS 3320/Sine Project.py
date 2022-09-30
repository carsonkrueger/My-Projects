import sys
import math

epsilon = sys.float_info.epsilon

def mySine(x):
    if (x > 10**9 or x < -10**9):
        return math.nan
    elif ((x**2 <= epsilon and x > 0) or (-x**2 >= epsilon and x < 0)):
        return x

    n = round(x/math.pi)  # x - n pi
    t = x - n * math.pi

    sinx = t
    doNeg = True

    for i in range(3,21+1,2):
        if doNeg:
            sinx -= (t**i)/math.factorial(i)
        else:
            sinx += (t**i)/math.factorial(i)
        doNeg = not doNeg # flip doNeg

    return -sinx if (n%2) else sinx 

if __name__ == "__main__":
    print(mySine(1.0e-08)) #1e-08 
    print(mySine(0.00001)) #9.999999999833334e-06 
    print(mySine(0)) #0 
    print(mySine(math.pi/2)) #1.0000000000000002 
    print(mySine(math.pi)) #-0.0 
    print(mySine(100)) #-0.5063656411097555 
    print(mySine(-1000)) #-0.8268795405320125 
    print(mySine(999999999)) #-0.4101372630100049 
    print(mySine(-1000000001)) #nan
