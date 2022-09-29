import sys
import math

epsilon = sys.float_info.epsilon

def mySine(x):
    if (x > 10**9 or x < -10**9):
        print("too big", end=" ")
        return math.nan
    elif ((x**2 <= epsilon and x > 0) or (-x**2 >= epsilon and x < 0)):
        print("too small", end=" ")
        return x

    # if (x > 0):
    #     x = x % (math.pi/2)
    # elif (x < 0):
    #     x = x % (-math.pi/2)

    # x = (x * (math.pi/180)) % (math.pi/2/180)

    y = round(x/math.pi)  # x - n pi
    t = x - (y* math.pi)

    denom = 1
    doNeg = True
    for i in range(3,21+1,2):
        if doNeg:
            t -= (t**i)/(math.factorial(i))
        else:
            t += (t**i)/(math.factorial(i))
        doNeg = not doNeg # flip doNeg

    return t


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
